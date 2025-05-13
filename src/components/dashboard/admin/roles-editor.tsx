"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { RoleDefinition, RolePermission } from "@/types/admin"
import { CheckCircle2, XCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Switch } from "@/components/ui/switch"

interface RolesEditorProps {
  roles: RoleDefinition[]
  onRoleUpdate: (roleId: string, permissions: RolePermission[]) => void
}

export function RolesEditor({ roles, onRoleUpdate }: RolesEditorProps) {
  const [activeRole, setActiveRole] = useState<RoleDefinition | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  const handleEditRole = (role: RoleDefinition) => {
    setActiveRole(role)
    setEditDialogOpen(true)
  }

  return (
    <div>
      <Tabs defaultValue={roles[0]?.name}>
        <TabsList className="mb-4">
          {roles.map((role) => (
            <TabsTrigger
              key={role.name}
              value={role.name}
              className="capitalize"
              style={{
                borderBottomColor: role.color,
                borderBottomWidth: role.name === roles[0]?.name ? "2px" : "0",
              }}
            >
              {role.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {roles.map((role) => (
          <TabsContent key={role.name} value={role.name}>
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span className="capitalize">{role.name} Role</span>
                  <Button onClick={() => handleEditRole(role)} size="sm">
                    Edit Permissions
                  </Button>
                </CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Module</TableHead>
                      <TableHead className="text-center">Create</TableHead>
                      <TableHead className="text-center">Read</TableHead>
                      <TableHead className="text-center">Update</TableHead>
                      <TableHead className="text-center">Delete</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {role.permissions.map((permission) => (
                      <TableRow key={permission.id}>
                        <TableCell className="font-medium capitalize">{permission.module}</TableCell>
                        <TableCell className="text-center">
                          {permission.create ? (
                            <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="mx-auto h-5 w-5 text-red-500" />
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {permission.read ? (
                            <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="mx-auto h-5 w-5 text-red-500" />
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {permission.update ? (
                            <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="mx-auto h-5 w-5 text-red-500" />
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {permission.delete ? (
                            <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="mx-auto h-5 w-5 text-red-500" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {activeRole && (
        <RolePermissionDialog
          role={activeRole}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          onSubmit={(permissions) => onRoleUpdate(activeRole.name, permissions)}
        />
      )}
    </div>
  )
}

// Role permission edit dialog
const permissionSchema = z.object({
  permissions: z.array(
    z.object({
      id: z.string(),
      module: z.string(),
      create: z.boolean(),
      read: z.boolean(),
      update: z.boolean(),
      delete: z.boolean(),
    }),
  ),
})

type PermissionFormValues = z.infer<typeof permissionSchema>

interface RolePermissionDialogProps {
  role: RoleDefinition
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (permissions: RolePermission[]) => void
}

function RolePermissionDialog({ role, open, onOpenChange, onSubmit }: RolePermissionDialogProps) {
  const form = useForm<PermissionFormValues>({
    resolver: zodResolver(permissionSchema),
    defaultValues: {
      permissions: role.permissions,
    },
  })

  const handleSubmit = (data: PermissionFormValues) => {
    onSubmit(data.permissions)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit {role.name} Permissions</DialogTitle>
          <DialogDescription>
            Configure access permissions for the {role.name} role. Changes will affect all users with this role.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="space-y-4 max-h-[400px] overflow-y-auto py-4">
              {role.permissions.map((permission, index) => (
                <div key={permission.id} className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium capitalize mb-3">{permission.module}</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`permissions.${index}.create`}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                          <div className="space-y-0.5">
                            <FormLabel>Create</FormLabel>
                            <FormDescription>Add new {permission.module}</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`permissions.${index}.read`}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                          <div className="space-y-0.5">
                            <FormLabel>Read</FormLabel>
                            <FormDescription>View {permission.module}</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`permissions.${index}.update`}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                          <div className="space-y-0.5">
                            <FormLabel>Update</FormLabel>
                            <FormDescription>Edit {permission.module}</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`permissions.${index}.delete`}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                          <div className="space-y-0.5">
                            <FormLabel>Delete</FormLabel>
                            <FormDescription>Remove {permission.module}</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
            <DialogFooter className="mt-6">
              <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

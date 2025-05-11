"use client"

import { useState } from "react"
import { Filter, MoreHorizontal, PlusCircle } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Badge } from "./ui/badge"
import { InfoIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

const campaigns = [
  {
    id: 1,
    name: "Launch Mango Cloud",
    description: "mangoclouds/main product",
    about: "The release of Mango Cloud",
    lastUpdate: "12 Feb 2024",
    endDate: "05 Jun 2024",
    impressions: "240,482",
    newFollowers: "15,300",
    accountReach: "450,500",
    status: "active",
  },
  {
    id: 2,
    name: "Launch Artify",
    description: "apps/artwork product",
    about: "The release of Artify",
    lastUpdate: "15 Feb 2024",
    endDate: "30 May 2024",
    impressions: "203,750",
    newFollowers: "13,300",
    accountReach: "750,400",
    status: "cancel",
  },
  {
    id: 3,
    name: "Summer Promo 2024",
    description: "summer/sale/consumer promo",
    about: "The launch of Summer Promo 2024",
    lastUpdate: "10 Feb 2024",
    endDate: "15 Apr 2024",
    impressions: "320,300",
    newFollowers: "25,600",
    accountReach: "900,500",
    status: "paused",
  },
  {
    id: 4,
    name: "Cyber Monday Deals",
    description: "summer/sale/monday deals",
    about: "The launch of Discount Promo",
    lastUpdate: "20 Jan 2024",
    endDate: "30 Jan 2024",
    impressions: "410,600",
    newFollowers: "33,100",
    accountReach: "945,300",
    status: "completed",
  },
  {
    id: 5,
    name: "Q1 Engagement Boost",
    description: "mango/social/boost",
    about: "The launch of Brand Awareness",
    lastUpdate: "01 Mar 2024",
    endDate: "30 Jun 2024",
    impressions: "270,300",
    newFollowers: "14,600",
    accountReach: "410,800",
    status: "cancel",
  },
]

export default function CampaignList() {
  const [selectedCampaigns, setSelectedCampaigns] = useState<number[]>([])

  const toggleCampaignSelection = (id: number) => {
    if (selectedCampaigns.includes(id)) {
      setSelectedCampaigns(selectedCampaigns.filter((campaignId) => campaignId !== id))
    } else {
      setSelectedCampaigns([...selectedCampaigns, id])
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "cancel":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancel</Badge>
      case "paused":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Paused</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Completed</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-semibold">Campaign List</CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400">Track and manage your campaigns effectively</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Filter className="h-3.5 w-3.5" />
            <span className="text-xs">Filters</span>
          </Button>
          <Button size="sm" className="h-8 gap-1 bg-indigo-600 hover:bg-indigo-700">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="text-xs">New Campaign</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Campaign Name</TableHead>
                <TableHead>About Campaign</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead className="w-[100px]">
                  <div className="flex items-center gap-1">
                    Impression
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <InfoIcon className="h-3.5 w-3.5 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Total number of impressions</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableHead>
                <TableHead>New Followers</TableHead>
                <TableHead>Account Reach</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-medium">{campaign.name}</div>
                      <div className="text-xs text-gray-500">{campaign.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{campaign.about}</div>
                  </TableCell>
                  <TableCell>{campaign.lastUpdate}</TableCell>
                  <TableCell>{campaign.endDate}</TableCell>
                  <TableCell>{campaign.impressions}</TableCell>
                  <TableCell>{campaign.newFollowers}</TableCell>
                  <TableCell>{campaign.accountReach}</TableCell>
                  <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

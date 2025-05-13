import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { BusinessSalesData } from "@/types/analytics"

interface BusinessSalesTableProps {
  salesData: BusinessSalesData[]
}

export function BusinessSalesTable({ salesData }: BusinessSalesTableProps) {
  // Sort businesses by sales (highest first)
  const sortedData = [...salesData].sort((a, b) => b.sales - a.sales)

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Business Sales Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business</TableHead>
              <TableHead className="text-right">Sales</TableHead>
              <TableHead className="text-right">Transactions</TableHead>
              <TableHead className="text-right">Avg. Order Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((business) => (
              <TableRow key={business.businessId}>
                <TableCell className="font-medium">{business.businessName}</TableCell>
                <TableCell className="text-right">${business.sales.toLocaleString()}</TableCell>
                <TableCell className="text-right">{business.transactions.toLocaleString()}</TableCell>
                <TableCell className="text-right">${(business.sales / business.transactions).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

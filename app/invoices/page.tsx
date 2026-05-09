import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Invoice Management</h1>
        <p className="text-muted-foreground mt-2">Manage invoices and process payments</p>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>Invoice Management</CardTitle>
          <CardDescription>This page is coming soon</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground">Invoice management features will be added here.</p>
        </CardContent>
      </Card>
    </div>
  )
}

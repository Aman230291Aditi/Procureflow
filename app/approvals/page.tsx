import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ApprovalsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Approval Workflow</h1>
        <p className="text-muted-foreground mt-2">Manage approval requests and workflow</p>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>Approval Workflow</CardTitle>
          <CardDescription>This page is coming soon</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground">Approval workflow features will be added here.</p>
        </CardContent>
      </Card>
    </div>
  )
}

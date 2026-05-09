import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
        <p className="text-muted-foreground mt-2">View procurement analytics and reports</p>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
          <CardDescription>This page is coming soon</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground">Analytics and reporting features will be added here.</p>
        </CardContent>
      </Card>
    </div>
  )
}

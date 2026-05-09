import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function SettingsPage() {
  const quickLinks = [
    { title: 'User Management', description: 'Manage team members and permissions', href: '/settings/users' },
    { title: 'Departments', description: 'Configure organizational departments', href: '/settings/departments' },
    { title: 'Vendors & Suppliers', description: 'Manage vendor master data', href: '/settings/vendors' },
    { title: 'Payment Terms', description: 'Set up payment terms and conditions', href: '/settings/payment-terms' },
    { title: 'Approval Workflow', description: 'Configure approval hierarchy', href: '/settings/approvals' },
    { title: 'Items & Categories', description: 'Manage product catalog', href: '/settings/items' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings & Configuration</h1>
        <p className="text-muted-foreground mt-2">Manage your account, users, and master data</p>
      </div>

      {/* Quick Links Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {quickLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="border-border rounded-xl hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{link.title}</CardTitle>
                    <CardDescription className="mt-2">{link.description}</CardDescription>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      {/* Information Card */}
      <Card className="border-border rounded-xl bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Getting Started</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-blue-800">
          <p>To set up ProcureFlow for your organization:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Add users and configure roles in User Management</li>
            <li>Set up your organization structure with Departments and Cost Centers</li>
            <li>Configure Payment Terms and Currencies</li>
            <li>Add Vendors and Suppliers to your master data</li>
            <li>Set up the Approval Workflow for your organization</li>
            <li>Create Items and Categories for your catalog</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}

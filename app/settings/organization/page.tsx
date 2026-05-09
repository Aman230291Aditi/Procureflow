'use client'

import { Save, Building2, Mail, Phone, Globe } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function OrganizationPage() {
  const [orgData, setOrgData] = useState({
    companyName: 'Acme Corporation',
    email: 'company@acmecorp.com',
    phone: '+1 (555) 123-4567',
    website: 'www.acmecorp.com',
    address: '123 Business Ave, New York, NY 10001',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    taxId: 'XX-XXXXXXX',
    industryType: 'Manufacturing',
    description: 'Leading provider of industrial solutions',
    fiscalYearStart: '01-01',
    fiscalYearEnd: '12-31',
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Organization Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your organization profile and settings</p>
      </div>

      {/* Company Information */}
      <Card className="border-border rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Company Information
          </CardTitle>
          <CardDescription>Update your organization's basic information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input
                id="company-name"
                value={orgData.companyName}
                onChange={(e) => setOrgData({ ...orgData, companyName: e.target.value })}
                className="border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax-id">Tax ID / VAT Number</Label>
              <Input
                id="tax-id"
                value={orgData.taxId}
                onChange={(e) => setOrgData({ ...orgData, taxId: e.target.value })}
                className="border-border"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={orgData.email}
                onChange={(e) => setOrgData({ ...orgData, email: e.target.value })}
                className="border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                value={orgData.phone}
                onChange={(e) => setOrgData({ ...orgData, phone: e.target.value })}
                className="border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Website
            </Label>
            <Input
              id="website"
              value={orgData.website}
              onChange={(e) => setOrgData({ ...orgData, website: e.target.value })}
              className="border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={orgData.address}
              onChange={(e) => setOrgData({ ...orgData, address: e.target.value })}
              className="border-border"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={orgData.city}
                onChange={(e) => setOrgData({ ...orgData, city: e.target.value })}
                className="border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={orgData.state}
                onChange={(e) => setOrgData({ ...orgData, state: e.target.value })}
                className="border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                value={orgData.zipCode}
                onChange={(e) => setOrgData({ ...orgData, zipCode: e.target.value })}
                className="border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={orgData.country}
                onChange={(e) => setOrgData({ ...orgData, country: e.target.value })}
                className="border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Business Description</Label>
            <Textarea
              id="description"
              value={orgData.description}
              onChange={(e) => setOrgData({ ...orgData, description: e.target.value })}
              className="border-border min-h-24"
            />
          </div>

          <div className="pt-4 border-t border-border">
            <Button
              className="bg-primary hover:bg-primary/90 gap-2"
              onClick={handleSave}
              disabled={isSaving}
            >
              <Save className="h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Fiscal Settings */}
      <Card className="border-border rounded-xl">
        <CardHeader>
          <CardTitle>Fiscal Year Settings</CardTitle>
          <CardDescription>Configure your organization's fiscal year dates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fiscal-start">Fiscal Year Start</Label>
              <Input
                id="fiscal-start"
                placeholder="MM-DD"
                value={orgData.fiscalYearStart}
                onChange={(e) => setOrgData({ ...orgData, fiscalYearStart: e.target.value })}
                className="border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fiscal-end">Fiscal Year End</Label>
              <Input
                id="fiscal-end"
                placeholder="MM-DD"
                value={orgData.fiscalYearEnd}
                onChange={(e) => setOrgData({ ...orgData, fiscalYearEnd: e.target.value })}
                className="border-border"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <Button className="bg-primary hover:bg-primary/90 gap-2" onClick={handleSave} disabled={isSaving}>
              <Save className="h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { ArrowLeft, Upload, Check, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'

export default function SupplierOnboardingPage() {
  const [currentStep, setCurrentStep] = useState<'basic' | 'business' | 'compliance' | 'review'>('basic')
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    industry: '',
    description: '',
    businessType: '',
    taxId: '',
    registrationNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    banking: {
      accountName: '',
      accountNumber: '',
      routingNumber: '',
      bankName: '',
    },
    documents: {
      insurance: false,
      tax: false,
      registration: false,
      compliance: false,
    },
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleBankingChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      banking: {
        ...prev.banking,
        [field]: value,
      },
    }))
  }

  const handleDocumentChange = (doc: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [doc]: checked,
      },
    }))
  }

  const stepConfig = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'business', label: 'Business Details' },
    { id: 'compliance', label: 'Compliance' },
    { id: 'review', label: 'Review' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/suppliers">
          <Button variant="ghost" size="icon" className="hover:bg-muted">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Supplier Onboarding</h1>
          <p className="text-muted-foreground mt-1">Complete the onboarding process to become an approved supplier</p>
        </div>
      </div>

      {/* Progress Steps */}
      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            {stepConfig.map((step, idx) => (
              <div key={step.id} className="flex items-center flex-1">
                <button
                  onClick={() => setCurrentStep(step.id as any)}
                  className="flex items-center gap-3 flex-1"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      currentStep === step.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span className="text-sm font-medium text-foreground">{step.label}</span>
                </button>
                {idx < stepConfig.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 rounded ${
                      currentStep === step.id || stepConfig.findIndex(s => s.id === currentStep) > idx
                        ? 'bg-primary'
                        : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          {/* Basic Information */}
          {currentStep === 'basic' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Basic Information</h2>
                <p className="text-muted-foreground mb-6">Tell us about your company</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-sm font-medium">
                    Company Name *
                  </Label>
                  <Input
                    id="companyName"
                    placeholder="Your company name"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-sm font-medium">
                    Industry *
                  </Label>
                  <Select value={formData.industry} onValueChange={(val) => handleInputChange('industry', val)}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="it">Information Technology</SelectItem>
                      <SelectItem value="logistics">Logistics & Transportation</SelectItem>
                      <SelectItem value="services">Professional Services</SelectItem>
                      <SelectItem value="retail">Retail & Distribution</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactName" className="text-sm font-medium">
                    Primary Contact Name *
                  </Label>
                  <Input
                    id="contactName"
                    placeholder="Full name"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-sm font-medium">
                    Website
                  </Label>
                  <Input
                    id="website"
                    placeholder="https://example.com"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="bg-background"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Company Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of your company and services"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="bg-background h-24"
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline">Save Draft</Button>
                <Button onClick={() => setCurrentStep('business')}>
                  Next: Business Details
                </Button>
              </div>
            </div>
          )}

          {/* Business Details */}
          {currentStep === 'business' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Business Details</h2>
                <p className="text-muted-foreground mb-6">Provide your company&apos;s business and financial information</p>
              </div>

              <div className="space-y-6">
                {/* Business Type */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Business Type *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {['Sole Proprietor', 'Partnership', 'Corporation', 'LLC', 'Non-Profit', 'Government'].map(
                      type => (
                        <button
                          key={type}
                          onClick={() => handleInputChange('businessType', type)}
                          className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                            formData.businessType === type
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'border-border text-foreground hover:bg-muted'
                          }`}
                        >
                          {type}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <Separator />

                {/* Tax and Registration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="taxId" className="text-sm font-medium">
                      Tax ID / EIN *
                    </Label>
                    <Input
                      id="taxId"
                      placeholder="XX-XXXXXXX"
                      value={formData.taxId}
                      onChange={(e) => handleInputChange('taxId', e.target.value)}
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber" className="text-sm font-medium">
                      Business Registration Number
                    </Label>
                    <Input
                      id="registrationNumber"
                      placeholder="Registration #"
                      value={formData.registrationNumber}
                      onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                      className="bg-background"
                    />
                  </div>
                </div>

                <Separator />

                {/* Address */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Business Address</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-sm font-medium">
                        Street Address *
                      </Label>
                      <Input
                        id="address"
                        placeholder="123 Main Street"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="bg-background"
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-sm font-medium">
                          City *
                        </Label>
                        <Input
                          id="city"
                          placeholder="City"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className="bg-background"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state" className="text-sm font-medium">
                          State *
                        </Label>
                        <Input
                          id="state"
                          placeholder="State"
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          className="bg-background"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="zipCode" className="text-sm font-medium">
                          ZIP Code *
                        </Label>
                        <Input
                          id="zipCode"
                          placeholder="12345"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          className="bg-background"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country" className="text-sm font-medium">
                          Country *
                        </Label>
                        <Select value={formData.country} onValueChange={(val) => handleInputChange('country', val)}>
                          <SelectTrigger className="bg-background">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                            <SelectItem value="UK">United Kingdom</SelectItem>
                            <SelectItem value="AU">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Banking Information */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Banking Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Account Name *</Label>
                      <Input
                        placeholder="Name on account"
                        value={formData.banking.accountName}
                        onChange={(e) => handleBankingChange('accountName', e.target.value)}
                        className="bg-background"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Bank Name *</Label>
                      <Input
                        placeholder="Bank name"
                        value={formData.banking.bankName}
                        onChange={(e) => handleBankingChange('bankName', e.target.value)}
                        className="bg-background"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Account Number *</Label>
                      <Input
                        placeholder="Account number"
                        value={formData.banking.accountNumber}
                        onChange={(e) => handleBankingChange('accountNumber', e.target.value)}
                        className="bg-background"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Routing Number *</Label>
                      <Input
                        placeholder="Routing number"
                        value={formData.banking.routingNumber}
                        onChange={(e) => handleBankingChange('routingNumber', e.target.value)}
                        className="bg-background"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between gap-3">
                <Button variant="outline" onClick={() => setCurrentStep('basic')}>
                  Back
                </Button>
                <div className="flex gap-3">
                  <Button variant="outline">Save Draft</Button>
                  <Button onClick={() => setCurrentStep('compliance')}>
                    Next: Compliance
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Compliance */}
          {currentStep === 'compliance' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Compliance & Documentation</h2>
                <p className="text-muted-foreground mb-6">Upload required documents and certifications</p>
              </div>

              <Alert className="border-border bg-blue-50 dark:bg-blue-950">
                <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertDescription className="text-blue-600 dark:text-blue-400">
                  All documents should be in PDF, DOCX, or image format (max 5MB)
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                {[
                  {
                    id: 'insurance',
                    title: 'Business Insurance Certificate',
                    description: 'Valid general liability and workers compensation insurance',
                  },
                  {
                    id: 'tax',
                    title: 'Tax Certificate',
                    description: 'Current federal tax exemption certificate or registration',
                  },
                  {
                    id: 'registration',
                    title: 'Business Registration',
                    description: 'Business license or articles of incorporation',
                  },
                  {
                    id: 'compliance',
                    title: 'Compliance Documentation',
                    description: 'Any industry-specific certifications or compliance documents',
                  },
                ].map(doc => (
                  <div key={doc.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={formData.documents[doc.id as keyof typeof formData.documents]}
                        onCheckedChange={(checked) =>
                          handleDocumentChange(doc.id, checked as boolean)
                        }
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{doc.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{doc.description}</p>
                      </div>
                      {formData.documents[doc.id as keyof typeof formData.documents] && (
                        <Check className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                    {!formData.documents[doc.id as keyof typeof formData.documents] && (
                      <div className="mt-3 ml-6">
                        <button className="flex items-center gap-2 text-sm text-primary hover:text-primary/80">
                          <Upload className="h-4 w-4" />
                          Upload File
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <Separator />

              {/* Agreements */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Terms & Agreements</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Checkbox id="terms" className="mt-1" />
                    <Label htmlFor="terms" className="text-sm cursor-pointer flex-1">
                      I agree to the{' '}
                      <span className="text-primary font-semibold cursor-pointer hover:underline">
                        Supplier Code of Conduct
                      </span>
                    </Label>
                  </div>
                  <div className="flex items-start gap-3">
                    <Checkbox id="privacy" className="mt-1" />
                    <Label htmlFor="privacy" className="text-sm cursor-pointer flex-1">
                      I agree to the{' '}
                      <span className="text-primary font-semibold cursor-pointer hover:underline">
                        Privacy Policy
                      </span>{' '}
                      and data processing terms
                    </Label>
                  </div>
                </div>
              </div>

              <div className="flex justify-between gap-3">
                <Button variant="outline" onClick={() => setCurrentStep('business')}>
                  Back
                </Button>
                <div className="flex gap-3">
                  <Button variant="outline">Save Draft</Button>
                  <Button onClick={() => setCurrentStep('review')}>
                    Review Application
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Review */}
          {currentStep === 'review' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Review Your Application</h2>
                <p className="text-muted-foreground mb-6">Please review all information before submitting</p>
              </div>

              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-muted p-1 rounded-lg">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="business">Business</TabsTrigger>
                  <TabsTrigger value="compliance">Compliance</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-semibold">COMPANY NAME</p>
                      <p className="text-sm font-medium text-foreground">{formData.companyName}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-semibold">INDUSTRY</p>
                      <p className="text-sm font-medium text-foreground">{formData.industry}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-semibold">CONTACT NAME</p>
                      <p className="text-sm font-medium text-foreground">{formData.contactName}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-semibold">EMAIL</p>
                      <p className="text-sm font-medium text-foreground">{formData.email}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-semibold">PHONE</p>
                      <p className="text-sm font-medium text-foreground">{formData.phone}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-semibold">WEBSITE</p>
                      <p className="text-sm font-medium text-foreground">{formData.website || 'N/A'}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="business" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-semibold">BUSINESS TYPE</p>
                      <p className="text-sm font-medium text-foreground">{formData.businessType}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-semibold">TAX ID</p>
                      <p className="text-sm font-medium text-foreground">{formData.taxId}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-semibold">ADDRESS</p>
                      <p className="text-sm font-medium text-foreground">{formData.address}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-semibold">CITY, STATE, ZIP</p>
                      <p className="text-sm font-medium text-foreground">
                        {formData.city}, {formData.state} {formData.zipCode}
                      </p>
                    </div>
                    <div className="col-span-2 space-y-1">
                      <p className="text-xs text-muted-foreground font-semibold">BANK</p>
                      <p className="text-sm font-medium text-foreground">{formData.banking.bankName}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="compliance" className="space-y-4">
                  <div className="space-y-2">
                    {Object.entries(formData.documents).map(([doc, uploaded]) => (
                      <div key={doc} className="flex items-center justify-between p-2 border border-border rounded">
                        <span className="capitalize text-sm font-medium">{doc}</span>
                        {uploaded ? (
                          <Check className="h-5 w-5 text-green-600" />
                        ) : (
                          <span className="text-xs text-muted-foreground">Not uploaded</span>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  By submitting, you confirm that all information is accurate and complete. Our team will review your
                  application within 3-5 business days.
                </p>
              </div>

              <div className="flex justify-between gap-3">
                <Button variant="outline" onClick={() => setCurrentStep('compliance')}>
                  Back
                </Button>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Submit Application
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

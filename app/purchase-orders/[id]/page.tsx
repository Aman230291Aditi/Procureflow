'use client'

import { useState } from 'react'
import { ArrowLeft, Download, Share2, MoreHorizontal, File, Check, Clock, Truck } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Mock PO data
const mockPO = {
  id: 'PO-2024-002',
  prId: 'PR-2024-004',
  vendor: 'Creative Agency Ltd.',
  title: 'Marketing Materials',
  amount: 8500,
  status: 'sent',
  date: '2024-02-03',
  dueDate: '2024-02-22',
  items: 8,
  requester: 'David Brown',
  department: 'Marketing',
  createdDate: '2024-02-03',
  paymentTerms: 'Net 30',
  deliveryAddress: '123 Business Ave, New York, NY 10001',
  currency: '$',
  lineItems: [
    {
      id: '1',
      name: 'Branding Guide Design',
      quantity: 1,
      unitPrice: 3000,
      supplier: 'Creative Agency Ltd.',
      manufacturer: 'In-House',
      total: 3000,
    },
    {
      id: '2',
      name: 'Business Cards',
      quantity: 5000,
      unitPrice: 0.5,
      supplier: 'Creative Agency Ltd.',
      manufacturer: 'Custom Print',
      total: 2500,
    },
    {
      id: '3',
      name: 'Letterhead',
      quantity: 2000,
      unitPrice: 0.8,
      supplier: 'Creative Agency Ltd.',
      manufacturer: 'Custom Print',
      total: 1600,
    },
    {
      id: '4',
      name: 'Email Signatures Design',
      quantity: 1,
      unitPrice: 1500,
      supplier: 'Creative Agency Ltd.',
      manufacturer: 'In-House',
      total: 1500,
    },
    {
      id: '5',
      name: 'Social Media Templates',
      quantity: 1,
      unitPrice: 2000,
      supplier: 'Creative Agency Ltd.',
      manufacturer: 'In-House',
      total: 2000,
    },
    {
      id: '6',
      name: 'Web Banner Ads',
      quantity: 10,
      unitPrice: 500,
      supplier: 'Creative Agency Ltd.',
      manufacturer: 'In-House',
      total: 5000,
    },
    {
      id: '7',
      name: 'Product Packaging Design',
      quantity: 1,
      unitPrice: 2500,
      supplier: 'Creative Agency Ltd.',
      manufacturer: 'In-House',
      total: 2500,
    },
    {
      id: '8',
      name: 'Marketing Collateral Print',
      quantity: 1000,
      unitPrice: 1,
      supplier: 'Creative Agency Ltd.',
      manufacturer: 'Custom Print',
      total: 1000,
    },
  ],
  timeline: [
    { status: 'Created', date: '2024-02-03', time: '10:30 AM' },
    { status: 'Sent to Vendor', date: '2024-02-03', time: '2:15 PM' },
    { status: 'Awaiting Confirmation', date: null, time: null },
    { status: 'Delivery Expected', date: '2024-02-22', time: null },
  ],
}

const statusConfig = {
  draft: { label: 'Draft', color: 'bg-slate-100 text-slate-800', icon: '📄' },
  sent: { label: 'Sent', color: 'bg-blue-100 text-blue-800', icon: '📤' },
  confirmed: { label: 'Confirmed', color: 'bg-green-100 text-green-800', icon: '✓' },
  received: { label: 'Received', color: 'bg-purple-100 text-purple-800', icon: '📦' },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: '✕' },
}

export default function PODetailPage({ params }: { params: { id: string } }) {
  const [showPdfPreview, setShowPdfPreview] = useState(false)
  const total = mockPO.lineItems.reduce((sum, item) => sum + item.total, 0)
  const tax = total * 0.1
  const grandTotal = total + tax

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/purchase-orders">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowPdfPreview(true)}>
            <Download className="h-4 w-4 mr-2" />
            PDF
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Cancel PO</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Compact Header Section */}
      <div className="space-y-3">
        {/* First Row - Key Fields */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-8 flex-1 flex-wrap">
            <div>
              <p className="text-xs text-muted-foreground">PO Number</p>
              <p className="font-semibold text-sm">{mockPO.id}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">PR Reference</p>
              <Link href={`/purchase-requisition/${mockPO.prId}`}>
                <p className="font-semibold text-sm hover:text-primary">{mockPO.prId}</p>
              </Link>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Vendor</p>
              <p className="font-semibold text-sm">{mockPO.vendor}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Created Date</p>
              <p className="font-semibold text-sm">{mockPO.date}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Due Date</p>
              <p className="font-semibold text-sm">{mockPO.dueDate}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Amount</p>
              <p className="font-semibold text-sm text-primary">{mockPO.currency}{grandTotal.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Second Row - Status & Actions */}
        <div className="flex items-center justify-between gap-4 pt-2 border-t border-border">
          <Badge className={statusConfig[mockPO.status as keyof typeof statusConfig].color}>
            {statusConfig[mockPO.status as keyof typeof statusConfig].label}
          </Badge>
          <div className="flex gap-2">
            {mockPO.status === 'sent' && (
              <>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 gap-2">
                  <Check className="h-4 w-4" />
                  Confirm Receipt
                </Button>
                <Button size="sm" variant="outline">
                  Request Changes
                </Button>
              </>
            )}
            {mockPO.status === 'draft' && (
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 gap-2">
                <Truck className="h-4 w-4" />
                Send to Vendor
              </Button>
            )}
          </div>
        </div>
      </div>

      <Separator />

      {/* Details Section */}
      <div className="grid gap-6">
        {/* General Information */}
        <Card className="border-border rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg">PO Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Requester</p>
                <p className="text-sm font-medium text-foreground">{mockPO.requester}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Department</p>
                <p className="text-sm font-medium text-foreground">{mockPO.department}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Payment Terms</p>
                <p className="text-sm font-medium text-foreground">{mockPO.paymentTerms}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Delivery Address</p>
                <p className="text-sm font-medium text-foreground">{mockPO.deliveryAddress}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Line Items */}
        <Card className="border-border rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg">Line Items</CardTitle>
            <CardDescription>{mockPO.items} items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-xs font-semibold">Item</TableHead>
                    <TableHead className="text-xs font-semibold">Supplier</TableHead>
                    <TableHead className="text-xs font-semibold">Manufacturer</TableHead>
                    <TableHead className="text-right font-semibold">Qty</TableHead>
                    <TableHead className="text-right font-semibold">Unit Price</TableHead>
                    <TableHead className="text-right font-semibold">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPO.lineItems.map((item) => (
                    <TableRow key={item.id} className="border-border">
                      <TableCell className="text-sm text-foreground">{item.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{item.supplier}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{item.manufacturer}</TableCell>
                      <TableCell className="text-right text-sm">{item.quantity}</TableCell>
                      <TableCell className="text-right text-sm">{mockPO.currency}{item.unitPrice.toFixed(2)}</TableCell>
                      <TableCell className="text-right text-sm font-medium">{mockPO.currency}{item.total.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Totals */}
            <div className="mt-6 space-y-2 border-t border-border pt-4 ml-auto max-w-xs">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-medium">{mockPO.currency}{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (10%):</span>
                <span className="font-medium">{mockPO.currency}{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold border-t border-border pt-2">
                <span>Total:</span>
                <span className="text-primary">{mockPO.currency}{grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="border-border rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg">PO Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPO.timeline.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${event.date ? 'bg-green-600' : 'bg-muted'}`}></div>
                    {index !== mockPO.timeline.length - 1 && (
                      <div className="w-0.5 h-12 bg-border mt-1"></div>
                    )}
                  </div>
                  <div className="pb-4">
                    <p className="font-medium text-sm text-foreground">{event.status}</p>
                    {event.date && (
                      <p className="text-xs text-muted-foreground">
                        {event.date} {event.time && `at ${event.time}`}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* PDF Preview Modal */}
      {showPdfPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-xl border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between bg-muted">
              <CardTitle>PO PDF Preview</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPdfPreview(false)}
              >
                ✕
              </Button>
            </CardHeader>
            <CardContent className="overflow-y-auto max-h-[calc(90vh-60px)] p-8 bg-white">
              {/* PDF Content */}
              <div className="space-y-6 text-foreground">
                <div className="text-center">
                  <h1 className="text-2xl font-bold">PURCHASE ORDER</h1>
                  <p className="text-sm text-muted-foreground mt-1">{mockPO.id}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">BILL TO</p>
                    <p className="font-semibold mt-2">Your Company Name</p>
                    <p className="text-sm text-muted-foreground">123 Business Ave</p>
                    <p className="text-sm text-muted-foreground">New York, NY 10001</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">SHIP TO</p>
                    <p className="font-semibold mt-2">{mockPO.vendor}</p>
                    <p className="text-sm text-muted-foreground">{mockPO.deliveryAddress}</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">PO Date</p>
                    <p className="font-medium mt-1">{mockPO.date}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">Due Date</p>
                    <p className="font-medium mt-1">{mockPO.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">Payment Terms</p>
                    <p className="font-medium mt-1">{mockPO.paymentTerms}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">Requisition Ref</p>
                    <p className="font-medium mt-1">{mockPO.prId}</p>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left">Description</TableHead>
                      <TableHead className="text-right">Qty</TableHead>
                      <TableHead className="text-right">Unit Price</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPO.lineItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="text-sm">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Supplier: {item.supplier}</p>
                        </TableCell>
                        <TableCell className="text-right text-sm">{item.quantity}</TableCell>
                        <TableCell className="text-right text-sm">{mockPO.currency}{item.unitPrice.toFixed(2)}</TableCell>
                        <TableCell className="text-right text-sm font-medium">{mockPO.currency}{item.total.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="flex justify-end">
                  <div className="w-64 space-y-2 border-t border-border pt-4">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>{mockPO.currency}{total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax:</span>
                      <span>{mockPO.currency}{tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-base border-t border-border pt-2">
                      <span>Total:</span>
                      <span>{mockPO.currency}{grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border text-xs text-muted-foreground">
                  <p>Thank you for your business!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'
import { ArrowLeft, Download, Share2, MoreHorizontal, Upload, FileText, MessageSquare, Clock, Check, Trash2, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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

const mockData = {
  id: 'PR-2024-001',
  title: 'Office Equipment & Supplies',
  status: 'pending-approval',
  priority: 'high',
  type: 'Standard Purchase',
  roNumber: 'RO-2024-001',
  date: '2024-01-15',
  createdBy: 'Sarah Johnson',
  requester: 'Sarah Johnson',
  department: 'Operations',
  costCenter: 'CC-2024-001',
  projectCode: 'PRJ-2024-Q1',
  needByDate: '2024-02-15',
  currency: 'USD',
  paymentTerms: 'Net 30',
  justification: 'Required for new office setup and employee onboarding initiatives.',
  amount: 15000,
  items: [
    {
      id: '1',
      name: 'HP LaserJet Pro M404n',
      sku: 'HP-LJ-404N',
      supplier: 'HP Inc.',
      manufacturer: 'HP',
      mfgPartNumber: 'CF389A',
      quantity: 2,
      unitPrice: 400.00,
      uom: 'EA',
      tax: 96.00,
      total: 896.00,
      leadTime: '3-5 days',
      paymentTerms: 'Net 30',
      warranty: '3 years',
      expanded: false,
    },
    {
      id: '2',
      name: 'Dell OptiPlex 7090',
      sku: 'DL-OPT-7090',
      supplier: 'Dell Technologies',
      manufacturer: 'Dell',
      mfgPartNumber: 'N004O7090DT',
      quantity: 5,
      unitPrice: 850.00,
      uom: 'EA',
      tax: 637.50,
      total: 4887.50,
      leadTime: '5-7 days',
      paymentTerms: 'Net 30',
      warranty: '5 years',
      expanded: false,
    },
    {
      id: '3',
      name: 'Logitech MX Master 3',
      sku: 'LOG-MX3',
      supplier: 'Logitech',
      manufacturer: 'Logitech',
      mfgPartNumber: '910-005710',
      quantity: 10,
      unitPrice: 99.99,
      uom: 'EA',
      tax: 125.00,
      total: 1124.90,
      leadTime: '1-2 days',
      paymentTerms: 'Net 15',
      warranty: '2 years',
      expanded: false,
    },
  ],
  approvers: [
    { id: '1', level: 1, name: 'John Manager', role: 'Manager Approval', status: 'approved', avatar: 'JM' },
    { id: '2', level: 2, name: 'Sarah Procurement', role: 'Procurement Approval', status: 'pending', avatar: 'SP' },
    { id: '3', level: 3, name: 'Mike Finance', role: 'Finance Approval', status: 'pending', avatar: 'MF' },
    { id: '4', level: 4, name: 'CEO Office', role: 'Final Approval', status: 'pending', avatar: 'CO' },
  ],
  attachments: [
    { id: '1', name: 'Quote_TechSolutions.pdf', size: '2.4 MB', type: 'PDF' },
    { id: '2', name: 'Specification_Sheet.docx', size: '1.2 MB', type: 'DOCX' },
  ],
  activities: [
    {
      id: '1',
      action: 'Created requisition',
      user: 'Sarah Johnson',
      timestamp: '2024-01-15 10:30 AM',
      type: 'created',
    },
    {
      id: '2',
      action: 'Submitted for approval',
      user: 'Sarah Johnson',
      timestamp: '2024-01-15 11:15 AM',
      type: 'submitted',
    },
    {
      id: '3',
      action: 'Approved by Manager',
      user: 'John Manager',
      timestamp: '2024-01-15 02:45 PM',
      type: 'approved',
    },
  ],
}

export default function PRDetailPage({ params }: { params: { id: string } }) {
  const [items, setItems] = useState(mockData.items)
  const [noteInput, setNoteInput] = useState('')
  const [notes, setNotes] = useState<{ id: string; text: string; author: string; timestamp: string }[]>([])
  const [approveDialogOpen, setApproveDialogOpen] = useState(false)
  const [approvalComments, setApprovalComments] = useState('')
  const [isApprovalSubmitted, setIsApprovalSubmitted] = useState(false)

  const toggleItemDetails = (itemId: string) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, expanded: !item.expanded } : item
    ))
  }

  const addNote = () => {
    if (noteInput.trim()) {
      setNotes([
        ...notes,
        {
          id: Date.now().toString(),
          text: noteInput,
          author: 'You',
          timestamp: new Date().toLocaleString(),
        },
      ])
      setNoteInput('')
    }
  }

  const handleApprove = () => {
    setIsApprovalSubmitted(true)
    setTimeout(() => {
      setApproveDialogOpen(false)
      setApprovalComments('')
      setIsApprovalSubmitted(false)
    }, 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'pending':
      case 'pending-approval':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending-approval':
        return 'Pending Approval'
      default:
        return status.charAt(0).toUpperCase() + status.slice(1)
    }
  }

  const totalAmount = items.reduce((sum, item) => sum + item.total, 0)
  const totalTax = items.reduce((sum, item) => sum + item.tax, 0)
  const grandTotal = totalAmount + totalTax

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/purchase-requisition">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-foreground">{mockData.id}</h1>
              <Badge className={getStatusColor(mockData.status)}>
                {getStatusLabel(mockData.status)}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">{mockData.title}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Archive</DropdownMenuItem>
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
              <p className="text-xs text-muted-foreground">Type</p>
              <p className="font-semibold text-sm">{mockData.type}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">RO Number</p>
              <p className="font-semibold text-sm">{mockData.roNumber}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Date</p>
              <p className="font-semibold text-sm">{mockData.date}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Client</p>
              <select className="font-semibold text-sm bg-transparent border-0 p-0 cursor-pointer">
                <option>{mockData.createdBy}</option>
              </select>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Assigned To</p>
              <select className="font-semibold text-sm bg-transparent border-0 p-0 cursor-pointer">
                <option>{mockData.approvers[0].name}</option>
              </select>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Current QCD</p>
              <p className="font-semibold text-sm">{grandTotal.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Second Row - Status & Actions */}
        <div className="flex items-center justify-between gap-4 pt-2 border-t border-border">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div>
                <p className="text-xs font-semibold">Authorized</p>
                <p className="text-xs text-muted-foreground">$120.80 • 24 March 2022 • 10:24 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div>
                <p className="text-xs font-semibold">Pending</p>
                <p className="text-xs text-muted-foreground">$95.25 • 24 March 2022 • 09:30 AM</p>
              </div>
            </div>
          </div>
          <Dialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700 gap-2">
                <Check className="h-4 w-4" />
                Approve
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              {!isApprovalSubmitted ? (
                <>
                  <DialogHeader>
                    <DialogTitle>Approve Purchase Requisition</DialogTitle>
                    <DialogDescription>
                      Review and confirm your approval for PR-{mockData.id}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-sm font-semibold text-foreground">Requisition Details</p>
                        </div>
                        <Badge className={getStatusColor(mockData.status)}>
                          {getStatusLabel(mockData.status)}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Items:</span>
                          <span className="font-medium">{items.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Amount:</span>
                          <span className="font-medium">{mockData.currency} {grandTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Requester:</span>
                          <span className="font-medium">{mockData.requester}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Approval Comments (Optional)</label>
                      <Textarea
                        placeholder="Add any comments or notes..."
                        value={approvalComments}
                        onChange={(e) => setApprovalComments(e.target.value)}
                        className="min-h-24"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setApproveDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700" onClick={handleApprove}>
                      <Check className="h-4 w-4 mr-2" />
                      Confirm Approval
                    </Button>
                  </DialogFooter>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Approved!</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    The purchase requisition has been successfully approved and sent to the next level.
                  </p>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Request Information */}
      <Card className="border-border rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg">Request Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Requester</p>
              <p className="font-medium text-sm">{mockData.requester}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Department</p>
              <p className="font-medium text-sm">{mockData.department}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Cost Center</p>
              <p className="font-medium text-sm">{mockData.costCenter}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Project Code</p>
              <p className="font-medium text-sm">{mockData.projectCode}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Need By Date</p>
              <p className="font-medium text-sm">{mockData.needByDate}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Payment Terms</p>
              <p className="font-medium text-sm">{mockData.paymentTerms}</p>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-xs text-muted-foreground mb-2">Justification</p>
            <p className="text-sm text-foreground leading-relaxed">{mockData.justification}</p>
          </div>
        </CardContent>
      </Card>

      {/* Items Section */}
      <Card className="border-border rounded-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Items ({items.length})</CardTitle>
            <Badge variant="outline">{mockData.currency}</Badge>
          </div>
          <CardDescription>Line items included in this requisition</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="border border-border rounded-lg">
              {/* Item Header */}
              <div className="p-4 flex items-start justify-between gap-4 bg-muted/30">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">SKU: {item.sku}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleItemDetails(item.id)}
                  className="gap-1"
                >
                  <span className="text-xs">Details</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${item.expanded ? 'rotate-180' : ''}`}
                  />
                </Button>
              </div>

              {/* Item Details Grid */}
              <div className="p-4 border-t border-border grid grid-cols-2 md:grid-cols-6 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Qty</p>
                  <p className="font-medium text-sm">{item.quantity}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Unit Price</p>
                  <p className="font-medium text-sm">{mockData.currency} {item.unitPrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">UOM</p>
                  <p className="font-medium text-sm">{item.uom}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Tax</p>
                  <p className="font-medium text-sm">{mockData.currency} {item.tax.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Total</p>
                  <p className="font-semibold text-sm text-primary">{mockData.currency} {item.total.toFixed(2)}</p>
                </div>
                <div className="flex items-end justify-end">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>

              {/* Expanded Supplier & Manufacturer Details */}
              {item.expanded && (
                <div className="p-4 border-t border-border bg-muted/20 space-y-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Supplier & Manufacturer Information</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Supplier</p>
                      <p className="font-medium text-sm text-foreground">{item.supplier}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Manufacturer</p>
                      <p className="font-medium text-sm text-foreground">{item.manufacturer}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Mfg Part Number</p>
                      <p className="font-medium text-sm text-foreground">{item.mfgPartNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Lead Time</p>
                      <p className="font-medium text-sm text-foreground">{item.leadTime}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Payment Terms</p>
                      <p className="font-medium text-sm text-foreground">{item.paymentTerms}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Warranty</p>
                      <p className="font-medium text-sm text-foreground">{item.warranty}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Totals Summary */}
          <Separator className="my-4" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-end gap-32">
              <span className="text-muted-foreground">Subtotal:</span>
              <span className="font-medium">{mockData.currency} {totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-end gap-32">
              <span className="text-muted-foreground">Tax:</span>
              <span className="font-medium">{mockData.currency} {totalTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-end gap-32 pt-2 border-t border-border">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-lg text-primary">{mockData.currency} {grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Approval Workflow */}
      <Card className="border-border rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg">Approval Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockData.approvers.map((approver, index) => (
              <div key={approver.id}>
                <div className="flex items-center gap-4 p-4 rounded-lg border border-border bg-muted/30">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary font-semibold text-sm flex-shrink-0">
                    {approver.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{approver.name}</div>
                    <div className="text-xs text-muted-foreground">{approver.role}</div>
                  </div>
                  <Badge className={approver.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    <span className="inline-flex items-center gap-1">
                      {approver.status === 'approved' ? (
                        <>
                          <Check className="h-4 w-4" />
                          Approved
                        </>
                      ) : (
                        <>
                          <Clock className="h-4 w-4" />
                          Pending
                        </>
                      )}
                    </span>
                  </Badge>
                </div>
                {index < mockData.approvers.length - 1 && (
                  <div className="flex justify-center py-1">
                    <div className="w-0.5 h-4 bg-border"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Attachments */}
      <Card className="border-border rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg">Attachments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockData.attachments.length > 0 ? (
            <div className="space-y-2">
              {mockData.attachments.map(attachment => (
                <div key={attachment.id} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent transition-colors">
                  <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{attachment.name}</p>
                    <p className="text-xs text-muted-foreground">{attachment.size}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No attachments</p>
          )}
          <Button variant="outline" className="w-full mt-2">
            <Upload className="h-4 w-4 mr-2" />
            Add Attachment
          </Button>
        </CardContent>
      </Card>

      {/* Activity Timeline */}
      <Card className="border-border rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg">Activity Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.activities.map((activity, index) => (
              <div key={activity.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-primary mt-2"></div>
                  {index < mockData.activities.length - 1 && <div className="w-0.5 h-12 bg-border mt-2"></div>}
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.user}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notes & Comments */}
      <Card className="border-border rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg">Notes & Comments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {notes.map(note => (
              <div key={note.id} className="p-3 rounded-lg bg-muted/50 border border-border">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm font-medium">{note.author}</p>
                  <p className="text-xs text-muted-foreground">{note.timestamp}</p>
                </div>
                <p className="text-sm text-foreground">{note.text}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2 pt-4 border-t border-border">
            <label className="text-sm font-medium">Add a note</label>
            <Textarea
              placeholder="Add your comment or note..."
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              className="border-border bg-background"
              rows={3}
            />
            <Button onClick={addNote} className="bg-primary hover:bg-primary/90">
              Add Note
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

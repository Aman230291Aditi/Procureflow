'use client'

import { Plus, Edit2, Trash2, MoreHorizontal, ChevronRight, Lock } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'

const mockWorkflows = [
  {
    id: '1',
    name: 'Standard PR Approval',
    docType: 'Purchase Requisition',
    levels: [
      { level: 1, role: 'Department Manager', approvers: 'John Manager' },
      { level: 2, role: 'Procurement Manager', approvers: 'Sarah Procurement' },
      { level: 3, role: 'Finance Manager', approvers: 'Mike Finance' },
    ],
  },
  {
    id: '2',
    name: 'PO Approval Flow',
    docType: 'Purchase Order',
    levels: [
      { level: 1, role: 'Procurement Specialist', approvers: 'Sarah Procurement' },
      { level: 2, role: 'Finance', approvers: 'Mike Finance' },
    ],
  },
  {
    id: '3',
    name: 'High Value PR',
    docType: 'Purchase Requisition (> $10,000)',
    levels: [
      { level: 1, role: 'Department Manager', approvers: 'John Manager' },
      { level: 2, role: 'Procurement Manager', approvers: 'Sarah Procurement' },
      { level: 3, role: 'Finance Manager', approvers: 'Mike Finance' },
      { level: 4, role: 'CEO', approvers: 'CEO Office' },
    ],
  },
]

export default function ApprovalsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedWorkflow, setSelectedWorkflow] = useState<typeof mockWorkflows[0] | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Approval Workflow</h1>
          <p className="text-muted-foreground mt-2">Configure approval hierarchies and workflows</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              New Workflow
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Approval Workflow</DialogTitle>
              <DialogDescription>Set up a new approval workflow for documents</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="w-name">Workflow Name</Label>
                <Input id="w-name" placeholder="e.g., Standard PR Approval" className="border-border" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="w-type">Document Type</Label>
                <Select>
                  <SelectTrigger className="border-border">
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pr">Purchase Requisition</SelectItem>
                    <SelectItem value="po">Purchase Order</SelectItem>
                    <SelectItem value="invoice">Invoice</SelectItem>
                    <SelectItem value="request">General Request</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="w-condition">Condition (Optional)</Label>
                <Input id="w-condition" placeholder="e.g., Amount > $10,000" className="border-border" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsAddDialogOpen(false)}>Create Workflow</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Workflows Grid */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {mockWorkflows.map((workflow) => (
          <Card
            key={workflow.id}
            className="border-border rounded-xl cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedWorkflow(workflow)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{workflow.name}</CardTitle>
                  <CardDescription className="mt-1">{workflow.docType}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2"><Edit2 className="h-4 w-4" />Edit</DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-destructive"><Trash2 className="h-4 w-4" />Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {workflow.levels.map((level, idx) => (
                  <div key={level.level} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-semibold text-primary">{level.level}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{level.role}</p>
                      <p className="text-xs text-muted-foreground">{level.approvers}</p>
                    </div>
                    {idx < workflow.levels.length - 1 && (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Workflow Details Modal */}
      {selectedWorkflow && (
        <Dialog open={!!selectedWorkflow} onOpenChange={() => setSelectedWorkflow(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedWorkflow.name}</DialogTitle>
              <DialogDescription>{selectedWorkflow.docType}</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div>
                <h3 className="font-semibold text-foreground mb-4">Approval Levels</h3>
                <div className="space-y-4">
                  {selectedWorkflow.levels.map((level, idx) => (
                    <div key={level.level}>
                      <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-semibold text-primary">{level.level}</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{level.role}</p>
                          <p className="text-sm text-muted-foreground">{level.approvers}</p>
                        </div>
                        <Badge>Level {level.level}</Badge>
                      </div>
                      {idx < selectedWorkflow.levels.length - 1 && (
                        <div className="flex justify-center my-2">
                          <ChevronRight className="h-5 w-5 text-muted-foreground rotate-90" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Approval Requirements</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>All levels must approve in sequential order</li>
                      <li>Approvers cannot skip levels</li>
                      <li>Approval comments are recorded in history</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedWorkflow(null)}>Close</Button>
              <Button className="bg-primary hover:bg-primary/90">Edit Workflow</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

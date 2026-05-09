'use client'

import { Plus, Search, MoreHorizontal, Edit2, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const mockTerms = [
  { id: '1', name: 'Net 30', days: 30, description: 'Payment due within 30 days', discount: 0 },
  { id: '2', name: 'Net 60', days: 60, description: 'Payment due within 60 days', discount: 0 },
  { id: '3', name: '2/10 Net 30', days: 30, description: '2% discount if paid in 10 days', discount: 2 },
  { id: '4', name: 'Due on Receipt', days: 0, description: 'Payment due immediately', discount: 0 },
  { id: '5', name: 'Net 45', days: 45, description: 'Payment due within 45 days', discount: 0 },
  { id: '6', name: 'End of Month', days: 30, description: 'Payment due end of following month', discount: 0 },
]

export default function PaymentTermsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newTerm, setNewTerm] = useState({ name: '', days: '', description: '', discount: '' })

  const filteredTerms = mockTerms.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payment Terms</h1>
          <p className="text-muted-foreground mt-2">Manage standard payment terms and conditions</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Payment Terms
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Payment Terms</DialogTitle>
              <DialogDescription>Create new payment term options</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="term-name">Term Name</Label>
                <Input id="term-name" placeholder="e.g., Net 30" value={newTerm.name} onChange={(e) => setNewTerm({ ...newTerm, name: e.target.value })} className="border-border" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="term-days">Days</Label>
                <Input id="term-days" type="number" placeholder="30" value={newTerm.days} onChange={(e) => setNewTerm({ ...newTerm, days: e.target.value })} className="border-border" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="term-desc">Description</Label>
                <Input id="term-desc" placeholder="Payment due within 30 days" value={newTerm.description} onChange={(e) => setNewTerm({ ...newTerm, description: e.target.value })} className="border-border" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsAddDialogOpen(false)}>Add Terms</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-border rounded-xl">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search payment terms..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 border-border" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border rounded-xl">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-xs font-semibold">Term Name</TableHead>
                <TableHead className="text-xs font-semibold">Days</TableHead>
                <TableHead className="text-xs font-semibold">Description</TableHead>
                <TableHead className="text-xs font-semibold">Early Pay Discount</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTerms.map((t) => (
                <TableRow key={t.id} className="border-border hover:bg-accent/50">
                  <TableCell className="font-semibold">{t.name}</TableCell>
                  <TableCell>{t.days} days</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{t.description}</TableCell>
                  <TableCell>{t.discount > 0 ? `${t.discount}%` : 'None'}</TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2"><Edit2 className="h-4 w-4" />Edit</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive"><Trash2 className="h-4 w-4" />Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

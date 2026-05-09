'use client'

import { useState } from 'react'
import { Plus, Search, MoreHorizontal, Edit2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const mockCostCenters = [
  { id: '1', code: '5000', name: 'Salaries & Wages', department: 'HR', budget: 500000, status: 'active' },
  { id: '2', code: '5100', name: 'Office Supplies', department: 'Operations', budget: 50000, status: 'active' },
  { id: '3', code: '5200', name: 'IT Infrastructure', department: 'IT', budget: 150000, status: 'active' },
  { id: '4', code: '5300', name: 'Marketing Campaigns', department: 'Marketing', budget: 100000, status: 'active' },
  { id: '5', code: '5400', name: 'Facilities Maintenance', department: 'Facilities', budget: 75000, status: 'inactive' },
  { id: '6', code: '5500', name: 'Software Licenses', department: 'IT', budget: 200000, status: 'active' },
]

export default function CostCentersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newCC, setNewCC] = useState({ code: '', name: '', department: '', budget: '' })

  const filteredCC = mockCostCenters.filter(cc =>
    cc.code.includes(searchTerm) || cc.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cost Centers</h1>
          <p className="text-muted-foreground mt-2">Manage cost allocation and budgets</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Cost Center
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Cost Center</DialogTitle>
              <DialogDescription>Create a new cost center for budget tracking</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cc-code">Cost Center Code</Label>
                <Input
                  id="cc-code"
                  placeholder="e.g., 5000"
                  value={newCC.code}
                  onChange={(e) => setNewCC({ ...newCC, code: e.target.value })}
                  className="border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cc-name">Cost Center Name</Label>
                <Input
                  id="cc-name"
                  placeholder="e.g., Salaries & Wages"
                  value={newCC.name}
                  onChange={(e) => setNewCC({ ...newCC, name: e.target.value })}
                  className="border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cc-dept">Department</Label>
                <Select value={newCC.department} onValueChange={(v) => setNewCC({ ...newCC, department: v })}>
                  <SelectTrigger className="border-border">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cc-budget">Annual Budget</Label>
                <Input
                  id="cc-budget"
                  type="number"
                  placeholder="e.g., 50000"
                  value={newCC.budget}
                  onChange={(e) => setNewCC({ ...newCC, budget: e.target.value })}
                  className="border-border"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsAddDialogOpen(false)}>Add Cost Center</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-border rounded-xl">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search cost centers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-border"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border rounded-xl">
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-xs font-semibold">Code</TableHead>
                  <TableHead className="text-xs font-semibold">Name</TableHead>
                  <TableHead className="text-xs font-semibold">Department</TableHead>
                  <TableHead className="text-xs font-semibold">Budget</TableHead>
                  <TableHead className="text-xs font-semibold">Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCC.map((cc) => (
                  <TableRow key={cc.id} className="border-border hover:bg-accent/50">
                    <TableCell className="font-semibold text-sm">{cc.code}</TableCell>
                    <TableCell>{cc.name}</TableCell>
                    <TableCell className="text-sm">{cc.department}</TableCell>
                    <TableCell className="font-medium">${(cc.budget / 1000).toFixed(0)}K</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        cc.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {cc.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
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
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

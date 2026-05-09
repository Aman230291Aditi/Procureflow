'use client'

import { useState } from 'react'
import { Plus, Search, MoreHorizontal, Trash2, Edit2, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Textarea } from '@/components/ui/textarea'

const ITEMS_PER_PAGE = 5

const mockDepartments = [
  { id: '1', name: 'Operations', code: 'OPS', description: 'Operations and general administration', manager: 'Sarah Johnson', headCount: 12 },
  { id: '2', name: 'IT', code: 'IT', description: 'Information Technology and Infrastructure', manager: 'Michael Chen', headCount: 8 },
  { id: '3', name: 'Finance', code: 'FIN', description: 'Accounting and Financial Management', manager: 'David Brown', headCount: 6 },
  { id: '4', name: 'Marketing', code: 'MKT', description: 'Marketing and Communications', manager: 'Emily Davis', headCount: 10 },
  { id: '5', name: 'HR', code: 'HR', description: 'Human Resources and Recruitment', manager: 'Lisa Anderson', headCount: 4 },
  { id: '6', name: 'Facilities', code: 'FAC', description: 'Facilities and Building Management', manager: 'Robert Martinez', headCount: 7 },
]

export default function DepartmentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newDept, setNewDept] = useState({
    name: '',
    code: '',
    description: '',
    manager: '',
  })

  const filteredDepts = mockDepartments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredDepts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedDepts = filteredDepts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Departments</h1>
          <p className="text-muted-foreground mt-2">Manage organizational departments and cost centers</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Department
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Department</DialogTitle>
              <DialogDescription>Create a new department in your organization</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dept-name">Department Name</Label>
                <Input
                  id="dept-name"
                  placeholder="e.g., Operations"
                  value={newDept.name}
                  onChange={(e) => setNewDept({ ...newDept, name: e.target.value })}
                  className="border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dept-code">Department Code</Label>
                <Input
                  id="dept-code"
                  placeholder="e.g., OPS"
                  maxLength={5}
                  value={newDept.code}
                  onChange={(e) => setNewDept({ ...newDept, code: e.target.value.toUpperCase() })}
                  className="border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dept-desc">Description</Label>
                <Textarea
                  id="dept-desc"
                  placeholder="Department description"
                  value={newDept.description}
                  onChange={(e) => setNewDept({ ...newDept, description: e.target.value })}
                  className="border-border min-h-24"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsAddDialogOpen(false)}>Add Department</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-border rounded-xl">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
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
                  <TableHead className="text-xs font-semibold">Department Name</TableHead>
                  <TableHead className="text-xs font-semibold">Code</TableHead>
                  <TableHead className="text-xs font-semibold">Manager</TableHead>
                  <TableHead className="text-xs font-semibold">Head Count</TableHead>
                  <TableHead className="text-xs font-semibold">Description</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedDepts.map((dept) => (
                  <TableRow key={dept.id} className="border-border hover:bg-accent/50">
                    <TableCell className="font-medium">{dept.name}</TableCell>
                    <TableCell><span className="px-2 py-1 bg-gray-100 rounded text-xs font-semibold">{dept.code}</span></TableCell>
                    <TableCell className="text-sm">{dept.manager}</TableCell>
                    <TableCell className="text-sm">{dept.headCount} members</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs truncate">{dept.description}</TableCell>
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

      {filteredDepts.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredDepts.length)} of {filteredDepts.length}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="gap-1">
              <ChevronLeft className="h-4 w-4" />Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button key={page} variant={currentPage === page ? 'default' : 'outline'} size="sm" onClick={() => setCurrentPage(page)} className="w-8 h-8 p-0">
                  {page}
                </Button>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="gap-1">
              Next<ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

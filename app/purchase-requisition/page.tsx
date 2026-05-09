'use client'

import { useState } from 'react'
import { Plus, Search, Filter, Download, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Sample requisition data
const requisitions = [
  {
    id: 'PR-2024-001',
    title: 'Office Equipment & Supplies',
    requester: 'Sarah Johnson',
    department: 'Operations',
    amount: 15000,
    status: 'approved',
    date: '2024-01-15',
    dueDate: '2024-02-15',
    items: 5,
  },
  {
    id: 'PR-2024-002',
    title: 'Software Licenses Renewal',
    requester: 'Michael Chen',
    department: 'IT',
    amount: 45000,
    status: 'pending',
    date: '2024-01-18',
    dueDate: '2024-02-20',
    items: 3,
  },
  {
    id: 'PR-2024-003',
    title: 'Infrastructure Upgrade',
    requester: 'Emma Wilson',
    department: 'Facilities',
    amount: 250000,
    status: 'draft',
    date: '2024-01-20',
    dueDate: '2024-03-01',
    items: 12,
  },
  {
    id: 'PR-2024-004',
    title: 'Marketing Materials',
    requester: 'David Brown',
    department: 'Marketing',
    amount: 8500,
    status: 'approved',
    date: '2024-01-22',
    dueDate: '2024-02-22',
    items: 8,
  },
  {
    id: 'PR-2024-005',
    title: 'Maintenance Equipment',
    requester: 'Jessica Rodriguez',
    department: 'Maintenance',
    amount: 32000,
    status: 'rejected',
    date: '2024-01-25',
    dueDate: '2024-02-25',
    items: 6,
  },
  {
    id: 'PR-2024-006',
    title: 'Training & Development',
    requester: 'Robert Taylor',
    department: 'HR',
    amount: 22000,
    status: 'pending',
    date: '2024-01-28',
    dueDate: '2024-03-10',
    items: 4,
  },
  {
    id: 'PR-2024-007',
    title: 'Cloud Services Subscription',
    requester: 'Lisa Anderson',
    department: 'IT',
    amount: 18000,
    status: 'approved',
    date: '2024-02-01',
    dueDate: '2024-02-28',
    items: 2,
  },
  {
    id: 'PR-2024-008',
    title: 'Office Refurbishment',
    requester: 'John Martinez',
    department: 'Operations',
    amount: 125000,
    status: 'pending',
    date: '2024-02-03',
    dueDate: '2024-03-15',
    items: 15,
  },
]

const statusConfig = {
  draft: { label: 'Draft', color: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300' },
  pending: { label: 'Pending Approval', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-200' },
  approved: { label: 'Approved', color: 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-200' },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-200' },
}

const ITEMS_PER_PAGE = 5

export default function PurchaseRequisitionPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredRequisitions = requisitions.filter((req) => {
    const matchesSearch = req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter
    const matchesDepartment = departmentFilter === 'all' || req.department === departmentFilter

    return matchesSearch && matchesStatus && matchesDepartment
  })

  const totalPages = Math.ceil(filteredRequisitions.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedRequisitions = filteredRequisitions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  const handleClearFilters = () => {
    setSearchTerm('')
    setStatusFilter('all')
    setDepartmentFilter('all')
    setCurrentPage(1)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Purchase Requisitions</h1>
          <p className="text-muted-foreground mt-2">Manage and track purchase requisitions</p>
        </div>
        <Link href="/purchase-requisition/create">
          <Button className="bg-primary hover:bg-primary/90 w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Create Requisition
          </Button>
        </Link>
      </div>

      {/* Filters and Search */}
      <Card className="border-border">
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Search and Filters Row */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search by PR ID or title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background border-border"
                  />
                </div>
              </div>

              {/* Filter Button */}
              <Button variant="outline" size="sm" className="gap-2 border-border">
                <Filter className="h-4 w-4" />
                Filters
              </Button>

              {/* Export Button */}
              <Button variant="outline" size="sm" className="gap-2 border-border">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>

            {/* Filter Selects */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-foreground block mb-2">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="pending">Pending Approval</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <label className="text-sm font-medium text-foreground block mb-2">Department</label>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="Facilities">Facilities</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Clear Filters */}
              {(searchTerm || statusFilter !== 'all' || departmentFilter !== 'all') && (
                <div className="flex items-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Info */}
      <div className="text-sm text-muted-foreground">
        Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredRequisitions.length)} of {filteredRequisitions.length} requisitions
      </div>

      {/* Table */}
      <Card className="border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-card border-b border-border">
                <TableRow className="hover:bg-card">
                  <TableHead className="font-semibold text-foreground">PR ID</TableHead>
                  <TableHead className="font-semibold text-foreground">Title</TableHead>
                  <TableHead className="font-semibold text-foreground">Requester</TableHead>
                  <TableHead className="font-semibold text-foreground">Department</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">Amount</TableHead>
                  <TableHead className="font-semibold text-foreground">Status</TableHead>
                  <TableHead className="font-semibold text-foreground">Items</TableHead>
                  <TableHead className="font-semibold text-foreground">Due Date</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedRequisitions.map((req) => (
                  <TableRow key={req.id} className="border-b border-border hover:bg-accent/50 transition-colors cursor-pointer">
                    <TableCell className="font-medium text-foreground">
                      <Link href={`/purchase-requisition/${req.id}`} className="hover:text-primary">
                        {req.id}
                      </Link>
                    </TableCell>
                    <TableCell className="text-foreground">
                      <Link href={`/purchase-requisition/${req.id}`} className="hover:text-primary">
                        {req.title}
                      </Link>
                    </TableCell>
                    <TableCell className="text-foreground">{req.requester}</TableCell>
                    <TableCell className="text-muted-foreground">{req.department}</TableCell>
                    <TableCell className="text-right font-medium text-foreground">
                      ${(req.amount / 1000).toFixed(0)}K
                    </TableCell>
                    <TableCell>
                      <Badge className={statusConfig[req.status as keyof typeof statusConfig].color}>
                        {statusConfig[req.status as keyof typeof statusConfig].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{req.items}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(req.dueDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Link href={`/purchase-requisition/${req.id}`}>View Details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem>View Attachments</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
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

      {/* Pagination Controls */}
      {filteredRequisitions.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="gap-1"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {filteredRequisitions.length === 0 && (
        <Card className="border-border border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground text-lg">No requisitions found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Plus, Search, Filter, Download, MoreHorizontal, ChevronLeft, ChevronRight, FileText, Truck, Clock } from 'lucide-react'
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

const ITEMS_PER_PAGE = 5

// Sample PO data
const purchaseOrders = [
  {
    id: 'PO-2024-001',
    prId: 'PR-2024-001',
    vendor: 'TechSupply Co.',
    title: 'Office Equipment & Supplies',
    amount: 15000,
    status: 'draft',
    date: '2024-02-01',
    dueDate: '2024-02-15',
    items: 5,
    requester: 'Sarah Johnson',
    department: 'Operations',
  },
  {
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
  },
  {
    id: 'PO-2024-003',
    prId: 'PR-2024-001',
    vendor: 'Global Supplies Inc.',
    title: 'Additional Office Supplies',
    amount: 5200,
    status: 'confirmed',
    date: '2024-02-05',
    dueDate: '2024-02-20',
    items: 3,
    requester: 'Sarah Johnson',
    department: 'Operations',
  },
  {
    id: 'PO-2024-004',
    prId: 'PR-2024-002',
    vendor: 'Software Solutions Ltd.',
    title: 'Software Licenses',
    amount: 45000,
    status: 'confirmed',
    date: '2024-02-07',
    dueDate: '2024-03-20',
    items: 3,
    requester: 'Michael Chen',
    department: 'IT',
  },
  {
    id: 'PO-2024-005',
    prId: 'PR-2024-004',
    vendor: 'Print House Plus',
    title: 'Branding & Print Materials',
    amount: 3200,
    status: 'received',
    date: '2024-02-10',
    dueDate: '2024-02-25',
    items: 4,
    requester: 'David Brown',
    department: 'Marketing',
  },
  {
    id: 'PO-2024-006',
    prId: 'PR-2024-001',
    vendor: 'Office Furniture Mart',
    title: 'Furniture & Fixtures',
    amount: 6800,
    status: 'cancelled',
    date: '2024-02-12',
    dueDate: '2024-03-10',
    items: 2,
    requester: 'Sarah Johnson',
    department: 'Operations',
  },
  {
    id: 'PO-2024-007',
    prId: 'PR-2024-002',
    vendor: 'Tech Support Services',
    title: 'Implementation Services',
    amount: 12000,
    status: 'sent',
    date: '2024-02-14',
    dueDate: '2024-03-15',
    items: 1,
    requester: 'Michael Chen',
    department: 'IT',
  },
  {
    id: 'PO-2024-008',
    prId: 'PR-2024-004',
    vendor: 'Digital Marketing Pro',
    title: 'Digital Marketing Services',
    amount: 5300,
    status: 'draft',
    date: '2024-02-16',
    dueDate: '2024-03-20',
    items: 1,
    requester: 'David Brown',
    department: 'Marketing',
  },
]

const statusConfig = {
  draft: { label: 'Draft', color: 'bg-slate-100 text-slate-800' },
  sent: { label: 'Sent', color: 'bg-blue-100 text-blue-800' },
  confirmed: { label: 'Confirmed', color: 'bg-green-100 text-green-800' },
  received: { label: 'Received', color: 'bg-purple-100 text-purple-800' },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800' },
}

export default function PurchaseOrdersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredOrders = purchaseOrders.filter((po) => {
    const matchesSearch = po.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.vendor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || po.status === statusFilter
    const matchesDepartment = departmentFilter === 'all' || po.department === departmentFilter

    return matchesSearch && matchesStatus && matchesDepartment
  })

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedOrders = filteredOrders.slice(
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
          <h1 className="text-3xl font-bold text-foreground">Purchase Orders</h1>
          <p className="text-muted-foreground mt-2">Manage and track purchase orders with vendors</p>
        </div>
        <Link href="/purchase-orders/create">
          <Button className="bg-primary hover:bg-primary/90 w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Create Purchase Order
          </Button>
        </Link>
      </div>

      {/* Filters Card */}
      <Card className="border-border rounded-xl">
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by PO number, title, or vendor..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="pl-10 border-border bg-background"
                />
              </div>

              <Select value={statusFilter} onValueChange={(val) => {
                setStatusFilter(val)
                setCurrentPage(1)
              }}>
                <SelectTrigger className="md:w-48 border-border bg-background">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="received">Received</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={departmentFilter} onValueChange={(val) => {
                setDepartmentFilter(val)
                setCurrentPage(1)
              }}>
                <SelectTrigger className="md:w-48 border-border bg-background">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Facilities">Facilities</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>

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
        Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredOrders.length)} of {filteredOrders.length} purchase orders
      </div>

      {/* Table Card */}
      <Card className="border-border rounded-xl">
        <CardContent className="pt-6">
          {paginatedOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-xs font-semibold">PO Number</TableHead>
                    <TableHead className="text-xs font-semibold">PR Reference</TableHead>
                    <TableHead className="text-xs font-semibold">Vendor</TableHead>
                    <TableHead className="text-xs font-semibold">Title</TableHead>
                    <TableHead className="text-xs font-semibold">Department</TableHead>
                    <TableHead className="text-right font-semibold">Amount</TableHead>
                    <TableHead className="text-xs font-semibold">Status</TableHead>
                    <TableHead className="text-xs font-semibold">Due Date</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedOrders.map((po) => (
                    <TableRow key={po.id} className="border-border hover:bg-accent/50 transition-colors">
                      <TableCell className="font-medium text-foreground">
                        <Link href={`/purchase-orders/${po.id}`} className="hover:text-primary">
                          {po.id}
                        </Link>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        <Link href={`/purchase-requisition/${po.prId}`} className="hover:text-primary">
                          {po.prId}
                        </Link>
                      </TableCell>
                      <TableCell className="text-foreground">{po.vendor}</TableCell>
                      <TableCell className="text-foreground max-w-xs truncate">
                        <Link href={`/purchase-orders/${po.id}`} className="hover:text-primary">
                          {po.title}
                        </Link>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">{po.department}</TableCell>
                      <TableCell className="text-right font-medium text-foreground">
                        ${(po.amount / 1000).toFixed(1)}K
                      </TableCell>
                      <TableCell>
                        <Badge className={statusConfig[po.status as keyof typeof statusConfig].color}>
                          {statusConfig[po.status as keyof typeof statusConfig].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(po.dueDate).toLocaleDateString()}
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
                              <Link href={`/purchase-orders/${po.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link href={`/purchase-orders/${po.id}/pdf`}>PDF Preview</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No purchase orders found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination Controls */}
      {filteredOrders.length > 0 && (
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
    </div>
  )
}

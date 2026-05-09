'use client'

import { useState } from 'react'
import { Plus, Search, Filter, MoreHorizontal, ChevronLeft, ChevronRight, CheckCircle, Clock } from 'lucide-react'
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

// Sample supplier data
const suppliers = [
  {
    id: '1',
    name: 'Acme Supply Co.',
    contact: 'John Smith',
    email: 'john@acme.com',
    phone: '(555) 123-4567',
    category: 'Office Supplies',
    status: 'active',
    rating: 4.5,
    joinDate: '2023-06-15',
    totalOrders: 45,
  },
  {
    id: '2',
    name: 'TechVendor Solutions',
    contact: 'Sarah Johnson',
    email: 'sarah@techvendor.com',
    phone: '(555) 234-5678',
    category: 'IT Equipment',
    status: 'active',
    rating: 4.8,
    joinDate: '2023-08-20',
    totalOrders: 78,
  },
  {
    id: '3',
    name: 'Global Logistics Ltd',
    contact: 'Mike Davis',
    email: 'mike@globalogistics.com',
    phone: '(555) 345-6789',
    category: 'Shipping',
    status: 'pending',
    rating: 0,
    joinDate: '2024-01-10',
    totalOrders: 0,
  },
  {
    id: '4',
    name: 'Quality Manufacturers',
    contact: 'Emily Wilson',
    email: 'emily@qualitymfg.com',
    phone: '(555) 456-7890',
    category: 'Manufacturing',
    status: 'active',
    rating: 4.3,
    joinDate: '2023-04-05',
    totalOrders: 120,
  },
  {
    id: '5',
    name: 'Professional Services Group',
    contact: 'David Brown',
    email: 'david@psgroup.com',
    phone: '(555) 567-8901',
    category: 'Consulting',
    status: 'active',
    rating: 4.9,
    joinDate: '2023-09-12',
    totalOrders: 34,
  },
  {
    id: '6',
    name: 'BuildRight Materials',
    contact: 'Jennifer Lee',
    email: 'jen@buildright.com',
    phone: '(555) 678-9012',
    category: 'Construction',
    status: 'inactive',
    rating: 4.2,
    joinDate: '2022-11-08',
    totalOrders: 56,
  },
  {
    id: '7',
    name: 'Fast Track Distribution',
    contact: 'Robert Taylor',
    email: 'robert@fasttrack.com',
    phone: '(555) 789-0123',
    category: 'Distribution',
    status: 'active',
    rating: 4.6,
    joinDate: '2023-07-22',
    totalOrders: 89,
  },
  {
    id: '8',
    name: 'Enterprise Solutions Inc',
    contact: 'Lisa Anderson',
    email: 'lisa@enterprise.com',
    phone: '(555) 890-1234',
    category: 'Software',
    status: 'active',
    rating: 4.7,
    joinDate: '2023-10-01',
    totalOrders: 62,
  },
  {
    id: '9',
    name: 'Startup Innovators Co',
    contact: 'Alex Martinez',
    email: 'alex@startupinn.com',
    phone: '(555) 901-2345',
    category: 'Technology',
    status: 'pending',
    rating: 0,
    joinDate: '2024-02-05',
    totalOrders: 0,
  },
  {
    id: '10',
    name: 'Premium Goods Ltd',
    contact: 'Patricia Garcia',
    email: 'patricia@premiumgoods.com',
    phone: '(555) 012-3456',
    category: 'Retail',
    status: 'active',
    rating: 4.4,
    joinDate: '2023-05-18',
    totalOrders: 71,
  },
]

const statusConfig = {
  active: { label: 'Active', color: 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200' },
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200' },
  inactive: { label: 'Inactive', color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' },
}

const ITEMS_PER_PAGE = 5

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || supplier.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || supplier.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  const totalPages = Math.ceil(filteredSuppliers.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedSuppliers = filteredSuppliers.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleClearFilters = () => {
    setSearchTerm('')
    setStatusFilter('all')
    setCategoryFilter('all')
    setCurrentPage(1)
  }

  const categories = [...new Set(suppliers.map(s => s.category))]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Supplier Management</h1>
          <p className="text-muted-foreground mt-2">Manage and track supplier information</p>
        </div>
        <Link href="/suppliers/onboarding">
          <Button className="bg-primary hover:bg-primary/90 w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Onboard Supplier
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
                    placeholder="Search by supplier name or contact..."
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <label className="text-sm font-medium text-foreground block mb-2">Category</label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Clear Filters */}
              {(searchTerm || statusFilter !== 'all' || categoryFilter !== 'all') && (
                <div className="flex items-end">
                  <Button variant="ghost" size="sm" onClick={handleClearFilters}>
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
        Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredSuppliers.length)} of{' '}
        {filteredSuppliers.length} suppliers
      </div>

      {/* Table */}
      <Card className="border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-card border-b border-border">
                <TableRow className="hover:bg-card">
                  <TableHead className="font-semibold text-foreground">Supplier Name</TableHead>
                  <TableHead className="font-semibold text-foreground">Contact</TableHead>
                  <TableHead className="font-semibold text-foreground">Category</TableHead>
                  <TableHead className="font-semibold text-foreground">Status</TableHead>
                  <TableHead className="font-semibold text-foreground text-center">Rating</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">Orders</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedSuppliers.map(supplier => (
                  <TableRow key={supplier.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                    <TableCell className="font-medium text-foreground">{supplier.name}</TableCell>
                    <TableCell className="text-foreground">
                      <div>
                        <p className="text-sm">{supplier.contact}</p>
                        <p className="text-xs text-muted-foreground">{supplier.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground text-sm">{supplier.category}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {supplier.status === 'pending' && <Clock className="h-4 w-4 text-yellow-600" />}
                        {supplier.status === 'active' && <CheckCircle className="h-4 w-4 text-green-600" />}
                        <Badge className={statusConfig[supplier.status as keyof typeof statusConfig].color}>
                          {statusConfig[supplier.status as keyof typeof statusConfig].label}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {supplier.rating > 0 ? (
                        <span className="text-sm font-medium text-foreground">
                          ★ {supplier.rating.toFixed(1)}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">N/A</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-medium text-foreground">
                      {supplier.totalOrders}
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>View Orders</DropdownMenuItem>
                          <DropdownMenuItem>Contact</DropdownMenuItem>
                          {supplier.status !== 'active' && (
                            <DropdownMenuItem>Activate</DropdownMenuItem>
                          )}
                          {supplier.status === 'active' && (
                            <DropdownMenuItem>Deactivate</DropdownMenuItem>
                          )}
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
      {filteredSuppliers.length > 0 && (
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

      {filteredSuppliers.length === 0 && (
        <Card className="border-border border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground text-lg">No suppliers found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

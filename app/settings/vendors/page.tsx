'use client'

import { useState } from 'react'
import { Plus, Search, MoreHorizontal, Edit2, Trash2, Star, MapPin, Phone, Mail } from 'lucide-react'
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
import { Badge } from '@/components/ui/badge'

const mockVendors = [
  { id: '1', name: 'TechSupply Co.', city: 'New York, NY', phone: '+1-555-0101', rating: 4.5, status: 'active', category: 'Technology' },
  { id: '2', name: 'Global Supplies Inc.', city: 'Los Angeles, CA', phone: '+1-555-0102', rating: 4.0, status: 'active', category: 'General Supplies' },
  { id: '3', name: 'Software Solutions Ltd.', city: 'San Francisco, CA', phone: '+1-555-0103', rating: 4.8, status: 'active', category: 'Software' },
  { id: '4', name: 'Creative Agency Ltd.', city: 'Chicago, IL', phone: '+1-555-0104', rating: 4.2, status: 'active', category: 'Marketing' },
  { id: '5', name: 'Office Furniture Mart', city: 'Houston, TX', phone: '+1-555-0105', rating: 3.8, status: 'inactive', category: 'Furniture' },
  { id: '6', name: 'Print House Plus', city: 'Phoenix, AZ', phone: '+1-555-0106', rating: 4.3, status: 'active', category: 'Printing' },
]

export default function VendorsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newVendor, setNewVendor] = useState({ name: '', city: '', phone: '', email: '', category: '' })

  const filteredVendors = mockVendors.filter(v =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.city.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Vendors & Suppliers</h1>
          <p className="text-muted-foreground mt-2">Manage vendor master data and contact information</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Vendor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Vendor</DialogTitle>
              <DialogDescription>Add a new vendor to your supplier network</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="v-name">Vendor Name</Label>
                <Input
                  id="v-name"
                  placeholder="e.g., Tech Supplies Inc."
                  value={newVendor.name}
                  onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
                  className="border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="v-city">City / Location</Label>
                <Input
                  id="v-city"
                  placeholder="e.g., New York, NY"
                  value={newVendor.city}
                  onChange={(e) => setNewVendor({ ...newVendor, city: e.target.value })}
                  className="border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="v-phone">Phone</Label>
                <Input
                  id="v-phone"
                  placeholder="+1 (555) 123-4567"
                  value={newVendor.phone}
                  onChange={(e) => setNewVendor({ ...newVendor, phone: e.target.value })}
                  className="border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="v-email">Email</Label>
                <Input
                  id="v-email"
                  type="email"
                  placeholder="vendor@company.com"
                  value={newVendor.email}
                  onChange={(e) => setNewVendor({ ...newVendor, email: e.target.value })}
                  className="border-border"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsAddDialogOpen(false)}>Add Vendor</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-border rounded-xl">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search vendors..."
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
                  <TableHead className="text-xs font-semibold">Vendor Name</TableHead>
                  <TableHead className="text-xs font-semibold">Location</TableHead>
                  <TableHead className="text-xs font-semibold">Contact</TableHead>
                  <TableHead className="text-xs font-semibold">Category</TableHead>
                  <TableHead className="text-xs font-semibold">Rating</TableHead>
                  <TableHead className="text-xs font-semibold">Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.map((v) => (
                  <TableRow key={v.id} className="border-border hover:bg-accent/50">
                    <TableCell className="font-medium">{v.name}</TableCell>
                    <TableCell className="text-sm flex items-center gap-1"><MapPin className="h-3 w-3" />{v.city}</TableCell>
                    <TableCell className="text-sm flex items-center gap-1"><Phone className="h-3 w-3" />{v.phone}</TableCell>
                    <TableCell><Badge variant="outline">{v.category}</Badge></TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{v.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        v.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {v.status === 'active' ? 'Active' : 'Inactive'}
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

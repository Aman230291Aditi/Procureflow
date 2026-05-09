'use client'

import { Plus, Search, MoreHorizontal, Edit2, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'

const mockItems = [
  { id: '1', sku: 'HP-LJ-404N', name: 'HP LaserJet Pro M404n', category: 'Office Equipment', supplier: 'HP Inc.', price: 4500, status: 'active' },
  { id: '2', sku: 'DL-OPT-7090', name: 'Dell OptiPlex 7090', category: 'Computers', supplier: 'Dell Technologies', price: 8000, status: 'active' },
  { id: '3', sku: 'LOG-MX3', name: 'Logitech MX Master 3', category: 'Accessories', supplier: 'Logitech', price: 99, status: 'active' },
  { id: '4', sku: 'SOFT-MS365', name: 'Microsoft 365 License', category: 'Software', supplier: 'Microsoft', price: 69, status: 'active' },
  { id: '5', sku: 'IKE-DESK-STD', name: 'Ikea Standing Desk', category: 'Furniture', supplier: 'Ikea', price: 350, status: 'active' },
]

export default function ItemsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newItem, setNewItem] = useState({ sku: '', name: '', category: '', supplier: '', price: '' })

  const filteredItems = mockItems.filter(i => i.sku.includes(searchTerm.toUpperCase()) || i.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Items & Categories</h1>
          <p className="text-muted-foreground mt-2">Manage your product catalog and inventory items</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Item</DialogTitle>
              <DialogDescription>Add new item to your catalog</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="i-sku">SKU</Label>
                <Input id="i-sku" placeholder="e.g., HP-LJ-404N" value={newItem.sku} onChange={(e) => setNewItem({ ...newItem, sku: e.target.value })} className="border-border" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="i-name">Item Name</Label>
                <Input id="i-name" placeholder="e.g., HP LaserJet Pro" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} className="border-border" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="i-cat">Category</Label>
                <Input id="i-cat" placeholder="e.g., Office Equipment" value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} className="border-border" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="i-price">Price</Label>
                <Input id="i-price" type="number" placeholder="0.00" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} className="border-border" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsAddDialogOpen(false)}>Add Item</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-border rounded-xl">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search items..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 border-border" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border rounded-xl">
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-xs font-semibold">SKU</TableHead>
                  <TableHead className="text-xs font-semibold">Item Name</TableHead>
                  <TableHead className="text-xs font-semibold">Category</TableHead>
                  <TableHead className="text-xs font-semibold">Supplier</TableHead>
                  <TableHead className="text-xs font-semibold">Price</TableHead>
                  <TableHead className="text-xs font-semibold">Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id} className="border-border hover:bg-accent/50">
                    <TableCell className="font-semibold text-sm">{item.sku}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell><Badge variant="outline">{item.category}</Badge></TableCell>
                    <TableCell className="text-sm">{item.supplier}</TableCell>
                    <TableCell className="font-medium">${item.price}</TableCell>
                    <TableCell><Badge className="bg-green-100 text-green-800">Active</Badge></TableCell>
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

'use client'

import { Plus, Search, MoreHorizontal, Edit2, Trash2, MapPin } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const mockLocations = [
  { id: '1', name: 'Main Warehouse', address: '123 Industrial Blvd, Chicago, IL', type: 'Warehouse', manager: 'John Smith', capacity: '10000 units' },
  { id: '2', name: 'Downtown Office', address: '456 Main St, Chicago, IL', type: 'Office', manager: 'Sarah Johnson', capacity: 'N/A' },
  { id: '3', name: 'Regional Distribution', address: '789 Commerce Rd, Dallas, TX', type: 'Distribution Center', manager: 'Mike Davis', capacity: '5000 units' },
  { id: '4', name: 'East Coast Hub', address: '321 Harbor Ave, Boston, MA', type: 'Warehouse', manager: 'Emily Brown', capacity: '8000 units' },
]

export default function LocationsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredLocations = mockLocations.filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Locations & Warehouses</h1>
          <p className="text-muted-foreground mt-2">Manage business locations and warehouses</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Location
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Location</DialogTitle>
              <DialogDescription>Add a new warehouse or office location</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="l-name">Location Name</Label>
                <Input id="l-name" placeholder="Main Warehouse" className="border-border" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="l-address">Address</Label>
                <Input id="l-address" placeholder="123 Industrial Blvd" className="border-border" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="l-type">Type</Label>
                <Input id="l-type" placeholder="Warehouse / Office / Distribution Center" className="border-border" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsAddDialogOpen(false)}>Add Location</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-border rounded-xl">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search locations..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 border-border" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border rounded-xl">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-xs font-semibold">Location Name</TableHead>
                <TableHead className="text-xs font-semibold">Address</TableHead>
                <TableHead className="text-xs font-semibold">Type</TableHead>
                <TableHead className="text-xs font-semibold">Manager</TableHead>
                <TableHead className="text-xs font-semibold">Capacity</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLocations.map((l) => (
                <TableRow key={l.id} className="border-border hover:bg-accent/50">
                  <TableCell className="font-semibold"><div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" />{l.name}</div></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{l.address}</TableCell>
                  <TableCell className="text-sm">{l.type}</TableCell>
                  <TableCell className="text-sm">{l.manager}</TableCell>
                  <TableCell className="text-sm">{l.capacity}</TableCell>
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

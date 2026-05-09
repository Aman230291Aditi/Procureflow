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

const mockUnits = [
  { id: '1', code: 'EA', name: 'Each', description: 'Individual unit' },
  { id: '2', code: 'BOX', name: 'Box', description: 'Box or carton' },
  { id: '3', code: 'PAK', name: 'Pack', description: 'Multiple units in package' },
  { id: '4', code: 'PCS', name: 'Pieces', description: 'Pieces or items' },
  { id: '5', code: 'KG', name: 'Kilogram', description: 'Weight in kilograms' },
  { id: '6', code: 'LTR', name: 'Liter', description: 'Volume in liters' },
  { id: '7', code: 'MTR', name: 'Meter', description: 'Length in meters' },
  { id: '8', code: 'SET', name: 'Set', description: 'Complete set or collection' },
]

export default function UnitsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newUnit, setNewUnit] = useState({ code: '', name: '', description: '' })

  const filteredUnits = mockUnits.filter(u => u.code.includes(searchTerm.toUpperCase()) || u.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Units of Measure</h1>
          <p className="text-muted-foreground mt-2">Manage units for inventory and ordering</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Unit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Unit of Measure</DialogTitle>
              <DialogDescription>Create a new unit of measure</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="u-code">Unit Code</Label>
                <Input id="u-code" placeholder="EA" maxLength={5} value={newUnit.code} onChange={(e) => setNewUnit({ ...newUnit, code: e.target.value.toUpperCase() })} className="border-border" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="u-name">Unit Name</Label>
                <Input id="u-name" placeholder="Each" value={newUnit.name} onChange={(e) => setNewUnit({ ...newUnit, name: e.target.value })} className="border-border" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="u-desc">Description</Label>
                <Input id="u-desc" placeholder="Individual unit" value={newUnit.description} onChange={(e) => setNewUnit({ ...newUnit, description: e.target.value })} className="border-border" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsAddDialogOpen(false)}>Add Unit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-border rounded-xl">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search units..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 border-border" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border rounded-xl">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-xs font-semibold">Code</TableHead>
                <TableHead className="text-xs font-semibold">Unit Name</TableHead>
                <TableHead className="text-xs font-semibold">Description</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUnits.map((u) => (
                <TableRow key={u.id} className="border-border hover:bg-accent/50">
                  <TableCell className="font-semibold">{u.code}</TableCell>
                  <TableCell>{u.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{u.description}</TableCell>
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

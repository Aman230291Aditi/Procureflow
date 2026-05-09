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

const mockCurrencies = [
  { id: '1', code: 'USD', name: 'US Dollar', symbol: '$', rate: 1.0, default: true },
  { id: '2', code: 'EUR', name: 'Euro', symbol: '€', rate: 0.92, default: false },
  { id: '3', code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.79, default: false },
  { id: '4', code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', rate: 1.36, default: false },
  { id: '5', code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 1.53, default: false },
]

const mockTaxRates = [
  { id: '1', name: 'Standard VAT', rate: 20, description: 'Standard VAT rate' },
  { id: '2', name: 'Reduced VAT', rate: 5, description: 'Reduced VAT for certain items' },
  { id: '3', name: 'Zero VAT', rate: 0, description: 'Zero rated supplies' },
]

export default function CurrenciesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddCurrencyOpen, setIsAddCurrencyOpen] = useState(false)
  const [newCurrency, setNewCurrency] = useState({ code: '', name: '', symbol: '', rate: '' })

  const filteredCurrencies = mockCurrencies.filter(c => c.code.includes(searchTerm.toUpperCase()) || c.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-8">
      {/* Currencies Section */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Currencies</h2>
            <p className="text-muted-foreground mt-2">Manage supported currencies and exchange rates</p>
          </div>
          <Dialog open={isAddCurrencyOpen} onOpenChange={setIsAddCurrencyOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 w-full md:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Currency
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Currency</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="c-code">Currency Code</Label>
                  <Input id="c-code" placeholder="USD" maxLength={3} value={newCurrency.code} onChange={(e) => setNewCurrency({ ...newCurrency, code: e.target.value.toUpperCase() })} className="border-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-name">Currency Name</Label>
                  <Input id="c-name" placeholder="US Dollar" value={newCurrency.name} onChange={(e) => setNewCurrency({ ...newCurrency, name: e.target.value })} className="border-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-symbol">Symbol</Label>
                  <Input id="c-symbol" placeholder="$" maxLength={2} value={newCurrency.symbol} onChange={(e) => setNewCurrency({ ...newCurrency, symbol: e.target.value })} className="border-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-rate">Exchange Rate (to USD)</Label>
                  <Input id="c-rate" type="number" placeholder="1.0" step="0.01" value={newCurrency.rate} onChange={(e) => setNewCurrency({ ...newCurrency, rate: e.target.value })} className="border-border" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddCurrencyOpen(false)}>Cancel</Button>
                <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsAddCurrencyOpen(false)}>Add Currency</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="border-border rounded-xl mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search currencies..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 border-border" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border rounded-xl">
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-xs font-semibold">Code</TableHead>
                  <TableHead className="text-xs font-semibold">Name</TableHead>
                  <TableHead className="text-xs font-semibold">Symbol</TableHead>
                  <TableHead className="text-xs font-semibold">Exchange Rate</TableHead>
                  <TableHead className="text-xs font-semibold">Default</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCurrencies.map((c) => (
                  <TableRow key={c.id} className="border-border hover:bg-accent/50">
                    <TableCell className="font-semibold">{c.code}</TableCell>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>{c.symbol}</TableCell>
                    <TableCell>{c.rate}</TableCell>
                    <TableCell>{c.default ? '✓' : '-'}</TableCell>
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

      {/* Tax Rates Section */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Tax Rates</h2>
        <Card className="border-border rounded-xl">
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-xs font-semibold">Tax Name</TableHead>
                  <TableHead className="text-xs font-semibold">Rate</TableHead>
                  <TableHead className="text-xs font-semibold">Description</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTaxRates.map((t) => (
                  <TableRow key={t.id} className="border-border hover:bg-accent/50">
                    <TableCell className="font-semibold">{t.name}</TableCell>
                    <TableCell>{t.rate}%</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{t.description}</TableCell>
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
    </div>
  )
}

'use client'

import { useState, useMemo } from 'react'
import { Search, ShoppingCart, Heart, Filter, ChevronDown, Grid, List } from 'lucide-react'
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
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Sample product data
const catalogData = [
  {
    id: '1',
    name: 'Tate and Lyle Granulated Sugar 1 kg',
    sku: 'A06636',
    category: 'Food & Beverage',
    subcategory: 'Beverages',
    price: 13.27,
    currency: 'GBP',
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd57f36?w=300&h=300&fit=crop',
    supplier: 'Simfoni_Supplier',
    manufacturer: 'Tate and Lyle',
    savings: 5.01,
    deliveryDays: 'Delivery: 11-May-2026',
    uom: 'Each',
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Lyons Instant Coffee Granules 750g',
    sku: 'UOSB021',
    category: 'Food & Beverage',
    subcategory: 'Beverages',
    price: 8.87,
    currency: 'GBP',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=300&h=300&fit=crop',
    supplier: 'Simfoni_Supplier',
    manufacturer: 'Lyons',
    savings: 5.03,
    deliveryDays: 'Delivery: 11-May-2026',
    uom: 'Each',
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Nescafe Decaffeinated Instant Coffee 500g',
    sku: '12315569',
    category: 'Food & Beverage',
    subcategory: 'Beverages',
    price: 17.70,
    currency: 'GBP',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=300&h=300&fit=crop',
    supplier: 'Simfoni_Supplier',
    manufacturer: 'Nescafe',
    savings: 4.99,
    deliveryDays: 'Delivery: 11-May-2026',
    uom: 'Each',
    rating: 4.3,
  },
  {
    id: '4',
    name: 'Tate & Lyle White Vending Sugar 2kg Pack',
    sku: 'A00696PACK',
    category: 'Food & Beverage',
    subcategory: 'Beverages',
    price: 12.58,
    currency: 'GBP',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=300&h=300&fit=crop',
    supplier: 'Simfoni_Supplier',
    manufacturer: 'Tate and Lyle',
    savings: 4.98,
    deliveryDays: 'Delivery: 11-May-2026',
    uom: 'Pack',
    rating: 4.6,
  },
  {
    id: '5',
    name: 'Robinsons Orange Squash No Added Sugar 1L',
    sku: '4113',
    category: 'Food & Beverage',
    subcategory: 'Beverages',
    price: 0.83,
    currency: 'GBP',
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd57f36?w=300&h=300&fit=crop',
    supplier: 'Simfoni_Supplier',
    manufacturer: 'Robinsons',
    savings: 4.60,
    deliveryDays: 'Delivery: 11-May-2026',
    uom: 'Each',
    rating: 4.2,
  },
  {
    id: '6',
    name: 'HP LaserJet Pro M404n Printer',
    sku: 'HP-LJ-404N',
    category: 'Office Equipment',
    subcategory: 'Printers',
    price: 350.00,
    currency: 'GBP',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=300&h=300&fit=crop',
    supplier: 'HP Inc.',
    manufacturer: 'HP',
    savings: 8.5,
    deliveryDays: 'Delivery: 15-May-2026',
    uom: 'Each',
    rating: 4.7,
  },
  {
    id: '7',
    name: 'Dell OptiPlex 7090 Desktop',
    sku: 'DL-OPT-7090',
    category: 'Office Equipment',
    subcategory: 'Computers',
    price: 950.00,
    currency: 'GBP',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=300&fit=crop',
    supplier: 'Dell Technologies',
    manufacturer: 'Dell',
    savings: 12.3,
    deliveryDays: 'Delivery: 18-May-2026',
    uom: 'Each',
    rating: 4.8,
  },
  {
    id: '8',
    name: 'Logitech MX Master 3 Mouse',
    sku: 'LOG-MX3',
    category: 'Office Equipment',
    subcategory: 'Accessories',
    price: 99.99,
    currency: 'GBP',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop',
    supplier: 'Logitech',
    manufacturer: 'Logitech',
    savings: 5.2,
    deliveryDays: 'Delivery: 12-May-2026',
    uom: 'Each',
    rating: 4.9,
  },
]

const categories = [
  { name: 'All Categories', value: 'all' },
  { name: 'Food & Beverage', value: 'food-beverage' },
  { name: 'Office Equipment', value: 'office' },
]

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [favorites, setFavorites] = useState<string[]>([])
  const [cartItems, setCartItems] = useState<{[key: string]: number}>({})

  const filteredProducts = useMemo(() => {
    return catalogData.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.sku.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || 
                             product.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const toggleFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const addToCart = (productId: string) => {
    setCartItems(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }))
  }

  const cartCount = Object.values(cartItems).reduce((a, b) => a + b, 0)

  return (
    <div className="space-y-6">
      {/* Page Header with Cart */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Product Catalog</h1>
          <p className="text-muted-foreground mt-2">Browse and add items to your cart</p>
        </div>
        <Link href="/cart">
          <Button className="bg-primary hover:bg-primary/90 relative w-full md:w-auto">
            <ShoppingCart className="h-4 w-4 mr-2" />
            View Cart
            {cartCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-destructive text-white rounded-full w-5 h-5 p-0 flex items-center justify-center text-xs">
                {cartCount}
              </Badge>
            )}
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card className="border-border rounded-xl">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by product name or SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-border"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="md:w-48 border-border">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Found {filteredProducts.length} products
      </div>

      {/* Products Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <Link key={product.id} href={`/catalog/${product.id}`}>
              <Card className="border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow h-full cursor-pointer">
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="relative w-full h-48 bg-muted overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        toggleFavorite(product.id)
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          favorites.includes(product.id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-600'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex-1 p-4 flex flex-col">
                    <h3 className="font-semibold text-sm text-foreground line-clamp-2 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2">SKU: {product.sku}</p>

                    <div className="space-y-2 flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-primary">
                          {product.currency} {product.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-muted-foreground">/{product.uom}</span>
                      </div>

                      <div className="text-xs text-green-600 font-medium">
                        Savings {product.savings}% from Baseline
                      </div>

                      <p className="text-xs text-muted-foreground">{product.deliveryDays}</p>
                      <p className="text-xs text-muted-foreground">Supplier: {product.supplier}</p>
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t border-border">
                      <div className="flex-1 flex items-center justify-between bg-secondary/20 rounded-lg px-3 py-2">
                        <button className="text-primary font-bold">−</button>
                        <span className="text-sm font-medium">{cartItems[product.id] || 1}</span>
                        <button className="text-primary font-bold">+</button>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          addToCart(product.id)
                        }}
                        className="flex-1 bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-lg transition-colors text-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredProducts.map(product => (
            <Link key={product.id} href={`/catalog/${product.id}`}>
              <Card className="border-border rounded-xl hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1 flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{product.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">SKU: {product.sku}</p>
                        <p className="text-sm text-muted-foreground">Supplier: {product.supplier}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary mb-2">
                          {product.currency} {product.price.toFixed(2)}/{product.uom}
                        </div>
                        <Button
                          onClick={(e) => {
                            e.preventDefault()
                            addToCart(product.id)
                          }}
                          size="sm"
                          className="bg-primary hover:bg-primary/90"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found. Try adjusting your search.</p>
        </div>
      )}
    </div>
  )
}

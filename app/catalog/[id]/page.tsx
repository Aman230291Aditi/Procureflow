'use client'

import { useState } from 'react'
import { ArrowLeft, Heart, ShoppingCart, Star, Truck, Package, Shield } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

// Sample products data (same as catalog)
const productsData = [
  {
    id: '1',
    name: 'Tate and Lyle Granulated Sugar 1 kg',
    sku: 'A06636',
    category: 'Food & Beverage',
    subcategory: 'Beverages',
    price: 13.27,
    currency: 'GBP',
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd57f36?w=600&h=600&fit=crop',
    supplier: 'Simfoni_Supplier',
    manufacturer: 'Tate and Lyle',
    brand: 'Tate and Lyle',
    savings: 5.01,
    deliveryDays: 11,
    uom: 'Each',
    rating: 4.5,
    reviews: 128,
    description: 'Premium granulated sugar ideal for hospitality and food service',
    longDescription: 'Tate and Lyle Granulated Sugar is a pure, white granulated caster sugar made from 100% natural sugar cane. It has been produced in Britain for over 300 years and is perfect for use in food service, hospitality, and catering establishments. This 1kg pack comes in a sealed carton to ensure freshness.',
    specs: {
      weight: '1 kg',
      origin: 'British made',
      storage: 'Keep in a cool, dry place',
      shelfLife: '24 months',
    },
  },
]

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const product = productsData.find(p => p.id === params.id) || productsData[0]

  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedImage, setSelectedImage] = useState(product.image)

  const handleAddToCart = () => {
    // Store in localStorage for now, will integrate with actual cart system
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    cart.push({
      ...product,
      quantity,
      cartItemId: Date.now(),
    })
    localStorage.setItem('cart', JSON.stringify(cart))
    alert(`Added ${quantity} item(s) to cart`)
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Catalog
      </button>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="rounded-xl bg-muted p-4 flex items-center justify-center min-h-96">
            <img
              src={selectedImage}
              alt={product.name}
              className="max-w-full max-h-96 object-contain"
            />
          </div>
          <div className="flex gap-2">
            {[product.image, product.image, product.image].map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className="w-20 h-20 rounded-lg bg-muted p-2 border-2 border-transparent hover:border-primary transition-colors"
              >
                <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="space-y-6">
          {/* Title and Rating */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
                <p className="text-muted-foreground mt-2">SKU: {product.sku}</p>
              </div>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <Heart
                  className={`h-6 w-6 ${
                    isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
            </div>
          </div>

          <Separator />

          {/* Category */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">Category</p>
            <div className="flex gap-2">
              <Badge variant="outline">{product.category}</Badge>
              <Badge variant="outline">{product.subcategory}</Badge>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-secondary/30 rounded-lg p-4 space-y-2">
            <div className="text-sm text-muted-foreground">Price per {product.uom}</div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-primary">
                {product.currency} {product.price.toFixed(2)}
              </span>
              <span className="text-sm text-green-600 font-medium">Save {product.savings}% from Baseline</span>
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <p className="text-sm font-medium text-foreground mb-3">Quantity</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-lg font-bold hover:bg-secondary transition-colors"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-0 py-2 outline-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-lg font-bold hover:bg-secondary transition-colors"
                >
                  +
                </button>
              </div>
              <span className="text-muted-foreground">{product.uom}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-primary hover:bg-primary/90 text-base py-6"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
            <Link href="/cart" className="flex-1">
              <Button variant="outline" className="w-full text-base py-6">
                View Cart
              </Button>
            </Link>
          </div>

          {/* Delivery Info */}
          <div className="space-y-3 bg-blue-50 p-4 rounded-lg">
            <div className="flex gap-3">
              <Truck className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900">Fast Delivery</p>
                <p className="text-sm text-blue-700">Expected delivery in {product.deliveryDays} days</p>
              </div>
            </div>
            <Separator className="bg-blue-200" />
            <div className="flex gap-3">
              <Package className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900">Secure Packaging</p>
                <p className="text-sm text-blue-700">Products are carefully packed to ensure safe delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-border rounded-xl">
          <CardHeader>
            <CardTitle className="text-base">Supplier Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Vendor Name</p>
              <p className="font-medium text-foreground">{product.supplier}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Manufacturer</p>
              <p className="font-medium text-foreground">{product.manufacturer}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Brand</p>
              <p className="font-medium text-foreground">{product.brand}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Days to Deliver</p>
              <p className="font-medium text-foreground">{product.deliveryDays} days</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border rounded-xl">
          <CardHeader>
            <CardTitle className="text-base">Product Specifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Weight</p>
              <p className="font-medium text-foreground">{product.specs.weight}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Origin</p>
              <p className="font-medium text-foreground">{product.specs.origin}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Storage</p>
              <p className="font-medium text-foreground text-sm">{product.specs.storage}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Shelf Life</p>
              <p className="font-medium text-foreground">{product.specs.shelfLife}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border rounded-xl">
          <CardHeader>
            <CardTitle className="text-base">Product Benefits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3">
              <Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground text-sm">Quality Assured</p>
                <p className="text-xs text-muted-foreground">100% natural ingredients</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground text-sm">Best Price</p>
                <p className="text-xs text-muted-foreground">{product.savings}% savings</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      <Card className="border-border rounded-xl">
        <CardHeader>
          <CardTitle>Long Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground whitespace-pre-wrap">{product.longDescription}</p>
        </CardContent>
      </Card>

      {/* Continue Shopping */}
      <div className="flex justify-between items-center pt-6 border-t border-border">
        <Link href="/catalog">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
        </Link>
        <Link href="/cart">
          <Button className="bg-primary hover:bg-primary/90">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Proceed to Cart
          </Button>
        </Link>
      </div>
    </div>
  )
}

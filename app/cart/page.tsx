'use client'

import { useState, useEffect } from 'react'
import { Trash2, Plus, Minus, ArrowLeft, ShoppingCart, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

interface CartItem {
  id: string
  name: string
  sku: string
  price: number
  currency: string
  quantity: number
  uom: string
  image: string
  supplier: string
  cartItemId: number
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(savedCart)
    setLoading(false)
  }, [])

  const updateQuantity = (cartItemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(cartItemId)
      return
    }
    setCartItems(cartItems.map(item =>
      item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
    ))
  }

  const removeItem = (cartItemId: number) => {
    setCartItems(cartItems.filter(item => item.cartItemId !== cartItemId))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.2 // 20% tax assumption
  const total = subtotal + tax

  const saveCartToStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }

  const proceedToRequisition = () => {
    saveCartToStorage()
    window.location.href = '/purchase-requisition/create?from=catalog'
  }

  if (loading) {
    return <div className="text-center py-12">Loading cart...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
          <p className="text-muted-foreground mt-2">Review items before creating requisition</p>
        </div>
        <Link href="/catalog">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <Card className="border-border rounded-xl">
          <CardContent className="py-12 text-center">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add items from the catalog to get started</p>
            <Link href="/catalog">
              <Button className="bg-primary hover:bg-primary/90">
                Browse Catalog
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-border rounded-xl">
              <CardHeader>
                <CardTitle className="text-lg">Items in Cart ({cartItems.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.cartItemId}>
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">SKU: {item.sku}</p>
                          <p className="text-sm text-muted-foreground">Supplier: {item.supplier}</p>
                        </div>
                        <div className="flex items-center gap-4 mt-3">
                          <div className="font-semibold text-primary">
                            {item.currency} {item.price.toFixed(2)}/{item.uom}
                          </div>
                        </div>
                      </div>

                      {/* Quantity and Actions */}
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeItem(item.cartItemId)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="p-2 hover:bg-secondary transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.cartItemId, parseInt(e.target.value) || 1)
                            }
                            className="w-12 text-center border-0 outline-none"
                            min="1"
                          />
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="p-2 hover:bg-secondary transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="font-bold text-foreground mt-2">
                          {item.currency} {(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <Separator className="mt-4" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-border rounded-xl sticky top-24 space-y-0">
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">
                      GBP {subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Items Count</span>
                    <span className="font-medium text-foreground">
                      {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (20%)</span>
                    <span className="font-medium text-foreground">
                      GBP {tax.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="font-bold text-lg text-primary">
                    GBP {total.toFixed(2)}
                  </span>
                </div>

                <Separator />

                <div className="space-y-2 pt-2">
                  <Button
                    onClick={proceedToRequisition}
                    className="w-full bg-primary hover:bg-primary/90 text-base py-6"
                  >
                    Create Requisition
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                  <Link href="/catalog" className="block">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                {/* Benefits */}
                <div className="bg-green-50 p-3 rounded-lg space-y-2 pt-4 mt-4">
                  <h4 className="font-semibold text-green-900 text-sm">Benefits</h4>
                  <ul className="text-xs text-green-800 space-y-1">
                    <li>✓ Fast shipping available</li>
                    <li>✓ Best supplier prices</li>
                    <li>✓ Secure checkout process</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

import { useEffect, useState } from 'react'

export interface CartProduct {
  id: string
  name: string
  sku: string
  price: number
  currency: string
  quantity: number
  uom: string
  image: string
  supplier: string
  manufacturer: string
  cartItemId: number
}

export function useCartIntegration() {
  const [cartItems, setCartItems] = useState<CartProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(savedCart)
    setIsLoading(false)
  }, [])

  const clearCart = () => {
    localStorage.setItem('cart', JSON.stringify([]))
    setCartItems([])
  }

  const convertCartToItems = (currency: string) => {
    return cartItems.map((product) => ({
      id: Date.now().toString() + Math.random(),
      itemName: product.name,
      sku: product.sku,
      description: '',
      supplier: product.supplier,
      manufacturer: product.manufacturer || '',
      manufacturerPartNumber: '',
      quantity: product.quantity,
      unitPrice: product.price,
      uom: product.uom,
      deliveryDate: '',
      tax: 0,
      taxPercent: 0,
      taxAmount: 0,
      category: '',
      categoryLevel1: '',
      categoryLevel2: '',
      total: product.price * product.quantity,
      expandedDetails: false,
    }))
  }

  return {
    cartItems,
    isLoading,
    clearCart,
    convertCartToItems,
  }
}

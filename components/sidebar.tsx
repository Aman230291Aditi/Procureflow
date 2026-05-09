'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { 
  LayoutDashboard, 
  ShoppingCart, 
  FileText, 
  CheckCircle, 
  Users, 
  FileCheck, 
  BarChart3, 
  Settings,
  LogOut,
  Menu,
  X,
  ArrowLeft,
  Database,
  Building2,
  Tag,
  MapPin,
  Percent,
  Clock,
  Zap
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: ShoppingCart, label: 'Purchase Requisition', href: '/purchase-requisition' },
  { icon: FileText, label: 'Purchase Orders', href: '/purchase-orders' },
  { icon: CheckCircle, label: 'Approval Workflow', href: '/approvals' },
  { icon: Users, label: 'Supplier Management', href: '/suppliers' },
  { icon: FileCheck, label: 'Invoice Management', href: '/invoices' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
]

const settingsSections = [
  {
    category: 'Account',
    items: [
      { label: 'User Management', href: '/settings/users', icon: Users },
      { label: 'Organization', href: '/settings/organization', icon: Building2 },
    ],
  },
  {
    category: 'Master Data Setup',
    items: [
      { label: 'Currencies & Tax', href: '/settings/currencies', icon: Percent },
      { label: 'Departments', href: '/settings/departments', icon: BarChart3 },
      { label: 'Cost Centers', href: '/settings/cost-centers', icon: Tag },
      { label: 'Vendors & Suppliers', href: '/settings/vendors', icon: Building2 },
      { label: 'Payment Terms', href: '/settings/payment-terms', icon: Clock },
      { label: 'Items & Categories', href: '/settings/items', icon: Database },
      { label: 'Locations & Warehouses', href: '/settings/locations', icon: MapPin },
      { label: 'Units of Measure', href: '/settings/units', icon: Zap },
    ],
  },
  {
    category: 'Workflow',
    items: [
      { label: 'Approval Workflow', href: '/settings/approvals', icon: BarChart3 },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(true)
  const isSettingsPage = pathname.startsWith('/settings')

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setOpen(!open)}
          className="bg-background"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen w-64 bg-card border-r border-border transition-all duration-300 overflow-y-auto',
          !open && '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {isSettingsPage ? (
            <>
              {/* Settings Header */}
              <div className="p-6 border-b border-border">
                <Link href="/">
                  <button
                    className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors mb-4"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Navigation
                  </button>
                </Link>
                <h2 className="text-lg font-bold text-foreground">Settings</h2>
                <p className="text-xs text-muted-foreground mt-1">Configure your system</p>
              </div>

              {/* Settings Navigation */}
              <nav className="flex-1 px-3 py-4 space-y-6">
                {settingsSections.map((section, idx) => (
                  <div key={idx}>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-3">
                      {section.category}
                    </h3>
                    <div className="space-y-1">
                      {section.items.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                          <Link key={item.href} href={item.href}>
                            <button
                              className={cn(
                                'w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                                isActive
                                  ? 'bg-primary text-primary-foreground shadow-md'
                                  : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                              )}
                              onClick={() => setOpen(false)}
                            >
                              <Icon className="h-4 w-4 flex-shrink-0" />
                              <span>{item.label}</span>
                            </button>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </nav>
            </>
          ) : (
            <>
              {/* Logo Section */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <ShoppingCart className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="font-bold text-lg text-foreground">ProcureFlow</h1>
                    <p className="text-xs text-muted-foreground">Enterprise P2P</p>
                  </div>
                </div>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 px-3 py-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link key={item.href} href={item.href}>
                      <button
                        className={cn(
                          'w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                        )}
                        onClick={() => setOpen(false)}
                      >
                        <Icon className="h-5 w-5 flex-shrink-0" />
                        <span>{item.label}</span>
                      </button>
                    </Link>
                  )
                })}
              </nav>

              {/* Footer */}
              <div className="p-4 border-t border-border space-y-2">
                <Link href="/settings">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200">
                    <Settings className="h-5 w-5 flex-shrink-0" />
                    <span>Settings</span>
                  </button>
                </Link>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-destructive hover:text-destructive-foreground transition-all duration-200">
                  <LogOut className="h-5 w-5 flex-shrink-0" />
                  <span>Logout</span>
                </button>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  )
}

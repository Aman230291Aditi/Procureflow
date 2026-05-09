'use client'

import { ArrowUp, ArrowDown, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { Button } from '@/components/ui/button'

// Sample data
const kpiData = [
  {
    title: 'Total Requisitions',
    value: '1,247',
    change: '+12.5%',
    isPositive: true,
    description: 'This month',
  },
  {
    title: 'Pending Approvals',
    value: '48',
    change: '+8.2%',
    isPositive: true,
    description: 'Awaiting action',
  },
  {
    title: 'Total Spend',
    value: '$2.4M',
    change: '-3.1%',
    isPositive: false,
    description: 'Year to date',
  },
  {
    title: 'Approval Rate',
    value: '94.2%',
    change: '+2.3%',
    isPositive: true,
    description: 'Average',
  },
]

const spendData = [
  { month: 'Jan', spend: 180000, orders: 40 },
  { month: 'Feb', spend: 220000, orders: 45 },
  { month: 'Mar', spend: 200000, orders: 38 },
  { month: 'Apr', spend: 280000, orders: 52 },
  { month: 'May', spend: 240000, orders: 48 },
  { month: 'Jun', spend: 320000, orders: 61 },
]

const categoryData = [
  { name: 'IT & Software', value: 35, color: '#3b82f6' },
  { name: 'Office Supplies', value: 25, color: '#10b981' },
  { name: 'Facilities', value: 20, color: '#f59e0b' },
  { name: 'Services', value: 15, color: '#ef4444' },
  { name: 'Equipment', value: 5, color: '#8b5cf6' },
]

const topSuppliers = [
  { name: 'TechCorp Solutions', spend: 450000, orders: 34 },
  { name: 'Global Supplies Inc', spend: 380000, orders: 28 },
  { name: 'Professional Services Ltd', spend: 320000, orders: 25 },
  { name: 'Equipment & Parts Co', spend: 280000, orders: 19 },
  { name: 'Office Essentials Group', spend: 240000, orders: 18 },
]

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here's your procurement overview.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-foreground">{kpi.value}</span>
                <div className={`flex items-center gap-1 text-sm font-medium ${kpi.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                  {kpi.change}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{kpi.description}</p>
              {/* Sparkline effect */}
              <div className="h-8 w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent rounded" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spend Trend Chart */}
        <Card className="lg:col-span-2 border-border">
          <CardHeader>
            <CardTitle>Spend Trend</CardTitle>
            <CardDescription>Monthly procurement spend and order volume</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={spendData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '8px' }} />
                <Legend />
                <Bar dataKey="spend" fill="var(--color-chart-1)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Spend by Category */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Spend by Category</CardTitle>
            <CardDescription>Distribution of procurement spending</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-foreground">{cat.name}</span>
                  </div>
                  <span className="text-muted-foreground">{cat.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Suppliers */}
      <Card className="border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Top Suppliers</CardTitle>
            <CardDescription>By total spend this year</CardDescription>
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topSuppliers.map((supplier, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
                <div>
                  <p className="font-medium text-foreground">{supplier.name}</p>
                  <p className="text-sm text-muted-foreground">{supplier.orders} orders</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">${(supplier.spend / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-muted-foreground">YTD Spend</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

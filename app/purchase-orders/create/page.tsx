"use client";

import { useState } from "react";
import { ArrowLeft, Plus, Trash2, Search, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Approved requisitions data
const approvedRequisitions = [
  {
    id: "PR-2024-001",
    title: "Office Equipment & Supplies",
    requester: "Sarah Johnson",
    department: "Operations",
    amount: 15000,
    date: "2024-01-15",
    items: 5,
    lineItems: [
      {
        id: "1",
        name: "Office Desk",
        quantity: 5,
        unitPrice: 2000,
        supplier: "FurnitureCo",
        manufacturer: "Herman Miller",
      },
      {
        id: "2",
        name: "Office Chair",
        quantity: 5,
        unitPrice: 800,
        supplier: "FurnitureCo",
        manufacturer: "Steelcase",
      },
      {
        id: "3",
        name: 'Monitor 27"',
        quantity: 10,
        unitPrice: 400,
        supplier: "TechSupply",
        manufacturer: "Dell",
      },
      {
        id: "4",
        name: "Keyboard & Mouse",
        quantity: 10,
        unitPrice: 150,
        supplier: "TechSupply",
        manufacturer: "Logitech",
      },
      {
        id: "5",
        name: "Office Supplies Bundle",
        quantity: 20,
        unitPrice: 100,
        supplier: "Staples",
        manufacturer: "Various",
      },
    ],
  },
  {
    id: "PR-2024-004",
    title: "Marketing Materials",
    requester: "David Brown",
    department: "Marketing",
    amount: 8500,
    date: "2024-01-22",
    items: 8,
    lineItems: [
      {
        id: "1",
        name: "Branding Guide Design",
        quantity: 1,
        unitPrice: 3000,
        supplier: "CreativeAgency",
        manufacturer: "In-House",
      },
      {
        id: "2",
        name: "Business Cards",
        quantity: 5000,
        unitPrice: 0.5,
        supplier: "PrintHouse",
        manufacturer: "Custom",
      },
      {
        id: "3",
        name: "Letterhead",
        quantity: 2000,
        unitPrice: 0.8,
        supplier: "PrintHouse",
        manufacturer: "Custom",
      },
      {
        id: "4",
        name: "Email Signatures Design",
        quantity: 1,
        unitPrice: 1500,
        supplier: "CreativeAgency",
        manufacturer: "In-House",
      },
      {
        id: "5",
        name: "Social Media Templates",
        quantity: 1,
        unitPrice: 2000,
        supplier: "CreativeAgency",
        manufacturer: "In-House",
      },
      {
        id: "6",
        name: "Web Banner Ads",
        quantity: 10,
        unitPrice: 500,
        supplier: "CreativeAgency",
        manufacturer: "In-House",
      },
      {
        id: "7",
        name: "Product Packaging Design",
        quantity: 1,
        unitPrice: 2500,
        supplier: "CreativeAgency",
        manufacturer: "In-House",
      },
      {
        id: "8",
        name: "Marketing Collateral Print",
        quantity: 1000,
        unitPrice: 1,
        supplier: "PrintHouse",
        manufacturer: "Custom",
      },
    ],
  },
  {
    id: "PR-2024-002",
    title: "Software Licenses Renewal",
    requester: "Michael Chen",
    department: "IT",
    amount: 45000,
    date: "2024-01-18",
    items: 3,
    lineItems: [
      {
        id: "1",
        name: "Adobe Creative Cloud (50 seats)",
        quantity: 50,
        unitPrice: 600,
        supplier: "Adobe",
        manufacturer: "Adobe",
      },
      {
        id: "2",
        name: "Microsoft Office 365 (100 seats)",
        quantity: 100,
        unitPrice: 150,
        supplier: "Microsoft",
        manufacturer: "Microsoft",
      },
      {
        id: "3",
        name: "Slack Enterprise (100 users)",
        quantity: 100,
        unitPrice: 150,
        supplier: "Slack",
        manufacturer: "Slack",
      },
    ],
  },
];

export default function CreatePurchaseOrderPage() {
  const [selectedPR, setSelectedPR] = useState<string | null>(null);
  const [vendor, setVendor] = useState("");
  const [poNumber, setPoNumber] = useState(
    `PO-2024-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`,
  );
  const [deliveryDate, setDeliveryDate] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("Net 30");
  const [notes, setNotes] = useState("");

  const selectedPRData = selectedPR
    ? approvedRequisitions.find((pr) => pr.id === selectedPR)
    : null;
  const totalAmount = selectedPRData
    ? selectedPRData.lineItems.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0,
      )
    : 0;

  const handleSelectPR = (prId: string) => {
    setSelectedPR(prId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Create Purchase Order
          </h1>
          <p className="text-muted-foreground mt-2">
            Create a new PO from an approved requisition
          </p>
        </div>
        <Link href="/purchase-orders">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Select Requisition */}
          <Card className="border-border rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg">
                Step 1: Select Requisition
              </CardTitle>
              <CardDescription>
                Choose an approved purchase requisition
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!selectedPR ? (
                <div className="space-y-3">
                  {approvedRequisitions.map((pr) => (
                    <div
                      key={pr.id}
                      className="border border-border rounded-lg p-4 cursor-pointer hover:bg-accent/50 transition-colors"
                      onClick={() => handleSelectPR(pr.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="font-semibold text-foreground">
                              {pr.id}
                            </p>
                            <Badge className="bg-green-100 text-green-800">
                              Approved
                            </Badge>
                          </div>
                          <p className="text-sm text-foreground">{pr.title}</p>
                          <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                            <span>Requester: {pr.requester}</span>
                            <span>Department: {pr.department}</span>
                            <span>{pr.items} items</span>
                          </div>
                        </div>
                        <p className="text-lg font-semibold text-primary">
                          ${pr.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border border-primary rounded-lg p-4 bg-primary/5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-semibold text-foreground">
                        {selectedPRData?.id}
                      </p>
                      <p className="text-sm text-foreground">
                        {selectedPRData?.title}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedPR(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Step 2: PO Details */}
          {selectedPR && (
            <Card className="border-border rounded-xl">
              <CardHeader>
                <CardTitle className="text-lg">Step 2: PO Details</CardTitle>
                <CardDescription>
                  Enter vendor and delivery information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="poNumber" className="text-sm font-medium">
                      PO Number
                    </Label>
                    <Input
                      id="poNumber"
                      value={poNumber}
                      onChange={(e) => setPoNumber(e.target.value)}
                      className="border-border bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vendor" className="text-sm font-medium">
                      Vendor
                    </Label>
                    <Input
                      id="vendor"
                      placeholder="Select or enter vendor name"
                      value={vendor}
                      onChange={(e) => setVendor(e.target.value)}
                      className="border-border bg-background"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="deliveryDate"
                      className="text-sm font-medium"
                    >
                      Delivery Date
                    </Label>
                    <Input
                      id="deliveryDate"
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="border-border bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="paymentTerms"
                      className="text-sm font-medium"
                    >
                      Payment Terms
                    </Label>
                    <select
                      id="paymentTerms"
                      value={paymentTerms}
                      onChange={(e) => setPaymentTerms(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                    >
                      <option>Net 15</option>
                      <option>Net 30</option>
                      <option>Net 60</option>
                      <option>Due on Receipt</option>
                      <option>2/10 Net 30</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-sm font-medium">
                    Notes (Optional)
                  </Label>
                  <textarea
                    id="notes"
                    placeholder="Add any special instructions or notes..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground min-h-24"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Review Items */}
          {selectedPR && selectedPRData && (
            <Card className="border-border rounded-xl">
              <CardHeader>
                <CardTitle className="text-lg">
                  Step 3: Review Line Items
                </CardTitle>
                <CardDescription>
                  Items from the selected requisition
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {selectedPRData.lineItems.map((item) => (
                    <div
                      key={item.id}
                      className="border border-border rounded-lg p-3"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="font-medium text-sm text-foreground">
                            {item.name}
                          </p>
                          <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                            <span>Supplier: {item.supplier}</span>
                            <span>Manufacturer: {item.manufacturer}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">
                          {item.quantity} × ${item.unitPrice.toFixed(2)}
                        </span>
                        <span className="font-medium text-foreground">
                          ${(item.quantity * item.unitPrice).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          {selectedPR && (
            <div className="flex gap-3 pt-4">
              <Link href="/purchase-orders">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button variant="outline">Save as Draft</Button>
              <Button className="bg-primary hover:bg-primary/90">
                Create PO
              </Button>
            </div>
          )}
        </div>

        {/* Summary Sidebar */}
        {selectedPR && selectedPRData && (
          <div className="sticky top-24 h-fit">
            <Card className="border-border rounded-xl">
              <CardHeader>
                <CardTitle className="text-base">Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Requisition</span>
                    <span className="font-medium">{selectedPRData.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items</span>
                    <span className="font-medium">{selectedPRData.items}</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">
                        ${totalAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-muted-foreground">Tax (0%)</span>
                      <span className="font-medium">$0.00</span>
                    </div>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between text-base font-bold">
                      <span>Total</span>
                      <span className="text-primary">
                        ${totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, Suspense } from "react";
import {
  Plus,
  Trash2,
  X,
  ArrowLeft,
  ChevronDown,
  ShoppingCart,
  Check,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useCartIntegration } from "@/hooks/useCartIntegration";

interface Item {
  id: string;
  itemName: string;
  sku: string;
  description: string;
  supplier: string;
  manufacturer: string;
  manufacturerPartNumber: string;
  quantity: number;
  unitPrice: number;
  uom: string;
  deliveryDate: string;
  tax: number;
  taxPercent: number;
  taxAmount: number;
  category: string;
  categoryLevel1: string;
  categoryLevel2: string;
  total: number;
  expandedDetails?: boolean;
}

interface CatalogItem {
  id: string;
  name: string;
  sku: string;
  supplier: string;
  manufacturer: string;
  mfgPartNumber: string;
}

const availableItems: CatalogItem[] = [
  {
    id: "1",
    name: "Laptop - Dell XPS 13",
    sku: "DELL-XPS-13",
    supplier: "TechSupply Inc",
    manufacturer: "Dell",
    mfgPartNumber: "XPS13-2024",
  },
  {
    id: "2",
    name: "Office Chair - Ergonomic",
    sku: "CHAIR-ERG-001",
    supplier: "FurnitureWorld",
    manufacturer: "Herman Miller",
    mfgPartNumber: "HM-AERON",
  },
  {
    id: "3",
    name: 'Monitor - 4K 27"',
    sku: "MON-4K-27",
    supplier: "TechSupply Inc",
    manufacturer: "LG",
    mfgPartNumber: "LG-27UP550",
  },
];

export default function CreatePRContent() {
  const searchParams = useSearchParams();
  const { cartItems, convertCartToItems, clearCart } = useCartIntegration();

  // Basic Information
  const [requestTitle, setRequestTitle] = useState("");
  const [requesterName, setRequesterName] = useState("");
  const [department, setDepartment] = useState("");
  const [costCenter, setCostCenter] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [priority, setPriority] = useState("medium");
  const [needByDate, setNeedByDate] = useState("");
  const [currency, setCurrency] = useState("GBP");
  const [paymentTerms, setPaymentTerms] = useState("net-30");
  const [notes, setNotes] = useState("");

  // Items
  const [items, setItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  const [cartLoaded, setCartLoaded] = useState(false);

  // Load cart items on mount
  useEffect(() => {
    if (
      searchParams.get("from") === "catalog" &&
      cartItems.length > 0 &&
      !cartLoaded
    ) {
      const convertedItems = convertCartToItems(currency);
      setItems(convertedItems);
      clearCart();
      setCartLoaded(true);
    }
  }, [
    searchParams,
    cartItems,
    currency,
    cartLoaded,
    convertCartToItems,
    clearCart,
  ]);

  const filteredItems = availableItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const addItem = (itemId: string) => {
    const selectedItem = availableItems.find((item) => item.id === itemId);
    if (selectedItem) {
      const newItem: Item = {
        id: Date.now().toString(),
        itemName: selectedItem.name,
        sku: selectedItem.sku,
        description: "",
        supplier: selectedItem.supplier,
        manufacturer: selectedItem.manufacturer,
        manufacturerPartNumber: selectedItem.mfgPartNumber,
        quantity: 1,
        unitPrice: 0,
        uom: "EA",
        deliveryDate: needByDate,
        tax: 0,
        taxPercent: 0,
        taxAmount: 0,
        category: "",
        categoryLevel1: "",
        categoryLevel2: "",
        total: 0,
      };
      setItems([...items, newItem]);
      setIsItemDialogOpen(false);
      setSearchQuery("");
    }
  };

  const removeItem = (itemId: string) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  const updateItem = (itemId: string, field: keyof Item, value: any) => {
    setItems(
      items.map((item) => {
        if (item.id === itemId) {
          const updated = { ...item, [field]: value };

          // Calculate total and tax
          if (
            field === "quantity" ||
            field === "unitPrice" ||
            field === "taxPercent"
          ) {
            const subtotal = updated.quantity * updated.unitPrice;
            updated.taxAmount = subtotal * (updated.taxPercent / 100);
            updated.total = subtotal + updated.taxAmount;
          }

          return updated;
        }
        return item;
      }),
    );
  };

  return (
    <div className="space-y-6">
      {/* Cart Loaded Banner */}
      {cartLoaded && items.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
          <ShoppingCart className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-green-900">Cart Items Loaded</p>
            <p className="text-sm text-green-800">
              {items.length} item(s) from your catalog cart have been added to
              this requisition
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/purchase-requisition">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Create Purchase Requisition
            </h1>
            <p className="text-muted-foreground mt-2">
              Fill in the details to create a new purchase requisition
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Main Form Content */}
        <div className="space-y-6">
          {/* Basic Information */}
          <Card className="border-border rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
              <CardDescription>Core requisition details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Request Title</Label>
                  <Input
                    id="title"
                    value={requestTitle}
                    onChange={(e) => setRequestTitle(e.target.value)}
                    placeholder="e.g., Monthly Office Supplies"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requester">Requester Name</Label>
                  <Input
                    id="requester"
                    value={requesterName}
                    onChange={(e) => setRequesterName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">IT</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="costcenter">Cost Center</Label>
                  <Input
                    id="costcenter"
                    value={costCenter}
                    onChange={(e) => setCostCenter(e.target.value)}
                    placeholder="e.g., CC-001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project">Project Code</Label>
                  <Input
                    id="project"
                    value={projectCode}
                    onChange={(e) => setProjectCode(e.target.value)}
                    placeholder="e.g., PROJ-2024-001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger id="priority">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="needbydate">Need By Date</Label>
                  <Input
                    id="needbydate"
                    type="date"
                    value={needByDate}
                    onChange={(e) => setNeedByDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="JPY">JPY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any additional notes or special instructions"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Items Section */}
          <Card className="border-border rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Line Items</CardTitle>
                <CardDescription>
                  Add products and services to your requisition
                </CardDescription>
              </div>
              <Dialog
                open={isItemDialogOpen}
                onOpenChange={setIsItemDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add Item to Requisition</DialogTitle>
                    <DialogDescription>
                      Search and select an item from the catalog
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Search by name, SKU, or supplier..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1"
                      />
                      {searchQuery && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSearchQuery("")}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {filteredItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent cursor-pointer"
                          onClick={() => addItem(item.id)}
                        >
                          <div className="flex-1">
                            <div className="font-medium text-sm">
                              {item.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              SKU: {item.sku} • {item.supplier}
                            </div>
                          </div>
                          <Button size="sm" variant="ghost" className="gap-2">
                            <Plus className="h-3 w-3" />
                            Add
                          </Button>
                        </div>
                      ))}
                      {searchQuery && filteredItems.length === 0 && (
                        <div className="text-center py-6">
                          <p className="text-muted-foreground">
                            No items found matching "{searchQuery}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.length > 0 ? (
                <div className="space-y-4">
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="border border-border rounded-lg p-4 space-y-3"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="font-medium text-sm text-foreground">
                              {item.itemName}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              SKU: {item.sku}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              updateItem(
                                item.id,
                                "expandedDetails",
                                !item.expandedDetails,
                              )
                            }
                            className="gap-2"
                          >
                            <span className="text-xs">Details</span>
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${
                                item.expandedDetails ? "rotate-180" : ""
                              }`}
                            />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Item Details Grid */}
                        <div className="grid gap-3 md:grid-cols-6">
                          <div className="space-y-1">
                            <Label className="text-xs font-semibold text-muted-foreground">
                              Quantity
                            </Label>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                updateItem(
                                  item.id,
                                  "quantity",
                                  parseInt(e.target.value) || 1,
                                )
                              }
                              className="w-full px-2 py-1 text-sm border border-border rounded bg-background"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs font-semibold text-muted-foreground">
                              Unit Price
                            </Label>
                            <input
                              type="number"
                              step="0.01"
                              value={item.unitPrice}
                              onChange={(e) =>
                                updateItem(
                                  item.id,
                                  "unitPrice",
                                  parseFloat(e.target.value) || 0,
                                )
                              }
                              className="w-full px-2 py-1 text-sm border border-border rounded bg-background"
                              placeholder="0.00"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs font-semibold text-muted-foreground">
                              UOM
                            </Label>
                            <select
                              value={item.uom}
                              onChange={(e) =>
                                updateItem(item.id, "uom", e.target.value)
                              }
                              className="w-full px-2 py-1 text-sm border border-border rounded bg-background"
                            >
                              <option>EA</option>
                              <option>BOX</option>
                              <option>PACK</option>
                              <option>SET</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs font-semibold text-muted-foreground">
                              Tax %
                            </Label>
                            <input
                              type="number"
                              step="0.1"
                              min="0"
                              max="100"
                              value={item.taxPercent}
                              onChange={(e) =>
                                updateItem(
                                  item.id,
                                  "taxPercent",
                                  parseFloat(e.target.value) || 0,
                                )
                              }
                              className="w-full px-2 py-1 text-sm border border-border rounded bg-background"
                              placeholder="0"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs font-semibold text-muted-foreground">
                              Tax Amount
                            </Label>
                            <div className="px-2 py-1 text-sm font-medium bg-muted rounded">
                              {currency} {item.taxAmount.toFixed(2)}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs font-semibold text-muted-foreground">
                              Total
                            </Label>
                            <div className="px-2 py-1 text-sm font-medium bg-muted rounded text-primary">
                              {currency} {item.total.toFixed(2)}
                            </div>
                          </div>
                        </div>

                        {/* Expanded Details */}
                        {item.expandedDetails && (
                          <div className="border-t border-border pt-3 space-y-3">
                            <div className="grid gap-3 md:grid-cols-3">
                              <div className="space-y-1">
                                <Label className="text-xs font-semibold text-muted-foreground">
                                  Supplier
                                </Label>
                                <div className="px-2 py-1 text-sm text-foreground bg-muted rounded">
                                  {item.supplier}
                                </div>
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs font-semibold text-muted-foreground">
                                  Manufacturer
                                </Label>
                                <input
                                  type="text"
                                  value={item.manufacturer}
                                  onChange={(e) =>
                                    updateItem(
                                      item.id,
                                      "manufacturer",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full px-2 py-1 text-sm border border-border rounded bg-background"
                                  placeholder="Enter manufacturer"
                                />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs font-semibold text-muted-foreground">
                                  Mfg Part Number
                                </Label>
                                <input
                                  type="text"
                                  value={item.manufacturerPartNumber}
                                  onChange={(e) =>
                                    updateItem(
                                      item.id,
                                      "manufacturerPartNumber",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full px-2 py-1 text-sm border border-border rounded bg-background"
                                  placeholder="Enter part number"
                                />
                              </div>
                            </div>

                            {/* Category Fields */}
                            <div className="border-t border-border pt-3">
                              <div className="grid gap-3 md:grid-cols-3">
                                <div className="space-y-1">
                                  <Label className="text-xs font-semibold text-muted-foreground">
                                    Category Level 1
                                  </Label>
                                  <select
                                    value={item.categoryLevel1}
                                    onChange={(e) =>
                                      updateItem(
                                        item.id,
                                        "categoryLevel1",
                                        e.target.value,
                                      )
                                    }
                                    className="w-full px-2 py-1 text-sm border border-border rounded bg-background"
                                  >
                                    <option value="">Select category</option>
                                    <option value="Office Equipment">
                                      Office Equipment
                                    </option>
                                    <option value="Food & Beverage">
                                      Food & Beverage
                                    </option>
                                    <option value="IT Hardware">
                                      IT Hardware
                                    </option>
                                    <option value="Supplies">Supplies</option>
                                  </select>
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-xs font-semibold text-muted-foreground">
                                    Category Level 2
                                  </Label>
                                  <select
                                    value={item.categoryLevel2}
                                    onChange={(e) =>
                                      updateItem(
                                        item.id,
                                        "categoryLevel2",
                                        e.target.value,
                                      )
                                    }
                                    className="w-full px-2 py-1 text-sm border border-border rounded bg-background"
                                  >
                                    <option value="">Select subcategory</option>
                                    <option value="Printers">Printers</option>
                                    <option value="Computers">Computers</option>
                                    <option value="Accessories">
                                      Accessories
                                    </option>
                                    <option value="Beverages">Beverages</option>
                                    <option value="Stationery">
                                      Stationery
                                    </option>
                                  </select>
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-xs font-semibold text-muted-foreground">
                                    Category (Main)
                                  </Label>
                                  <input
                                    type="text"
                                    value={item.category}
                                    onChange={(e) =>
                                      updateItem(
                                        item.id,
                                        "category",
                                        e.target.value,
                                      )
                                    }
                                    className="w-full px-2 py-1 text-sm border border-border rounded bg-background"
                                    placeholder="e.g., Calibration Services"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Totals Footer */}
                  <div className="bg-secondary/20 rounded-lg p-4 border border-border">
                    <div className="flex justify-end">
                      <div className="w-full max-w-xs space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-foreground">
                            Net Amount:
                          </span>
                          <span className="text-sm font-semibold text-foreground">
                            {currency}{" "}
                            {items
                              .reduce(
                                (sum, item) =>
                                  sum + item.quantity * item.unitPrice,
                                0,
                              )
                              .toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-foreground">
                            Tax Amount:
                          </span>
                          <span className="text-sm font-semibold text-foreground">
                            {currency}{" "}
                            {items
                              .reduce((sum, item) => sum + item.taxAmount, 0)
                              .toFixed(2)}
                          </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-base font-bold text-foreground">
                            Gross Amount:
                          </span>
                          <span className="text-lg font-bold text-primary">
                            {currency}{" "}
                            {items
                              .reduce((sum, item) => sum + item.total, 0)
                              .toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No items added yet</p>
                  <p className="text-sm text-muted-foreground">
                    Click "Add Item" to get started
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Section */}
          <div className="flex justify-end gap-3">
            <Link href="/purchase-requisition">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button className="gap-2">
              <Check className="h-4 w-4" />
              Create Requisition
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

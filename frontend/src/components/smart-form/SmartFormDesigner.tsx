"use client";

import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
  DragOverlay,
  Active,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload, Download, Printer, Save, Loader2, Image as ImageIcon, Signature, Layers, Grid, Type, Table as TableIcon, LineChart, Lock, Barcode, Calendar, Hash, User, Building, MapPin, Phone, Mail, FileText, Trash2, Copy, MoveUp, MoveDown, Eye, EyeOff, Settings, Database, Zap } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";

/* ============================
   Types
   ============================ */
interface FieldDefinition {
  id: string;
  key: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'currency' | 'percentage' | 'boolean' | 'select';
  group: string;
  required?: boolean;
  defaultValue?: any;
  options?: string[];
}

interface TableColumn {
  id: string;
  key: string;
  label: string;
  width: number;
  alignment: "left" | "center" | "right";
  type: 'text' | 'number' | 'currency' | 'date';
  formula?: string;
}

interface CanvasElement {
  id: string;
  type:
    | "field"
    | "label"
    | "table"
    | "line"
    | "section"
    | "address"
    | "header"
    | "footer"
    | "logo"
    | "signature"
    | "barcode"
    | "pageBreak"
    | "rectangle"
    | "image"
    | "grid"
    | "formula";
  key?: string;
  label: string;
  data?: any;
  properties: {
    columns?: TableColumn[];
    x: number;
    y: number;
    width: number;
    height: number;
    fontSize: number;
    fontFamily: string;
    bold: boolean;
    italic: boolean;
    underline: boolean;
    alignment: "left" | "center" | "right" | "justify";
    color: string;
    backgroundColor: string;
    borderWidth: number;
    borderColor: string;
    borderStyle: "solid" | "dashed" | "dotted";
    padding: number;
    margin: number;
    visible: boolean;
    zIndex: number;
    opacity: number;
    rotation: number;
  };
  children?: CanvasElement[];
  locked?: boolean;
  group?: string;
}

interface SmartFormTemplate {
  id: string;
  name: string;
  description: string;
  type: 'purchase_order' | 'invoice' | 'delivery_note' | 'material_receipt' | 'quotation' | 'payment_voucher' | 'custom';
  category: string;
  elements: CanvasElement[];
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

interface DataRecord {
  id: string;
  code: string;
  type: string;
  status: string;
  data: Record<string, any>;
  items?: Array<Record<string, any>>;
  totals?: Record<string, any>;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

/* ============================
   Sortable Element Component
   ============================ */
function SortableElement({ element, onSelect, isSelected, record, onDrag }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: element.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onSelect(element.id)}
      className={`relative cursor-move transition-all ${
        isSelected
          ? "ring-2 ring-blue-500 ring-offset-1"
          : "hover:ring-1 hover:ring-gray-300"
      } ${element.locked ? "opacity-60" : ""}`}
    >
      <StaticElement
        element={element}
        isSelected={isSelected}
        record={record}
        onDrag={onDrag}
      />
      {element.locked && (
        <div className="absolute top-1 right-1">
          <Lock className="w-3 h-3 text-gray-400" />
        </div>
      )}
    </div>
  );
}

/* ============================
   Static Element Renderer
   ============================ */
function StaticElement({ element, isSelected, record, onDrag }: any) {
  const style = {
    fontSize: `${element.properties.fontSize}px`,
    fontFamily: element.properties.fontFamily,
    fontWeight: element.properties.bold ? "bold" : "normal",
    fontStyle: element.properties.italic ? "italic" : "normal",
    textDecoration: element.properties.underline ? "underline" : "none",
    color: element.properties.color,
    backgroundColor: element.properties.backgroundColor,
    borderWidth: `${element.properties.borderWidth}px`,
    borderColor: element.properties.borderColor,
    borderStyle: element.properties.borderStyle,
    padding: `${element.properties.padding}px`,
    margin: `${element.properties.margin}px`,
    textAlign: element.properties.alignment,
    opacity: element.properties.opacity,
    transform: `rotate(${element.properties.rotation}deg)`,
    width: element.properties.width ? `${element.properties.width}px` : "auto",
    height: element.properties.height ? `${element.properties.height}px` : "auto",
    minHeight: "24px",
  };

  const renderContent = () => {
    switch (element.type) {
      case "header":
        return (
          <div style={style} className="font-bold">
            {element.data?.text || element.label}
          </div>
        );

      case "logo":
        return (
          <div
            style={style}
            className="flex items-center justify-center border-2 border-dashed border-gray-300"
          >
            {element.data?.imageUrl ? (
              <img
                src={element.data.imageUrl}
                alt="Logo"
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="text-center text-gray-400">
                <ImageIcon className="w-8 h-8 mx-auto mb-2" />
                <div className="text-xs">Company Logo</div>
              </div>
            )}
          </div>
        );

      case "address":
        const isFrom = element.properties.alignment === "left";
        const addressData = isFrom
          ? {
              name: record?.data?.companyName || "[Company Name]",
              address: record?.data?.companyAddress || "[Company Address]",
              city: record?.data?.companyCity || "[City]",
              country: record?.data?.companyCountry || "[Country]",
              phone: record?.data?.companyPhone || "[Phone]",
              email: record?.data?.companyEmail || "[Email]",
              taxId: record?.data?.companyTaxId || "[Tax ID]",
            }
          : {
              name: record?.data?.vendorName || record?.data?.customerName || "[Vendor/Customer Name]",
              address: record?.data?.vendorAddress || record?.data?.customerAddress || "[Address]",
              city: record?.data?.vendorCity || record?.data?.customerCity || "[City]",
              country: record?.data?.vendorCountry || record?.data?.customerCountry || "[Country]",
              phone: record?.data?.vendorPhone || record?.data?.customerPhone || "[Phone]",
              email: record?.data?.vendorEmail || record?.data?.customerEmail || "[Email]",
              taxId: record?.data?.vendorTaxId || record?.data?.customerTaxId || "[Tax ID]",
            };

        return (
          <div style={style} className="space-y-1">
            <div className="font-semibold">{isFrom ? "FROM:" : "TO:"}</div>
            <div>{addressData.name}</div>
            <div>{addressData.address}</div>
            <div>{addressData.city}, {addressData.country}</div>
            {addressData.phone && <div>📞 {addressData.phone}</div>}
            {addressData.email && <div>✉️ {addressData.email}</div>}
            {addressData.taxId && <div>📋 {addressData.taxId}</div>}
          </div>
        );

      case "field":
        const fieldValue = record?.data?.[element.key] ?? `[${element.key}]`;
        return (
          <div style={style}>
            <div className="text-xs text-gray-500 mb-1">{element.label}</div>
            <div className="border-b border-gray-300 pb-1">{fieldValue}</div>
          </div>
        );

      case "label":
        return <div style={style}>{element.data?.text || element.label}</div>;

      case "table":
        const items = record?.data?.items || record?.items || [];
        const columns = element.properties.columns || [];
        
        return (
          <div style={style}>
            {element.data?.title && (
              <div className="font-bold mb-2">{element.data.title}</div>
            )}
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((col: TableColumn) => (
                    <TableHead
                      key={col.id}
                      style={{ textAlign: col.alignment, width: `${col.width}px` }}
                    >
                      {col.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.slice(0, 3).map((item: any, index: number) => (
                  <TableRow key={index}>
                    {columns.map((col: TableColumn) => (
                      <TableCell
                        key={col.id}
                        style={{ textAlign: col.alignment }}
                      >
                        {item[col.key] || `[${col.key}]`}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                {items.length > 3 && (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center text-gray-500">
                      ... and {items.length - 3} more items
                    </TableCell>
                  </TableRow>
                )}
                {items.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center text-gray-500">
                      No items in record
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            
            {/* Totals Section */}
            {element.data?.showTotals && record?.data?.totals && (
              <div className="mt-4 flex justify-end">
                <div className="w-64 space-y-2">
                  {Object.entries(record.data.totals).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="font-medium">{key}:</span>
                      <span>{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case "signature":
        return (
          <div style={style} className="border-t-2 border-black pt-4">
            <div className="text-center">
              <div className="mb-8 h-16 border-b border-gray-300"></div>
              <div className="font-semibold">
                {element.data?.title || "Authorized Signature"}
              </div>
              <div className="text-sm text-gray-500">
                {element.data?.name || "[Name]"}
              </div>
              <div className="text-xs text-gray-400">
                {element.data?.designation || "[Designation]"}
              </div>
            </div>
          </div>
        );

      case "barcode":
        return (
          <div style={style} className="flex flex-col items-center">
            <div className="w-full h-20 bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
              <Barcode className="w-16 h-16 text-gray-600" />
            </div>
            <div className="mt-2 text-xs font-mono">
              {record?.code || "[CODE]"}
            </div>
          </div>
        );

      case "pageBreak":
        return (
          <div style={style} className="border-t-2 border-dashed border-red-400 py-2">
            <div className="text-center text-xs text-red-500 font-bold">
              ⤵ PAGE BREAK ⤵
            </div>
          </div>
        );

      case "rectangle":
        return (
          <div
            style={style}
            className="flex items-center justify-center"
          >
            {element.data?.text || ""}
          </div>
        );

      case "image":
        return (
          <div style={style} className="overflow-hidden">
            {element.data?.imageUrl ? (
              <img
                src={element.data.imageUrl}
                alt={element.label}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                <ImageIcon className="w-8 h-8" />
              </div>
            )}
          </div>
        );

      case "formula":
        const formulaValue = element.data?.formula 
          ? `= ${element.data.formula}`
          : "[Formula]";
        return (
          <div style={style} className="font-mono bg-yellow-50 p-2 rounded">
            <div className="text-xs text-gray-500 mb-1">Formula Field</div>
            <div>{formulaValue}</div>
          </div>
        );

      case "line":
        return (
          <hr
            style={{
              borderTop: `${element.properties.borderWidth}px ${element.properties.borderStyle} ${element.properties.borderColor}`,
              margin: `${element.properties.margin}px 0`,
            }}
          />
        );

      case "footer":
        return (
          <div style={style} className="text-center space-y-2">
            {element.data?.leftText && (
              <div className="float-left text-left">{element.data.leftText}</div>
            )}
            {element.data?.centerText && (
              <div>{element.data.centerText}</div>
            )}
            {element.data?.rightText && (
              <div className="float-right text-right">{element.data.rightText}</div>
            )}
            <div className="clear-both"></div>
          </div>
        );

      default:
        return <div style={style}>{element.label}</div>;
    }
  };

  return (
    <div className={`relative ${!element.properties.visible ? "opacity-40" : ""}`}>
      {renderContent()}
      {isSelected && (
        <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
          ✎
        </div>
      )}
    </div>
  );
}

/* ============================
   Draggable Field & Static Components
   ============================ */
function DraggableField({ field, icon }: any) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `field-${field.key}`,
    data: { type: "field", field },
  });

  const Icon = icon || FileText;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex items-center gap-3 p-3 bg-white border rounded-lg cursor-move hover:bg-gray-50 transition-all ${
        isDragging ? "opacity-60 shadow-lg" : ""
      }`}
    >
      <div className="p-2 bg-blue-100 rounded">
        <Icon className="w-4 h-4 text-blue-600" />
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm">{field.label}</div>
        <div className="text-xs text-gray-500">{field.key}</div>
      </div>
      <Badge variant="outline" className="text-xs">
        {field.type}
      </Badge>
    </div>
  );
}

function DraggableStatic({ element }: any) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `static-${element.key}`,
    data: { type: "static", element },
  });

  const iconMap: Record<string, any> = {
    header: Type,
    logo: ImageIcon,
    address: MapPin,
    signature: Signature,
    table: TableIcon,
    barcode: Barcode,
    image: ImageIcon,
    line: LineChart,
    grid: Grid,
    footer: Layers,
    pageBreak: FileText,
    rectangle: Grid,
    formula: Zap,
  };

  const Icon = iconMap[element.type] || FileText;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex items-center gap-3 p-3 bg-white border rounded-lg cursor-move hover:bg-gray-50 transition-all ${
        isDragging ? "opacity-60 shadow-lg" : ""
      }`}
    >
      <div className={`p-2 rounded ${
        element.type === "header" ? "bg-purple-100 text-purple-600" :
        element.type === "logo" ? "bg-pink-100 text-pink-600" :
        element.type === "table" ? "bg-green-100 text-green-600" :
        element.type === "signature" ? "bg-orange-100 text-orange-600" :
        "bg-gray-100 text-gray-600"
      }`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm">{element.label}</div>
        <div className="text-xs text-gray-500">{element.type}</div>
      </div>
    </div>
  );
}

/* ============================
   Canvas Component
   ============================ */
function Canvas({ elements, onSelect, selectedId, record, onElementsChange }: any) {
  const { setNodeRef, isOver } = useDroppable({ id: "canvas" });
  const [gridSize, setGridSize] = useState(10);

  return (
    <div
      ref={setNodeRef}
      className={`relative min-h-[800px] bg-white border rounded-lg p-8 ${
        isOver ? "bg-blue-50 border-blue-300" : ""
      }`}
      style={{
        backgroundImage: `linear-gradient(to right, #f0f0f0 1px, transparent 1px),
                         linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)`,
        backgroundSize: `${gridSize}px ${gridSize}px`,
      }}
    >
      {/* Page Border */}
      <div className="absolute inset-8 border border-gray-200 pointer-events-none"></div>
      
      {/* Page Shadow */}
      <div className="absolute inset-8 shadow-lg pointer-events-none"></div>

      {elements.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <div className="text-4xl mb-4">📋</div>
          <div className="text-xl font-medium mb-2">Smart Form Designer</div>
          <div className="text-sm text-center max-w-md mb-6">
            Drag fields and layout elements from the sidebar to design your form.
            Connect to database records for automatic data filling.
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Database className="w-4 h-4 mr-2" />
              Load from Template
            </Button>
            <Button variant="outline" size="sm">
              <Zap className="w-4 h-4 mr-2" />
              Auto-generate
            </Button>
          </div>
        </div>
      ) : (
        <SortableContext items={elements.map((e: { id: any; }) => e.id)} strategy={verticalListSortingStrategy}>
          <div className="relative" style={{ minHeight: "1200px" }}>
            {elements.map((el: CanvasElement) => (
              <SortableElement
                key={el.id}
                element={el}
                onSelect={onSelect}
                isSelected={selectedId === el.id}
                record={record}
                onDrag={() => {}}
              />
            ))}
          </div>
        </SortableContext>
      )}

      {/* Canvas Controls */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white border rounded-lg p-2 shadow">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setGridSize(gridSize === 10 ? 5 : gridSize === 5 ? 0 : 10)}
          className="text-xs"
        >
          Grid: {gridSize}px
        </Button>
        <Separator orientation="vertical" className="h-4" />
        <Button variant="ghost" size="sm" className="text-xs">
          📏 Ruler
        </Button>
        <Separator orientation="vertical" className="h-4" />
        <Button variant="ghost" size="sm" className="text-xs">
          🎯 Snap
        </Button>
      </div>
    </div>
  );
}

/* ============================
   Properties Panel
   ============================ */
function PropertiesPanel({ selectedElement, updateElement, record, onDelete, onDuplicate }: any) {
  const [activeTab, setActiveTab] = useState("general");

  if (!selectedElement) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Properties</CardTitle>
          <CardDescription>Select an element to edit its properties</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-400">
            <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Select any element to configure its properties</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              {selectedElement.type === "header" && <Type className="w-4 h-4" />}
              {selectedElement.type === "table" && <TableIcon className="w-4 h-4" />}
              {selectedElement.type === "logo" && <ImageIcon className="w-4 h-4" />}
              {selectedElement.type === "signature" && <Signature className="w-4 h-4" />}
              {selectedElement.label}
            </CardTitle>
            <CardDescription className="capitalize">{selectedElement.type}</CardDescription>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => onDuplicate(selectedElement)}>
              <Copy className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(selectedElement.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Label / Title</Label>
              <Input
                value={selectedElement.label}
                onChange={(e) => updateElement({ ...selectedElement, label: e.target.value })}
              />
            </div>

            {selectedElement.type === "field" && (
              <>
                <div className="space-y-2">
                  <Label>Field Key</Label>
                  <Input value={selectedElement.key} disabled className="bg-gray-50" />
                </div>
                <div className="space-y-2">
                  <Label>Sample Data</Label>
                  <div className="p-3 bg-gray-50 rounded border text-sm">
                    {record?.data?.[selectedElement.key] ?? "No data available"}
                  </div>
                </div>
              </>
            )}

            {selectedElement.type === "label" && (
              <div className="space-y-2">
                <Label>Text Content</Label>
                <Textarea
                  value={selectedElement.data?.text || ""}
                  onChange={(e) =>
                    updateElement({
                      ...selectedElement,
                      data: { ...selectedElement.data, text: e.target.value },
                    })
                  }
                  rows={4}
                />
              </div>
            )}

            {selectedElement.type === "table" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Table Title</Label>
                  <Input
                    value={selectedElement.data?.title || ""}
                    onChange={(e) =>
                      updateElement({
                        ...selectedElement,
                        data: { ...selectedElement.data, title: e.target.value },
                      })
                    }
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Show Totals Section</Label>
                  <Switch
                    checked={selectedElement.data?.showTotals || false}
                    onCheckedChange={(checked) =>
                      updateElement({
                        ...selectedElement,
                        data: { ...selectedElement.data, showTotals: checked },
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Columns</Label>
                  <div className="space-y-2">
                    {selectedElement.properties.columns?.map((col: TableColumn, i: number) => (
                      <div key={col.id} className="flex gap-2 items-center p-2 border rounded">
                        <Input
                          value={col.label}
                          onChange={(e) => {
                            const newColumns = [...selectedElement.properties.columns];
                            newColumns[i].label = e.target.value;
                            updateElement({
                              ...selectedElement,
                              properties: { ...selectedElement.properties, columns: newColumns },
                            });
                          }}
                          className="flex-1"
                        />
                        <Select
                          value={col.alignment}
                          onValueChange={(value) => {
                            const newColumns = [...selectedElement.properties.columns];
                            newColumns[i].alignment = value as any;
                            updateElement({
                              ...selectedElement,
                              properties: { ...selectedElement.properties, columns: newColumns },
                            });
                          }}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="left">Left</SelectItem>
                            <SelectItem value="center">Center</SelectItem>
                            <SelectItem value="right">Right</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Font Size</Label>
                <Select
                  value={String(selectedElement.properties.fontSize)}
                  onValueChange={(value) =>
                    updateElement({
                      ...selectedElement,
                      properties: {
                        ...selectedElement.properties,
                        fontSize: parseInt(value),
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48].map((size) => (
                      <SelectItem key={size} value={String(size)}>
                        {size}px
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Font Family</Label>
                <Select
                  value={selectedElement.properties.fontFamily}
                  onValueChange={(value) =>
                    updateElement({
                      ...selectedElement,
                      properties: {
                        ...selectedElement.properties,
                        fontFamily: value,
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Arial, sans-serif">Arial</SelectItem>
                    <SelectItem value="'Times New Roman', serif">Times New Roman</SelectItem>
                    <SelectItem value="'Courier New', monospace">Courier New</SelectItem>
                    <SelectItem value="Georgia, serif">Georgia</SelectItem>
                    <SelectItem value="Verdana, sans-serif">Verdana</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Alignment</Label>
              <div className="flex gap-2">
                {(["left", "center", "right", "justify"] as const).map((align) => (
                  <Button
                    key={align}
                    variant={selectedElement.properties.alignment === align ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      updateElement({
                        ...selectedElement,
                        properties: {
                          ...selectedElement.properties,
                          alignment: align,
                        },
                      })
                    }
                  >
                    {align === "left" && "⬅"}
                    {align === "center" && "⏺"}
                    {align === "right" && "➡"}
                    {align === "justify" && "⇔"}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Text Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    value={selectedElement.properties.color}
                    onChange={(e) =>
                      updateElement({
                        ...selectedElement,
                        properties: {
                          ...selectedElement.properties,
                          color: e.target.value,
                        },
                      })
                    }
                    className="w-10 p-1"
                  />
                  <Input
                    value={selectedElement.properties.color}
                    onChange={(e) =>
                      updateElement({
                        ...selectedElement,
                        properties: {
                          ...selectedElement.properties,
                          color: e.target.value,
                        },
                      })
                    }
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Background Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    value={selectedElement.properties.backgroundColor}
                    onChange={(e) =>
                      updateElement({
                        ...selectedElement,
                        properties: {
                          ...selectedElement.properties,
                          backgroundColor: e.target.value,
                        },
                      })
                    }
                    className="w-10 p-1"
                  />
                  <Input
                    value={selectedElement.properties.backgroundColor}
                    onChange={(e) =>
                      updateElement({
                        ...selectedElement,
                        properties: {
                          ...selectedElement.properties,
                          backgroundColor: e.target.value,
                        },
                      })
                    }
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Bold</Label>
                <Switch
                  checked={selectedElement.properties.bold}
                  onCheckedChange={(checked) =>
                    updateElement({
                      ...selectedElement,
                      properties: {
                        ...selectedElement.properties,
                        bold: checked,
                      },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Italic</Label>
                <Switch
                  checked={selectedElement.properties.italic}
                  onCheckedChange={(checked) =>
                    updateElement({
                      ...selectedElement,
                      properties: {
                        ...selectedElement.properties,
                        italic: checked,
                      },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Underline</Label>
                <Switch
                  checked={selectedElement.properties.underline}
                  onCheckedChange={(checked) =>
                    updateElement({
                      ...selectedElement,
                      properties: {
                        ...selectedElement.properties,
                        underline: checked,
                      },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Visible</Label>
                <Switch
                  checked={selectedElement.properties.visible}
                  onCheckedChange={(checked) =>
                    updateElement({
                      ...selectedElement,
                      properties: {
                        ...selectedElement.properties,
                        visible: checked,
                      },
                    })
                  }
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Border</Label>
              <div className="grid grid-cols-3 gap-2">
                <Input
                  type="number"
                  value={selectedElement.properties.borderWidth}
                  onChange={(e) =>
                    updateElement({
                      ...selectedElement,
                      properties: {
                        ...selectedElement.properties,
                        borderWidth: parseInt(e.target.value) || 0,
                      },
                    })
                  }
                  placeholder="Width"
                />
                <Select
                  value={selectedElement.properties.borderStyle}
                  onValueChange={(value) =>
                    updateElement({
                      ...selectedElement,
                      properties: {
                        ...selectedElement.properties,
                        borderStyle: value as any,
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solid">Solid</SelectItem>
                    <SelectItem value="dashed">Dashed</SelectItem>
                    <SelectItem value="dotted">Dotted</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="color"
                  value={selectedElement.properties.borderColor}
                  onChange={(e) =>
                    updateElement({
                      ...selectedElement,
                      properties: {
                        ...selectedElement.properties,
                        borderColor: e.target.value,
                      },
                    })
                  }
                  className="p-1"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="data" className="space-y-4 mt-4">
            {selectedElement.type === "field" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Data Binding</Label>
                  <div className="p-3 bg-blue-50 rounded border border-blue-200">
                    <div className="text-sm font-medium text-blue-700">
                      Bound to: <code className="ml-2">{selectedElement.key}</code>
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
                      This field will automatically fetch data from the database
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Default Value</Label>
                  <Input
                    value={selectedElement.data?.defaultValue || ""}
                    onChange={(e) =>
                      updateElement({
                        ...selectedElement,
                        data: { ...selectedElement.data, defaultValue: e.target.value },
                      })
                    }
                    placeholder="Leave empty for dynamic data"
                  />
                </div>
              </div>
            )}

            {selectedElement.type === "formula" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Formula Expression</Label>
                  <Textarea
                    value={selectedElement.data?.formula || ""}
                    onChange={(e) =>
                      updateElement({
                        ...selectedElement,
                        data: { ...selectedElement.data, formula: e.target.value },
                      })
                    }
                    placeholder="e.g., total * 0.18"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Available Variables</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {record?.data &&
                      Object.keys(record.data)
                        .slice(0, 6)
                        .map((key) => (
                          <Badge
                            key={key}
                            variant="outline"
                            className="cursor-pointer hover:bg-gray-100"
                            onClick={() => {
                              const currentFormula = selectedElement.data?.formula || "";
                              updateElement({
                                ...selectedElement,
                                data: {
                                  ...selectedElement.data,
                                  formula: currentFormula + `{${key}}`,
                                },
                              });
                            }}
                          >
                            {key}
                          </Badge>
                        ))}
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>Database Connection</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select data source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current-record">Current Record</SelectItem>
                  <SelectItem value="related-records">Related Records</SelectItem>
                  <SelectItem value="master-data">Master Data</SelectItem>
                  <SelectItem value="custom-query">Custom Query</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Width (px)</Label>
                <Input
                  type="number"
                  value={selectedElement.properties.width}
                  onChange={(e) =>
                    updateElement({
                      ...selectedElement,
                      properties: {
                        ...selectedElement.properties,
                        width: parseInt(e.target.value) || 0,
                      },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Height (px)</Label>
                <Input
                  type="number"
                  value={selectedElement.properties.height}
                  onChange={(e) =>
                    updateElement({
                      ...selectedElement,
                      properties: {
                        ...selectedElement.properties,
                        height: parseInt(e.target.value) || 0,
                      },
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Rotation (degrees)</Label>
              <Input
                type="range"
                min="0"
                max="360"
                value={selectedElement.properties.rotation}
                onChange={(e) =>
                  updateElement({
                    ...selectedElement,
                    properties: {
                      ...selectedElement.properties,
                      rotation: parseInt(e.target.value),
                    },
                  })
                }
              />
              <div className="text-xs text-gray-500 text-center">
                {selectedElement.properties.rotation}°
              </div>
            </div>

            <div className="space-y-2">
              <Label>Opacity</Label>
              <Input
                type="range"
                min="0"
                max="100"
                value={selectedElement.properties.opacity * 100}
                onChange={(e) =>
                  updateElement({
                    ...selectedElement,
                    properties: {
                      ...selectedElement.properties,
                      opacity: parseInt(e.target.value) / 100,
                    },
                  })
                }
              />
              <div className="text-xs text-gray-500 text-center">
                {Math.round(selectedElement.properties.opacity * 100)}%
              </div>
            </div>

            <div className="space-y-2">
              <Label>Z-Index</Label>
              <Input
                type="number"
                value={selectedElement.properties.zIndex}
                onChange={(e) =>
                  updateElement({
                    ...selectedElement,
                    properties: {
                      ...selectedElement.properties,
                      zIndex: parseInt(e.target.value) || 0,
                    },
                  })
                }
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Conditional Visibility</Label>
              <Textarea
                placeholder="e.g., status === 'approved'"
                rows={2}
              />
              <p className="text-xs text-gray-500">
                JavaScript expression that must evaluate to true for this element to be visible
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

/* ============================
   Main Smart Form Designer Component
   ============================ */
export default function SmartFormDesigner({
  masterObject,
  record: initialRecord,
  onBack,
  onSaveTemplate,
  onLoadTemplate,
}: any) {
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeElement, setActiveElement] = useState<Active | null>(null);
  const [record, setRecord] = useState<DataRecord>(initialRecord);
  const [templates, setTemplates] = useState<SmartFormTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDataPanel, setShowDataPanel] = useState(false);
  const nextId = useRef(1);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Initialize with sample data if no record provided
  useEffect(() => {
    if (!initialRecord) {
      setRecord({
        id: "sample-001",
        code: "PO-2024-001",
        type: "purchase_order",
        status: "approved",
        data: {
          companyName: "ACME Corporation",
          companyAddress: "123 Business St, New York, NY 10001",
          companyCity: "New York",
          companyCountry: "USA",
          companyPhone: "+1 (555) 123-4567",
          companyEmail: "info@acme.com",
          companyTaxId: "US-123-456-789",
          vendorName: "Global Suppliers Inc.",
          vendorAddress: "456 Trade Ave, Shanghai, China",
          vendorCity: "Shanghai",
          vendorCountry: "China",
          vendorPhone: "+86 21 1234 5678",
          vendorEmail: "sales@globalsuppliers.cn",
          vendorTaxId: "CN-987-654-321",
          poNumber: "PO-2024-001",
          poDate: "2024-01-15",
          deliveryDate: "2024-02-15",
          paymentTerms: "Net 30",
          currency: "USD",
          status: "Approved",
          totalAmount: "$12,500.00",
          subtotal: "$10,000.00",
          tax: "$2,500.00",
          shipping: "$0.00",
        },
        items: [
          {
            sno: 1,
            materialCode: "MAT-001",
            description: "Industrial Gear Set 5HP",
            unit: "PC",
            quantity: 10,
            rate: "$500.00",
            amount: "$5,000.00",
            tax: "$1,000.00",
            total: "$6,000.00",
          },
          {
            sno: 2,
            materialCode: "MAT-002",
            description: "Stainless Steel Bearings",
            unit: "SET",
            quantity: 5,
            rate: "$300.00",
            amount: "$1,500.00",
            tax: "$300.00",
            total: "$1,800.00",
          },
          {
            sno: 3,
            materialCode: "MAT-003",
            description: "Hydraulic Pump Assembly",
            unit: "UNIT",
            quantity: 3,
            rate: "$1,166.67",
            amount: "$3,500.00",
            tax: "$700.00",
            total: "$4,200.00",
          },
          {
            sno: 4,
            materialCode: "MAT-004",
            description: "Control Panel V2.0",
            unit: "PC",
            quantity: 2,
            rate: "$500.00",
            amount: "$1,000.00",
            tax: "$200.00",
            total: "$1,200.00",
          },
          {
            sno: 5,
            materialCode: "MAT-005",
            description: "Safety Sensor Array",
            unit: "SET",
            quantity: 4,
            rate: "$250.00",
            amount: "$1,000.00",
            tax: "$200.00",
            total: "$1,200.00",
          },
        ],
        totals: {
          "Subtotal": "$10,000.00",
          "Tax (25%)": "$2,500.00",
          "Shipping": "$0.00",
          "Grand Total": "$12,500.00",
        },
        metadata: {
          createdBy: "John Doe",
          approvedBy: "Jane Smith",
          department: "Procurement",
          project: "Factory Automation 2024",
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }, [initialRecord]);

  // Derive fields from masterObject or record
  const derivedFields: FieldDefinition[] = (() => {
    if (masterObject?.schemas?.[0]?.fieldDefinitions) {
      return masterObject.schemas[0].fieldDefinitions.map((f: any) => ({
        id: f.id || `field-${f.key}`,
        key: f.key,
        label: f.label || f.key,
        type: f.type || 'text',
        group: f.group || 'data',
        required: f.required || false,
        defaultValue: f.defaultValue,
        options: f.options || [],
      }));
    }

    // Generate from record data
    const fields: FieldDefinition[] = [];
    
    // Header fields
    ['poNumber', 'poDate', 'deliveryDate', 'status', 'currency', 'paymentTerms'].forEach(key => {
      if (record?.data?.[key]) {
        fields.push({
          id: `field-${key}`,
          key,
          label: key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()),
          type: key.includes('Date') ? 'date' : 'text',
          group: 'header',
        });
      }
    });

    // Company fields
    Object.keys(record?.data || {})
      .filter(key => key.startsWith('company'))
      .forEach(key => {
        fields.push({
          id: `field-${key}`,
          key,
          label: key.replace('company', '').replace(/([A-Z])/g, ' $1').trim() || 'Company',
          type: 'text',
          group: 'company',
        });
      });

    // Vendor fields
    Object.keys(record?.data || {})
      .filter(key => key.startsWith('vendor') || key.startsWith('customer'))
      .forEach(key => {
        fields.push({
          id: `field-${key}`,
          key,
          label: key.replace(/vendor|customer/, '').replace(/([A-Z])/g, ' $1').trim() || 'Vendor',
          type: 'text',
          group: 'vendor',
        });
      });

    // Financial fields
    ['totalAmount', 'subtotal', 'tax', 'shipping', 'discount'].forEach(key => {
      if (record?.data?.[key]) {
        fields.push({
          id: `field-${key}`,
          key,
          label: key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()),
          type: 'currency',
          group: 'financial',
        });
      }
    });

    // Metadata fields
    Object.keys(record?.metadata || {}).forEach(key => {
      fields.push({
        id: `field-meta-${key}`,
        key: `metadata.${key}`,
        label: key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()),
        type: 'text',
        group: 'metadata',
      });
    });

    return fields;
  })();

  // Static elements library
  const staticElements = [
    { key: "header", label: "Document Header", type: "header", icon: Type },
    { key: "logo", label: "Company Logo", type: "logo", icon: ImageIcon },
    { key: "address-from", label: "From Address Block", type: "address", icon: MapPin, data: { alignment: "left" } },
    { key: "address-to", label: "To Address Block", type: "address", icon: MapPin, data: { alignment: "right" } },
    { key: "signature", label: "Signature Area", type: "signature", icon: Signature },
    { key: "table", label: "Items Table", type: "table", icon: TableIcon },
    { key: "barcode", label: "Barcode/QR Code", type: "barcode", icon: Barcode },
    { key: "page-break", label: "Page Break", type: "pageBreak", icon: FileText },
    { key: "line", label: "Separator Line", type: "line", icon: LineChart },
    { key: "rectangle", label: "Rectangle Box", type: "rectangle", icon: Grid },
    { key: "image", label: "Image", type: "image", icon: ImageIcon },
    { key: "formula", label: "Formula Field", type: "formula", icon: Zap },
    { key: "footer", label: "Document Footer", type: "footer", icon: Layers },
  ];

  // Initialize with default template
  useEffect(() => {
    const defaultTemplate: CanvasElement[] = [
      {
        id: "header-main",
        type: "header",
        key: "header",
        label: "PURCHASE ORDER",
        data: { text: "PURCHASE ORDER" },
        properties: {
          x: 50,
          y: 30,
          width: 0,
          height: 0,
          fontSize: 24,
          fontFamily: "Arial, sans-serif",
          bold: true,
          italic: false,
          underline: false,
          alignment: "center",
          color: "#000000",
          backgroundColor: "transparent",
          borderWidth: 0,
          borderColor: "#000000",
          borderStyle: "solid",
          padding: 0,
          margin: 0,
          visible: true,
          zIndex: 1,
          opacity: 1,
          rotation: 0,
        },
      },
      {
        id: "logo-company",
        type: "logo",
        key: "logo",
        label: "Company Logo",
        data: { imageUrl: "" },
        properties: {
          x: 30,
          y: 30,
          width: 100,
          height: 50,
          fontSize: 12,
          fontFamily: "Arial, sans-serif",
          bold: false,
          italic: false,
          underline: false,
          alignment: "center",
          color: "#000000",
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: "#d1d5db",
          borderStyle: "dashed",
          padding: 4,
          margin: 0,
          visible: true,
          zIndex: 2,
          opacity: 1,
          rotation: 0,
        },
      },
      {
        id: "address-company",
        type: "address",
        key: "companyAddress",
        label: "Company Address",
        data: { alignment: "left" },
        properties: {
          x: 30,
          y: 100,
          width: 250,
          height: 120,
          fontSize: 11,
          fontFamily: "Arial, sans-serif",
          bold: false,
          italic: false,
          underline: false,
          alignment: "left",
          color: "#000000",
          backgroundColor: "transparent",
          borderWidth: 0,
          borderColor: "#000000",
          borderStyle: "solid",
          padding: 0,
          margin: 0,
          visible: true,
          zIndex: 1,
          opacity: 1,
          rotation: 0,
        },
      },
      {
        id: "address-vendor",
        type: "address",
        key: "vendorAddress",
        label: "Vendor Address",
        data: { alignment: "right" },
        properties: {
          x: 300,
          y: 100,
          width: 250,
          height: 120,
          fontSize: 11,
          fontFamily: "Arial, sans-serif",
          bold: false,
          italic: false,
          underline: false,
          alignment: "right",
          color: "#000000",
          backgroundColor: "transparent",
          borderWidth: 0,
          borderColor: "#000000",
          borderStyle: "solid",
          padding: 0,
          margin: 0,
          visible: true,
          zIndex: 1,
          opacity: 1,
          rotation: 0,
        },
      },
      {
        id: "field-ponumber",
        type: "field",
        key: "poNumber",
        label: "PO Number",
        data: {},
        properties: {
          x: 30,
          y: 240,
          width: 150,
          height: 30,
          fontSize: 11,
          fontFamily: "Arial, sans-serif",
          bold: true,
          italic: false,
          underline: false,
          alignment: "left",
          color: "#000000",
          backgroundColor: "transparent",
          borderWidth: 0,
          borderColor: "#000000",
          borderStyle: "solid",
          padding: 0,
          margin: 0,
          visible: true,
          zIndex: 1,
          opacity: 1,
          rotation: 0,
        },
      },
      {
        id: "field-podate",
        type: "field",
        key: "poDate",
        label: "PO Date",
        data: {},
        properties: {
          x: 200,
          y: 240,
          width: 150,
          height: 30,
          fontSize: 11,
          fontFamily: "Arial, sans-serif",
          bold: true,
          italic: false,
          underline: false,
          alignment: "left",
          color: "#000000",
          backgroundColor: "transparent",
          borderWidth: 0,
          borderColor: "#000000",
          borderStyle: "solid",
          padding: 0,
          margin: 0,
          visible: true,
          zIndex: 1,
          opacity: 1,
          rotation: 0,
        },
      },
      {
        id: "table-items",
        type: "table",
        key: "itemsTable",
        label: "Items Table",
        data: {
          title: "Order Items",
          showTotals: true,
        },
        properties: {
          x: 30,
          y: 290,
          width: 520,
          height: 0,
          fontSize: 10,
          fontFamily: "Arial, sans-serif",
          bold: false,
          italic: false,
          underline: false,
          alignment: "left",
          color: "#000000",
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: "#000000",
          borderStyle: "solid",
          padding: 4,
          margin: 0,
          visible: true,
          zIndex: 1,
          opacity: 1,
          rotation: 0,
          columns: [
            {
              id: "col-sno",
              key: "sno",
              label: "S.No.",
              width: 40,
              alignment: "center",
              type: "number",
            },
            {
              id: "col-desc",
              key: "description",
              label: "Description",
              width: 200,
              alignment: "left",
              type: "text",
            },
            {
              id: "col-unit",
              key: "unit",
              label: "Unit",
              width: 60,
              alignment: "center",
              type: "text",
            },
            {
              id: "col-qty",
              key: "quantity",
              label: "Qty",
              width: 60,
              alignment: "center",
              type: "number",
            },
            {
              id: "col-rate",
              key: "rate",
              label: "Rate",
              width: 80,
              alignment: "right",
              type: "currency",
            },
            {
              id: "col-amount",
              key: "amount",
              label: "Amount",
              width: 80,
              alignment: "right",
              type: "currency",
            },
          ],
        },
      },
      {
        id: "line-total",
        type: "line",
        key: "totalLine",
        label: "Total Separator",
        data: {},
        properties: {
          x: 30,
          y: 600,
          width: 520,
          height: 0,
          fontSize: 12,
          fontFamily: "Arial, sans-serif",
          bold: false,
          italic: false,
          underline: false,
          alignment: "center",
          color: "#000000",
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: "#000000",
          borderStyle: "solid",
          padding: 0,
          margin: 10,
          visible: true,
          zIndex: 1,
          opacity: 1,
          rotation: 0,
        },
      },
      {
        id: "signature-auth",
        type: "signature",
        key: "signature",
        label: "Authorized Signature",
        data: {
          title: "Authorized Signature",
          name: record?.metadata?.approvedBy || "[Approved By]",
          designation: "Procurement Manager",
        },
        properties: {
          x: 350,
          y: 650,
          width: 200,
          height: 100,
          fontSize: 12,
          fontFamily: "Arial, sans-serif",
          bold: false,
          italic: false,
          underline: false,
          alignment: "center",
          color: "#000000",
          backgroundColor: "transparent",
          borderWidth: 0,
          borderColor: "#000000",
          borderStyle: "solid",
          padding: 0,
          margin: 0,
          visible: true,
          zIndex: 1,
          opacity: 1,
          rotation: 0,
        },
      },
      {
        id: "footer-main",
        type: "footer",
        key: "footer",
        label: "Document Footer",
        data: {
          leftText: `Generated: ${new Date().toLocaleDateString()}`,
          centerText: "Page 1 of 1",
          rightText: "Confidential",
        },
        properties: {
          x: 30,
          y: 780,
          width: 520,
          height: 40,
          fontSize: 9,
          fontFamily: "Arial, sans-serif",
          bold: false,
          italic: false,
          underline: false,
          alignment: "center",
          color: "#666666",
          backgroundColor: "#f9f9f9",
          borderWidth: 1,
          borderColor: "#e5e5e5",
          borderStyle: "solid",
          padding: 8,
          margin: 0,
          visible: true,
          zIndex: 1,
          opacity: 1,
          rotation: 0,
        },
      },
    ];
    
    setElements(defaultTemplate);
  }, []);

  // DnD Handlers
  function handleDragStart(event: DragStartEvent) {
    setActiveElement(event.active);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) {
      setActiveElement(null);
      return;
    }

    if (String(over.id) === "canvas") {
      const data = active.data.current;

      if (data?.type === "field") {
        const field = data.field as FieldDefinition;
        const newElement: CanvasElement = {
          id: `element-${nextId.current++}`,
          type: "field",
          key: field.key,
          label: field.label,
          data: {},
          properties: {
            x: 50,
            y: elements.length * 40 + 50,
            width: 200,
            height: 30,
            fontSize: 12,
            fontFamily: "Arial, sans-serif",
            bold: false,
            italic: false,
            underline: false,
            alignment: "left",
            color: "#000000",
            backgroundColor: "transparent",
            borderWidth: 0,
            borderColor: "#000000",
            borderStyle: "solid",
            padding: 0,
            margin: 0,
            visible: true,
            zIndex: 1,
            opacity: 1,
            rotation: 0,
          },
        };
        setElements((prev) => [...prev, newElement]);
      } else if (data?.type === "static") {
        const element = data.element;
        const newElement: CanvasElement = {
          id: `element-${nextId.current++}`,
          type: element.type,
          key: element.key,
          label: element.label,
          data: element.data || {},
          properties: {
            x: 50,
            y: elements.length * 60 + 50,
            width: element.type === "logo" ? 150 : element.type === "table" ? 500 : 200,
            height: element.type === "logo" ? 75 : element.type === "signature" ? 80 : 30,
            fontSize: element.type === "header" ? 24 : 12,
            fontFamily: "Arial, sans-serif",
            bold: element.type === "header",
            italic: false,
            underline: false,
            alignment: element.type === "header" ? "center" : "left",
            color: "#000000",
            backgroundColor: "transparent",
            borderWidth: element.type === "logo" ? 1 : 0,
            borderColor: "#d1d5db",
            borderStyle: element.type === "logo" ? "dashed" : "solid",
            padding: 0,
            margin: 0,
            visible: true,
            zIndex: 1,
            opacity: 1,
            rotation: 0,
          },
        };

        if (element.type === "table") {
          newElement.properties.columns = [
            {
              id: `col-${Date.now()}-1`,
              key: "sno",
              label: "S.No.",
              width: 40,
              alignment: "center",
              type: "number",
            },
            {
              id: `col-${Date.now()}-2`,
              key: "description",
              label: "Description",
              width: 200,
              alignment: "left",
              type: "text",
            },
            {
              id: `col-${Date.now()}-3`,
              key: "quantity",
              label: "Qty",
              width: 60,
              alignment: "center",
              type: "number",
            },
            {
              id: `col-${Date.now()}-4`,
              key: "rate",
              label: "Rate",
              width: 80,
              alignment: "right",
              type: "currency",
            },
            {
              id: `col-${Date.now()}-5`,
              key: "amount",
              label: "Amount",
              width: 80,
              alignment: "right",
              type: "currency",
            },
          ];
        }

        setElements((prev) => [...prev, newElement]);
      }
    }

    setActiveElement(null);
  }

  // Element Management
  function updateElement(updatedElement: CanvasElement) {
    setElements((prev) =>
      prev.map((el) => (el.id === updatedElement.id ? updatedElement : el))
    );
  }

  function deleteElement(elementId: string) {
    setElements((prev) => prev.filter((el) => el.id !== elementId));
    if (selectedId === elementId) {
      setSelectedId(null);
    }
  }

  function duplicateElement(element: CanvasElement) {
    const newElement: CanvasElement = {
      ...JSON.parse(JSON.stringify(element)),
      id: `element-${nextId.current++}`,
      properties: {
        ...element.properties,
        x: element.properties.x + 20,
        y: element.properties.y + 20,
      },
    };
    setElements((prev) => [...prev, newElement]);
    setSelectedId(newElement.id);
  }

  function moveElement(direction: "up" | "down") {
    if (!selectedId) return;
    const index = elements.findIndex((el) => el.id === selectedId);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === elements.length - 1)
    )
      return;

    const newElements = [...elements];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    [newElements[index], newElements[newIndex]] = [
      newElements[newIndex],
      newElements[index],
    ];
    setElements(newElements);
  }

  // Template Management
  function saveTemplate() {
    const template: SmartFormTemplate = {
      id: `template-${Date.now()}`,
      name: `Smart Form ${new Date().toLocaleDateString()}`,
      description: "Custom designed smart form",
      type: "purchase_order",
      category: "procurement",
      elements: elements,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    };

    // In a real app, you would save to database
    setTemplates((prev) => [...prev, template]);
    alert(`Template "${template.name}" saved!`);
  }

  function loadTemplate(template: SmartFormTemplate) {
    setElements(template.elements);
    alert(`Template "${template.name}" loaded!`);
  }

  // PDF Generation with Database Data
  async function generatePDF() {
    setIsLoading(true);
    try {
      const doc = new jsPDF("p", "mm", "a4");
      const pageWidth = doc.internal.pageSize.width;
      const margin = 15;
      let y = 20;

      doc.setFont("helvetica");

      // Process each element
      for (const el of elements) {
        if (!el.properties.visible) continue;

        // Page break
        if (el.type === "pageBreak") {
          doc.addPage();
          y = 20;
          continue;
        }

        // Header
        if (el.type === "header") {
          doc.setFontSize(el.properties.fontSize);
          doc.setFont(
            "helvetica",
            el.properties.bold ? "bold" : el.properties.italic ? "italic" : "normal"
          );
          if (el.properties.underline) {
            doc.setTextColor(255, 0, 0); // Mark underline with color for now
          }
          doc.text(el.data?.text || el.label, pageWidth / 2, y, {
            align: "center" as any,
          });
          y += 10;
        }

        // Logo
        else if (el.type === "logo") {
          if (el.data?.imageUrl) {
            // In a real app, you would load and embed the image
            doc.setDrawColor(el.properties.borderColor);
            doc.setLineWidth(el.properties.borderWidth);
            doc.rect(
              margin + el.properties.x / 3.78,
              y,
              el.properties.width / 3.78,
              el.properties.height / 3.78
            );
            doc.text("[Company Logo]", margin + el.properties.x / 3.78 + 5, y + 10);
            y += el.properties.height / 3.78 + 5;
          }
        }

        // Address block
        else if (el.type === "address") {
          const isFrom = el.properties.alignment === "left";
          const data = isFrom
            ? {
                name: record.data.companyName,
                address: record.data.companyAddress,
                city: record.data.companyCity,
                country: record.data.companyCountry,
                phone: record.data.companyPhone,
                email: record.data.companyEmail,
                taxId: record.data.companyTaxId,
              }
            : {
                name: record.data.vendorName,
                address: record.data.vendorAddress,
                city: record.data.vendorCity,
                country: record.data.vendorCountry,
                phone: record.data.vendorPhone,
                email: record.data.vendorEmail,
                taxId: record.data.vendorTaxId,
              };

          doc.setFontSize(el.properties.fontSize);
          doc.setFont("helvetica", "bold");
          doc.text(isFrom ? "FROM:" : "TO:", margin, y);
          y += 5;

          doc.setFont("helvetica", "normal");
          doc.text(data.name, margin, y);
          y += 5;
          doc.text(data.address, margin, y);
          y += 5;
          doc.text(`${data.city}, ${data.country}`, margin, y);
          y += 5;
          if (data.phone) {
            doc.text(`Phone: ${data.phone}`, margin, y);
            y += 5;
          }
          if (data.email) {
            doc.text(`Email: ${data.email}`, margin, y);
            y += 5;
          }
          if (data.taxId) {
            doc.text(`Tax ID: ${data.taxId}`, margin, y);
            y += 5;
          }
          y += 5;
        }

        // Field
        else if (el.type === "field") {
          const key = el.key ?? "";
          const value = key ? (record?.data?.[key] ?? "") : "";
          doc.setFontSize(el.properties.fontSize);
          doc.setFont(
            "helvetica",
            el.properties.bold ? "bold" : el.properties.italic ? "italic" : "normal"
          );
          const x = el.properties.alignment === "center" ? pageWidth / 2 : 
                    el.properties.alignment === "right" ? pageWidth - margin : 
                    margin;
          doc.text(`${el.label}: ${value}`, x, y, {
            align: el.properties.alignment as any,
          });
          y += 8;
        }

        // Table
        else if (el.type === "table") {
          const items = record.items || [];
          const columns = el.properties.columns || [];

          const tableData = items.map((item: any, index: number) => {
            return columns.map((col) => {
              const value = item[col.key] || "";
              return col.type === "currency" && typeof value === "string"
                ? value.replace("$", "")
                : String(value);
            });
          });

          const columnStyles: any = {};
          columns.forEach((col, i) => {
            columnStyles[i] = {
              cellWidth: col.width / 3.78,
              halign: col.alignment as any,
            };
          });

          autoTable(doc, {
            startY: y,
            head: [columns.map((col) => col.label)],
            body: tableData,
            theme: "grid",
            styles: {
              fontSize: el.properties.fontSize,
              cellPadding: el.properties.padding / 3.78,
              overflow: "linebreak",
            },
            headStyles: {
              fillColor: [60, 120, 180],
              textColor: [255, 255, 255],
              fontStyle: "bold",
            },
            columnStyles: columnStyles,
            margin: { left: margin, right: margin },
          });

          y = (doc as any).lastAutoTable.finalY + 10;

          // Totals
          if (el.data?.showTotals && record.totals) {
            const totalsY = (doc as any).lastAutoTable.finalY + 5;
            Object.entries(record.totals).forEach(([label, value], i) => {
              doc.setFontSize(10);
              doc.setFont("helvetica", "bold");
              doc.text(
                label,
                pageWidth - margin - 60,
                totalsY + i * 6
              );
              doc.text(
                String(value),
                pageWidth - margin,
                totalsY + i * 6,
                { align: "right" as any }
              );
            });
            y = totalsY + Object.keys(record.totals).length * 6 + 10;
          }
        }

        // Signature
        else if (el.type === "signature") {
          doc.setFontSize(el.properties.fontSize);
          doc.setFont("helvetica", "bold");
          doc.text(
            el.data?.title || "Authorized Signature",
            pageWidth - margin - 50,
            y
          );
          y += 20;
          doc.setLineWidth(1);
          doc.line(pageWidth - margin - 80, y, pageWidth - margin, y);
          y += 10;
          doc.setFont("helvetica", "normal");
          doc.text(
            el.data?.name || "[Name]",
            pageWidth - margin - 40,
            y,
            { align: "center" as any }
          );
          y += 5;
          doc.setFontSize(el.properties.fontSize - 2);
          doc.text(
            el.data?.designation || "[Designation]",
            pageWidth - margin - 40,
            y,
            { align: "center" as any }
          );
          y += 15;
        }

        // Line
        else if (el.type === "line") {
          doc.setLineWidth(el.properties.borderWidth);
          doc.setDrawColor(el.properties.borderColor);
          doc.line(margin, y, pageWidth - margin, y);
          y += 10;
        }

        // Footer
        else if (el.type === "footer") {
          doc.setFontSize(el.properties.fontSize);
          doc.setTextColor(100, 100, 100);
          if (el.data?.leftText) {
            doc.text(el.data.leftText, margin, y);
          }
          if (el.data?.centerText) {
            doc.text(el.data.centerText, pageWidth / 2, y, {
              align: "center" as any,
            });
          }
          if (el.data?.rightText) {
            doc.text(el.data.rightText, pageWidth - margin, y, {
              align: "right" as any,
            });
          }
          y += 10;
        }

        // Check page break
        if (y > 270 && elements.indexOf(el) < elements.length - 1) {
          doc.addPage();
          y = 20;
        }
      }

      // Save PDF
      doc.save(
        `${record.code || "document"}_${new Date().toISOString().split("T")[0]}.pdf`
      );
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  // Print directly
  async function printForm() {
    setIsLoading(true);
    try {
      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        alert("Please allow popups to print.");
        return;
      }

      // Generate HTML for printing
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Print Document</title>
          <style>
            @media print {
              @page { margin: 20mm; }
              body { font-family: Arial, sans-serif; }
              .page-break { page-break-after: always; }
              .header { text-align: center; font-size: 24px; font-weight: bold; }
              .address { margin-bottom: 20px; }
              .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              .table th { background: #3c78d8; color: white; padding: 8px; }
              .table td { border: 1px solid #ddd; padding: 8px; }
              .total-section { text-align: right; margin-top: 20px; }
              .signature { margin-top: 50px; text-align: right; }
              .footer { margin-top: 50px; text-align: center; color: #666; font-size: 9px; }
            }
          </style>
        </head>
        <body>
          <div class="header">${record.code || "Document"}</div>
          
          <div style="display: flex; justify-content: space-between; margin: 30px 0;">
            <div class="address">
              <strong>FROM:</strong><br>
              ${record.data.companyName || ""}<br>
              ${record.data.companyAddress || ""}<br>
              ${record.data.companyCity || ""}, ${record.data.companyCountry || ""}<br>
              Phone: ${record.data.companyPhone || ""}<br>
              Email: ${record.data.companyEmail || ""}
            </div>
            <div class="address" style="text-align: right;">
              <strong>TO:</strong><br>
              ${record.data.vendorName || ""}<br>
              ${record.data.vendorAddress || ""}<br>
              ${record.data.vendorCity || ""}, ${record.data.vendorCountry || ""}<br>
              Phone: ${record.data.vendorPhone || ""}<br>
              Email: ${record.data.vendorEmail || ""}
            </div>
          </div>

          ${record.items && record.items.length > 0 ? `
          <table class="table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Description</th>
                <th>Unit</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${record.items.map((item: any) => `
                <tr>
                  <td>${item.sno || ""}</td>
                  <td>${item.description || ""}</td>
                  <td>${item.unit || ""}</td>
                  <td>${item.quantity || ""}</td>
                  <td>${item.rate || ""}</td>
                  <td>${item.amount || ""}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>

          ${record.totals ? `
          <div class="total-section">
            ${Object.entries(record.totals).map(([label, value]) => `
              <div style="margin: 5px 0;">
                <strong>${label}:</strong> ${value}
              </div>
            `).join("")}
          </div>
          ` : ""}
          ` : ""}

          <div class="signature">
            <div style="border-top: 1px solid #000; width: 200px; margin-left: auto; padding-top: 10px;">
              <strong>Authorized Signature</strong><br>
              ${record.metadata?.approvedBy || "[Name]"}<br>
              ${record.metadata?.department ? record.metadata.department + " Department" : "[Designation]"}
            </div>
          </div>

          <div class="footer">
            <div>Generated on ${new Date().toLocaleDateString()} | Page 1 of 1</div>
          </div>
        </body>
        </html>
      `;

      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      
      // Wait for content to load
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    } catch (error) {
      console.error("Print failed:", error);
      alert("Failed to print. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const selectedElement = elements.find((e) => e.id === selectedId);

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Smart Form Designer</h1>
          <p className="text-sm text-gray-600">
            Design SAP-like smart forms with drag & drop. Data auto-filled from database.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="outline" className="flex items-center gap-1">
            <Database className="w-3 h-3" />
            {record?.type?.toUpperCase() || "PO"}
          </Badge>
          <Badge variant="outline">
            {record?.code || "No Record"}
          </Badge>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white border rounded-lg p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Select onValueChange={(value) => {
              if (value === "po") {
                // Load PO template
                loadTemplate({
                  id: "po-template",
                  name: "Purchase Order",
                  description: "Standard purchase order template",
                  type: "purchase_order",
                  category: "procurement",
                  elements: [],
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  version: 1,
                });
              } else if (value === "invoice") {
                // Load invoice template
                loadTemplate({
                  id: "invoice-template",
                  name: "Invoice",
                  description: "Standard invoice template",
                  type: "invoice",
                  category: "sales",
                  elements: [],
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  version: 1,
                });
              } else if (value === "mr") {
                // Load material receipt template
                loadTemplate({
                  id: "mr-template",
                  name: "Material Receipt",
                  description: "Material receipt note template",
                  type: "material_receipt",
                  category: "inventory",
                  elements: [],
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  version: 1,
                });
              }
            }}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Load Template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="po">📋 Purchase Order</SelectItem>
                <SelectItem value="invoice">🧾 Invoice</SelectItem>
                <SelectItem value="mr">📦 Material Receipt</SelectItem>
                <SelectItem value="dn">🚚 Delivery Note</SelectItem>
                <SelectItem value="quote">💲 Quotation</SelectItem>
                <SelectItem value="payment">💳 Payment Voucher</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={saveTemplate}>
              <Save className="w-4 h-4 mr-2" />
              Save Template
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Form Settings</DropdownMenuLabel>
                <DropdownMenuItem>Page Setup</DropdownMenuItem>
                <DropdownMenuItem>Default Fonts</DropdownMenuItem>
                <DropdownMenuItem>Color Scheme</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Company Details</DropdownMenuItem>
                <DropdownMenuItem>Signature Setup</DropdownMenuItem>
                <DropdownMenuItem>Number Formatting</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>

            {selectedId && (
              <>
                <Button variant="outline" size="sm" onClick={() => moveElement("up")}>
                  <MoveUp className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => moveElement("down")}>
                  <MoveDown className="w-4 h-4" />
                </Button>
              </>
            )}

            <Button
              variant="outline"
              onClick={printForm}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Printer className="w-4 h-4 mr-2" />
              )}
              Print
            </Button>

            <Button
              onClick={generatePDF}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              Download PDF
            </Button>
          </div>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-12 gap-4">
          {/* Left Sidebar - Fields & Elements */}
          <div className="col-span-2 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Database Fields
                </CardTitle>
                <CardDescription>
                  Drag fields to auto-fill from database
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Header Fields
                    </div>
                    {derivedFields
                      .filter((f) => f.group === "header")
                      .map((f) => (
                        <DraggableField key={f.id} field={f} icon={FileText} />
                      ))}

                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-4">
                      Company Info
                    </div>
                    {derivedFields
                      .filter((f) => f.group === "company")
                      .map((f) => (
                        <DraggableField key={f.id} field={f} icon={Building} />
                      ))}

                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-4">
                      Vendor/Customer
                    </div>
                    {derivedFields
                      .filter((f) => f.group === "vendor")
                      .map((f) => (
                        <DraggableField key={f.id} field={f} icon={User} />
                      ))}

                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-4">
                      Financial
                    </div>
                    {derivedFields
                      .filter((f) => f.group === "financial")
                      .map((f) => (
                        <DraggableField key={f.id} field={f} icon={Hash} />
                      ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  Layout Elements
                </CardTitle>
                <CardDescription>
                  Drag to add to form
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-2">
                    {staticElements.map((s) => (
                      <DraggableStatic key={s.key} element={s} />
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      const newTable: CanvasElement = {
                        id: `element-${nextId.current++}`,
                        type: "table",
                        key: "table",
                        label: "Items Table",
                        data: { title: "Order Items", showTotals: true },
                        properties: {
                          x: 50,
                          y: elements.length * 60 + 50,
                          width: 500,
                          height: 0,
                          fontSize: 10,
                          fontFamily: "Arial, sans-serif",
                          bold: false,
                          italic: false,
                          underline: false,
                          alignment: "left",
                          color: "#000000",
                          backgroundColor: "transparent",
                          borderWidth: 1,
                          borderColor: "#000000",
                          borderStyle: "solid",
                          padding: 4,
                          margin: 0,
                          visible: true,
                          zIndex: 1,
                          opacity: 1,
                          rotation: 0,
                          columns: [
                            {
                              id: `col-${Date.now()}-1`,
                              key: "sno",
                              label: "S.No.",
                              width: 40,
                              alignment: "center",
                              type: "number",
                            },
                            {
                              id: `col-${Date.now()}-2`,
                              key: "description",
                              label: "Description",
                              width: 200,
                              alignment: "left",
                              type: "text",
                            },
                            {
                              id: `col-${Date.now()}-3`,
                              key: "quantity",
                              label: "Qty",
                              width: 60,
                              alignment: "center",
                              type: "number",
                            },
                            {
                              id: `col-${Date.now()}-4`,
                              key: "rate",
                              label: "Rate",
                              width: 80,
                              alignment: "right",
                              type: "currency",
                            },
                            {
                              id: `col-${Date.now()}-5`,
                              key: "amount",
                              label: "Amount",
                              width: 80,
                              alignment: "right",
                              type: "currency",
                            },
                          ],
                        },
                      };
                      setElements((prev) => [...prev, newTable]);
                    }}
                  >
                    <TableIcon className="w-4 h-4 mr-2" />
                    Add Items Table
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      const newSig: CanvasElement = {
                        id: `element-${nextId.current++}`,
                        type: "signature",
                        key: "signature",
                        label: "Signature",
                        data: {
                          title: "Authorized Signature",
                          name: record?.metadata?.approvedBy || "",
                          designation: "Manager",
                        },
                        properties: {
                          x: 350,
                          y: elements.length * 60 + 50,
                          width: 200,
                          height: 80,
                          fontSize: 12,
                          fontFamily: "Arial, sans-serif",
                          bold: false,
                          italic: false,
                          underline: false,
                          alignment: "center",
                          color: "#000000",
                          backgroundColor: "transparent",
                          borderWidth: 0,
                          borderColor: "#000000",
                          borderStyle: "solid",
                          padding: 0,
                          margin: 0,
                          visible: true,
                          zIndex: 1,
                          opacity: 1,
                          rotation: 0,
                        },
                      };
                      setElements((prev) => [...prev, newSig]);
                    }}
                  >
                    <Signature className="w-4 h-4 mr-2" />
                    Add Signature
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setShowDataPanel(!showDataPanel)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {showDataPanel ? "Hide Data" : "Show Data"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Canvas */}
          <div className="col-span-7">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Design Canvas</h3>
                <p className="text-xs text-gray-500">
                  Drag & drop elements. Click to select and configure.
                </p>
              </div>
              <div className="text-xs text-gray-500">
                {elements.length} elements | {elements.filter(e => e.type === "field").length} data fields
              </div>
            </div>
            <Canvas
              elements={elements}
              onSelect={setSelectedId}
              selectedId={selectedId}
              record={record}
              onElementsChange={setElements}
            />
          </div>

          {/* Right Sidebar - Properties & Preview */}
          <div className="col-span-3 space-y-4">
            <PropertiesPanel
              selectedElement={selectedElement}
              updateElement={updateElement}
              record={record}
              onDelete={deleteElement}
              onDuplicate={duplicateElement}
            />

            {showDataPanel && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">
                    Data Preview
                  </CardTitle>
                  <CardDescription>
                    Current record data from database
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">
                          Document Info
                        </h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Code:</span>
                            <span className="font-medium">{record.code}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Type:</span>
                            <span className="font-medium">{record.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <Badge variant="outline" className="text-xs">
                              {record.status}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">
                          Items ({record.items?.length || 0})
                        </h4>
                        {record.items && record.items.length > 0 ? (
                          <div className="space-y-1">
                            {record.items.slice(0, 3).map((item: any) => (
                              <div
                                key={item.sno}
                                className="text-xs p-2 bg-gray-50 rounded"
                              >
                                {item.description}
                              </div>
                            ))}
                            {record.items.length > 3 && (
                              <div className="text-xs text-gray-500 text-center">
                                ... and {record.items.length - 3} more
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-xs text-gray-500">
                            No items in this record
                          </div>
                        )}
                      </div>

                      <Separator />

                      <div>
                        <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">
                          Totals
                        </h4>
                        <div className="space-y-1 text-sm">
                          {record.totals &&
                            Object.entries(record.totals).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="text-gray-600">{key}:</span>
                                <span className="font-medium">{String(value)}</span>
                              </div>
                            ))}
                          {!record.totals && (
                            <div className="text-xs text-gray-500">
                              No totals calculated
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Form Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Elements</span>
                    <span className="font-medium">{elements.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Data Fields</span>
                    <span className="font-medium">
                      {elements.filter(e => e.type === "field").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Tables</span>
                    <span className="font-medium">
                      {elements.filter(e => e.type === "table").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Images/Logos</span>
                    <span className="font-medium">
                      {elements.filter(e => e.type === "logo" || e.type === "image").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Signatures</span>
                    <span className="font-medium">
                      {elements.filter(e => e.type === "signature").length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <DragOverlay>
          {activeElement?.data?.current ? (
            <div className="bg-white border-2 border-blue-400 rounded-lg px-4 py-3 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded">
                  {activeElement.data.current.field ? (
                    <FileText className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Layers className="w-4 h-4 text-purple-600" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-sm">
                    {activeElement.data.current.field?.label ||
                      activeElement.data.current.element?.label}
                  </div>
                  <div className="text-xs text-gray-500">
                    {activeElement.data.current.field
                      ? "Database Field"
                      : "Layout Element"}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  FileSpreadsheet,
  FileText,
  Download,
  Calendar,
  Package,
  Layers,
  Factory,
  Warehouse,
  BarChart3,
} from 'lucide-react';

const reports = [
  {
    id: 'yarn-daily',
    title: 'Yarn Stock Register',
    description: 'Daily yarn inventory with purchases, consumption and wastage',
    icon: Package,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    id: 'unfinished-daily',
    title: 'Unfinished Goods Register',
    description: 'Grey fabric inventory and finished goods production',
    icon: Layers,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    id: 'godown-biratnagar',
    title: 'Biratnagar Stock Report',
    description: 'Production, sales and transfers from main factory',
    icon: Factory,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    id: 'godown-birgunj',
    title: 'Birgunj Godown Report',
    description: 'Stock received and sales at Birgunj location',
    icon: Warehouse,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    id: 'production-vs-sales',
    title: 'Production vs Sales Analysis',
    description: 'Compare production, dispatch and sales metrics',
    icon: BarChart3,
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    id: 'monthly-summary',
    title: 'Monthly Summary',
    description: 'Comprehensive monthly stock summary in kg & meters',
    icon: Calendar,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
];

export default function Reports() {
  return (
    <Layout title="Reports">
      <div className="page-container">
        {/* Filters */}
        <div className="bg-card rounded-xl border border-border p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Report Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fromDate">From Date</Label>
              <Input id="fromDate" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="toDate">To Date</Label>
              <Input id="toDate" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="godown">Godown</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Godowns" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Godowns</SelectItem>
                  <SelectItem value="biratnagar">Biratnagar</SelectItem>
                  <SelectItem value="birgunj">Birgunj</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="format">Export Format</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Report Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report) => (
            <Card
              key={report.id}
              className="p-6 hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${report.bgColor}`}>
                  <report.icon className={`h-6 w-6 ${report.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {report.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <Button variant="outline" size="sm" className="flex-1">
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Excel
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  PDF
                </Button>
                <Button size="sm" variant="ghost">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-card rounded-xl border border-border p-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Quick Export</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Today's Summary
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              This Week
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              This Month
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Last 30 Days
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

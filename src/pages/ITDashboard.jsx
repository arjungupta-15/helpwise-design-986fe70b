import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TicketCheck, Clock, CheckCircle, Bot, Database, TrendingUp, AlertTriangle } from "lucide-react";
import { getTickets } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend, 
  ChartLegendContent 
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

// Chart configuration
const chartConfig = {
  open: {
    label: "Open Tickets",
    color: "hsl(var(--chart-1))",
  },
  resolved: {
    label: "Resolved Tickets",
    color: "hsl(var(--chart-2))",
  },
  inProgress: {
    label: "In Progress",
    color: "hsl(var(--chart-3))",
  },
  aiRouted: {
    label: "AI Routed",
    color: "hsl(var(--chart-4))",
  },
  manual: {
    label: "Manual",
    color: "hsl(var(--chart-5))",
  },
};

// Generate mock trend data for the last 7 days
const generateTrendData = (tickets) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map((day, index) => ({
    day,
    open: Math.floor(Math.random() * 20) + 5,
    resolved: Math.floor(Math.random() * 15) + 8,
    inProgress: Math.floor(Math.random() * 10) + 3,
    aiRouted: Math.floor(Math.random() * 12) + 6,
  }));
};

// Generate category distribution data
const generateCategoryData = (tickets) => {
  const categories = ['Network', 'Hardware', 'Software', 'Email', 'VPN', 'Password'];
  return categories.map(category => ({
    name: category,
    value: Math.floor(Math.random() * 30) + 10,
    fill: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
  }));
};

// Generate priority distribution data
const generatePriorityData = (tickets) => [
  { name: 'High', value: tickets.filter(t => t.priority === 'high').length, fill: '#ef4444' },
  { name: 'Medium', value: tickets.filter(t => t.priority === 'medium').length, fill: '#f59e0b' },
  { name: 'Low', value: tickets.filter(t => t.priority === 'low').length, fill: '#10b981' },
];

// Generate performance metrics data
const generatePerformanceData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map(month => ({
    month,
    avgResolutionTime: Math.floor(Math.random() * 10) + 15, // hours
    slaCompliance: Math.floor(Math.random() * 20) + 80, // percentage
    customerSatisfaction: Math.floor(Math.random() * 15) + 85, // percentage
  }));
};

export default function ITDashboard() {
  const [sourceFilter, setSourceFilter] = useState("all");
  const { data: ticketsData, isLoading } = useQuery({
    queryKey: ["tickets", "it"],
    queryFn: () => getTickets({ role: "it" }),
  });
  const tickets = ticketsData || [];

  const filteredTickets = sourceFilter === "all" ? tickets : tickets.filter(t => t.source === sourceFilter);
  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status === 'open').length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;
  const aiRoutedTickets = tickets.filter(t => t.aiRouted).length;

  // Advanced analytics
  const aiClassifiedCount = tickets.filter((t) => t.aiClassified).length;
  const aiClassifiedRate = useMemo(() => {
    if (!tickets.length) return 0;
    return Math.round((aiClassifiedCount / tickets.length) * 100);
  }, [tickets, aiClassifiedCount]);

  const slaResolvedCount = tickets.filter((t) => {
    if (t.status !== 'resolved') return false;
    const created = t.createdAt ? new Date(t.createdAt).getTime() : 0;
    const updated = t.updatedAt ? new Date(t.updatedAt).getTime() : created;
    if (!created || !updated) return false;
    return (updated - created) <= 24 * 60 * 60 * 1000; // 24h SLA
  }).length;
  const slaComplianceRate = useMemo(() => {
    if (!resolvedTickets) return 0;
    return Math.round((slaResolvedCount / resolvedTickets) * 100);
  }, [resolvedTickets, slaResolvedCount]);

  // Chart data
  const trendData = generateTrendData(tickets);
  const categoryData = generateCategoryData(tickets);
  const priorityData = generatePriorityData(tickets);
  const performanceData = generatePerformanceData();

  // Predictive alerts
  const alerts = [
    { type: "warning", message: "High volume expected tomorrow (+25%)", icon: TrendingUp },
    { type: "critical", message: "SLA risk: 3 tickets approaching deadline", icon: AlertTriangle },
  ];

  const getSourceColor = (source) => {
    switch (source) {
      case 'GLPI': return 'bg-red-100 text-red-700 border-red-200';
      case 'Solman': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Email': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'Manual': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-700';
      case 'in_progress': return 'bg-yellow-100 text-yellow-700';
      case 'resolved': return 'bg-blue-100 text-blue-700';
      case 'closed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">IT Team Control – Full Automation</h1>
        <p className="text-muted-foreground">All tickets, unified ingestion, and AI insights</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <h3 className="text-3xl font-bold mt-2">{totalTickets}</h3>
            </div>
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <TicketCheck className="h-6 w-6" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Open</p>
              <h3 className="text-3xl font-bold mt-2">{openTickets}</h3>
            </div>
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <Clock className="h-6 w-6" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Resolved</p>
              <h3 className="text-3xl font-bold mt-2">{resolvedTickets}</h3>
            </div>
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <CheckCircle className="h-6 w-6" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">AI Routed</p>
              <h3 className="text-3xl font-bold mt-2">{aiRoutedTickets}</h3>
            </div>
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <Bot className="h-6 w-6" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">AI Accuracy</p>
              <h3 className="text-3xl font-bold mt-2">{aiClassifiedRate}%</h3>
            </div>
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
              <Database className="h-6 w-6" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">SLA Compliance</p>
              <h3 className="text-3xl font-bold mt-2">{slaComplianceRate}%</h3>
            </div>
            <div className="p-3 rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle className="h-6 w-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ticket Trends Area Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Ticket Trends (Last 7 Days)</h3>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <AreaChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Area 
                type="monotone" 
                dataKey="open" 
                stackId="1" 
                stroke="var(--color-open)" 
                fill="var(--color-open)" 
                fillOpacity={0.6}
              />
              <Area 
                type="monotone" 
                dataKey="resolved" 
                stackId="1" 
                stroke="var(--color-resolved)" 
                fill="var(--color-resolved)" 
                fillOpacity={0.6}
              />
              <Area 
                type="monotone" 
                dataKey="inProgress" 
                stackId="1" 
                stroke="var(--color-inProgress)" 
                fill="var(--color-inProgress)" 
                fillOpacity={0.6}
              />
            </AreaChart>
          </ChartContainer>
        </Card>

        {/* Category Distribution Pie Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Tickets by Category</h3>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </Card>

        {/* Priority Distribution Bar Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Priority Distribution</h3>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </Card>

        {/* Performance Metrics Composed Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ComposedChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar yAxisId="left" dataKey="avgResolutionTime" fill="#8884d8" name="Avg Resolution (hrs)" />
              <Line yAxisId="right" type="monotone" dataKey="slaCompliance" stroke="#82ca9d" name="SLA Compliance %" />
              <Line yAxisId="right" type="monotone" dataKey="customerSatisfaction" stroke="#ffc658" name="Customer Satisfaction %" />
            </ComposedChart>
          </ChartContainer>
        </Card>
      </div>

      {/* Predictive Alerts Panel */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Predictive Alerts</h3>
        <div className="space-y-3">
          {alerts.map((alert, index) => {
            const IconComponent = alert.icon;
            return (
              <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${
                alert.type === 'critical' ? 'bg-red-50 border border-red-200' : 'bg-yellow-50 border border-yellow-200'
              }`}>
                <IconComponent className={`h-5 w-5 ${
                  alert.type === 'critical' ? 'text-red-600' : 'text-yellow-600'
                }`} />
                <span className="text-sm">{alert.message}</span>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Database className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Unified Ingested Tickets</h2>
          </div>
          <div className="flex items-center gap-4">
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="GLPI">GLPI</SelectItem>
                <SelectItem value="Solman">Solman</SelectItem>
                <SelectItem value="Email">Email</SelectItem>
                <SelectItem value="Manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading tickets...</div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{ticket.title}</div>
                        {ticket.aiRouted && (
                          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Bot className="h-3 w-3" />
                            AI-Routed
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getSourceColor(ticket.source)}>
                        {ticket.source}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{ticket.priority}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{ticket.assignedTeam}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
}
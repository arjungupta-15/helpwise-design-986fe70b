import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getTickets } from "@/lib/api";
import { Ticket } from "@/types";
import { useAuthStore } from "@/store/auth";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Star, TrendingUp, Clock, Target } from "lucide-react";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend, 
  ChartLegendContent 
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

// Chart configuration for employee dashboard
const chartConfig = {
  tickets: {
    label: "Tickets",
    color: "hsl(var(--chart-1))",
  },
  resolved: {
    label: "Resolved",
    color: "hsl(var(--chart-2))",
  },
  open: {
    label: "Open",
    color: "hsl(var(--chart-3))",
  },
  resolutionTime: {
    label: "Resolution Time (hrs)",
    color: "hsl(var(--chart-4))",
  },
};

// Generate personal performance trend data
const generatePersonalTrendData = (tickets: Ticket[]) => {
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      created: Math.floor(Math.random() * 3) + 1,
      resolved: Math.floor(Math.random() * 2) + 1,
      resolutionTime: Math.floor(Math.random() * 10) + 5, // hours
    };
  });
  return last30Days.filter((_, index) => index % 3 === 0); // Show every 3rd day for readability
};

// Generate category breakdown data for employee
const generateEmployeeCategoryData = (tickets: Ticket[]) => {
  const categories = [
    { name: 'Password Reset', value: 8, fill: '#8884d8' },
    { name: 'Software Issues', value: 12, fill: '#82ca9d' },
    { name: 'Hardware Problems', value: 5, fill: '#ffc658' },
    { name: 'Network Issues', value: 3, fill: '#ff7300' },
    { name: 'Email Problems', value: 7, fill: '#00ff88' },
  ];
  return categories;
};

// Generate resolution time comparison data
const generateResolutionTimeData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map(month => ({
    month,
    myAverage: Math.floor(Math.random() * 5) + 8, // 8-13 hours
    teamAverage: Math.floor(Math.random() * 8) + 10, // 10-18 hours
    target: 12, // 12 hour target
  }));
};

// Generate weekly productivity data
const generateWeeklyProductivityData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  return days.map(day => ({
    day,
    ticketsResolved: Math.floor(Math.random() * 5) + 2,
    hoursWorked: Math.floor(Math.random() * 3) + 6,
    efficiency: Math.floor(Math.random() * 20) + 80, // 80-100%
  }));
};

export default function EmployeeDashboard() {
  const { user } = useAuthStore();
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [quickPollAnswer, setQuickPollAnswer] = useState<string>("");

  const { data: ticketsData, isLoading } = useQuery<Ticket[]>({
    queryKey: ["tickets", "employee", user?.id],
    queryFn: () => getTickets({ role: "employee", userId: user?.id }),
  });

  const tickets = ticketsData || [];
  const myOpenTickets = tickets.filter(t => t.status === 'open').length;
  const myResolvedTickets = tickets.filter(t => t.status === 'resolved').length;

  // Personal analytics
  const categoryCount = useMemo(() => {
    const counts: Record<string, number> = {};
    tickets.forEach(ticket => {
      counts[ticket.category] = (counts[ticket.category] || 0) + 1;
    });
    return Object.entries(counts).sort(([,a], [,b]) => b - a)[0] || ['N/A', 0];
  }, [tickets]);

  const avgResolutionTime = useMemo(() => {
    const resolvedTickets = tickets.filter(t => t.status === 'resolved');
    if (resolvedTickets.length === 0) return 0;
    
    const totalHours = resolvedTickets.reduce((sum, ticket) => {
      const created = new Date(ticket.createdAt).getTime();
      const resolved = new Date().getTime(); // Mock resolved time
      return sum + ((resolved - created) / (1000 * 60 * 60));
    }, 0);
    
    return Math.round(totalHours / resolvedTickets.length);
  }, [tickets]);

  // Chart data
  const personalTrendData = generatePersonalTrendData(tickets);
  const categoryData = generateEmployeeCategoryData(tickets);
  const resolutionTimeData = generateResolutionTimeData();
  const weeklyProductivityData = generateWeeklyProductivityData();

  const handleFeedbackSubmit = () => {
    console.log('Feedback submitted:', feedbackRating);
    setFeedbackRating(0);
  };

  const handleQuickPollSubmit = () => {
    console.log('Quick poll answer:', quickPollAnswer);
    setQuickPollAnswer("");
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user?.id || 'Employee'}!</h1>
        <p className="text-muted-foreground">Your personal helpdesk dashboard</p>
      </div>

      {/* Personal Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">My Open Tickets</p>
              <h3 className="text-3xl font-bold mt-2">{myOpenTickets}</h3>
            </div>
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <Clock className="h-6 w-6" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">My Resolved</p>
              <h3 className="text-3xl font-bold mt-2">{myResolvedTickets}</h3>
            </div>
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <Target className="h-6 w-6" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Top Category</p>
              <h3 className="text-lg font-bold mt-2">{categoryCount[0]}</h3>
              <p className="text-sm text-muted-foreground">{categoryCount[1]} tickets</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Resolution</p>
              <h3 className="text-3xl font-bold mt-2">{avgResolutionTime}h</h3>
            </div>
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <Clock className="h-6 w-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Performance Trend */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">My Ticket Activity (Last 30 Days)</h3>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <LineChart data={personalTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line 
                type="monotone" 
                dataKey="created" 
                stroke="var(--color-tickets)" 
                strokeWidth={2}
                dot={{ fill: "var(--color-tickets)" }}
                name="Tickets Created"
              />
              <Line 
                type="monotone" 
                dataKey="resolved" 
                stroke="var(--color-resolved)" 
                strokeWidth={2}
                dot={{ fill: "var(--color-resolved)" }}
                name="Tickets Resolved"
              />
            </LineChart>
          </ChartContainer>
        </Card>

        {/* Category Breakdown Pie Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">My Tickets by Category</h3>
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

        {/* Resolution Time Comparison */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Resolution Time vs Team Average</h3>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <AreaChart data={resolutionTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Area 
                type="monotone" 
                dataKey="teamAverage" 
                stackId="1" 
                stroke="#ffc658" 
                fill="#ffc658" 
                fillOpacity={0.3}
                name="Team Average"
              />
              <Area 
                type="monotone" 
                dataKey="myAverage" 
                stackId="2" 
                stroke="var(--color-resolved)" 
                fill="var(--color-resolved)" 
                fillOpacity={0.6}
                name="My Average"
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#ff0000" 
                strokeDasharray="5 5"
                name="Target (12h)"
              />
            </AreaChart>
          </ChartContainer>
        </Card>

        {/* Weekly Productivity */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">This Week's Productivity</h3>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart data={weeklyProductivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar 
                dataKey="ticketsResolved" 
                fill="var(--color-resolved)" 
                radius={[4, 4, 0, 0]}
                name="Tickets Resolved"
              />
            </BarChart>
          </ChartContainer>
        </Card>
      </div>

      {/* Feedback & Quick Poll */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Rate Your Last Resolution Experience</h3>
          <div className="flex items-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setFeedbackRating(star)}
                className={`p-1 ${star <= feedbackRating ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                <Star className="h-6 w-6 fill-current" />
              </button>
            ))}
          </div>
          <Button onClick={handleFeedbackSubmit} disabled={feedbackRating === 0}>
            Submit Feedback
          </Button>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Poll</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Are you satisfied with the current ticket resolution process?
          </p>
          <div className="space-y-2 mb-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="poll"
                value="yes"
                checked={quickPollAnswer === "yes"}
                onChange={(e) => setQuickPollAnswer(e.target.value)}
                className="mr-2"
              />
              Yes, very satisfied
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="poll"
                value="no"
                checked={quickPollAnswer === "no"}
                onChange={(e) => setQuickPollAnswer(e.target.value)}
                className="mr-2"
              />
              No, needs improvement
            </label>
          </div>
          <Button onClick={handleQuickPollSubmit} disabled={!quickPollAnswer}>
            Submit Poll
          </Button>
        </Card>
      </div>

      {/* Calendar Integration */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Schedule Follow-up</h3>
        <div className="flex items-center gap-4">
          <Calendar className="h-8 w-8 text-primary" />
          <div>
            <p className="font-medium">Need to schedule a follow-up meeting?</p>
            <p className="text-sm text-muted-foreground">
              Click here to book time with your IT support team
            </p>
          </div>
          <Button variant="outline">
            Schedule Meeting
          </Button>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">My Recent Activity</h3>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.slice(0, 5).map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell>{ticket.title}</TableCell>
                  <TableCell>
                    <Badge variant={ticket.status === 'resolved' ? 'default' : 'secondary'}>
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{ticket.priority}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
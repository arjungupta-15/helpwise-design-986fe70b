import { Card } from "@/components/ui/card";
import { Ticket, CheckCircle2, Clock, TrendingUp, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
const stats = [
  {
    title: "Total Tickets",
    value: "1,234",
    change: "+12%",
    icon: Ticket,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Open Tickets",
    value: "89",
    change: "-5%",
    icon: AlertCircle,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    title: "Resolved Tickets",
    value: "1,089",
    change: "+18%",
    icon: CheckCircle2,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Avg. Resolution Time",
    value: "4.2h",
    change: "-8%",
    icon: Clock,
    color: "text-accent-foreground",
    bgColor: "bg-accent",
  },
];

const recentTickets = [
  {
    id: "TKT-1089",
    title: "Cannot access VPN",
    category: "VPN",
    priority: "High",
    status: "In Progress",
    assignee: "IT Team A",
    time: "10 mins ago",
  },
  {
    id: "TKT-1088",
    title: "Password reset request",
    category: "Password",
    priority: "Medium",
    status: "Open",
    assignee: "IT Team B",
    time: "25 mins ago",
  },
  {
    id: "TKT-1087",
    title: "Software installation - Adobe CC",
    category: "Software",
    priority: "Low",
    status: "Resolved",
    assignee: "IT Team A",
    time: "1 hour ago",
  },
];

const getPriorityColor = (priority: string) => {
  const colors = {
    Critical: "bg-destructive/10 text-destructive border-destructive/20",
    High: "bg-warning/10 text-warning border-warning/20",
    Medium: "bg-primary/10 text-primary border-primary/20",
    Low: "bg-success/10 text-success border-success/20",
  };
  return colors[priority as keyof typeof colors] || colors.Low;
};

const getStatusColor = (status: string) => {
  const colors = {
    Open: "bg-primary/10 text-primary border-primary/20",
    "In Progress": "bg-warning/10 text-warning border-warning/20",
    Resolved: "bg-success/10 text-success border-success/20",
    Closed: "bg-muted text-muted-foreground border-border",
  };
  return colors[status as keyof typeof colors] || colors.Open;
};

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your tickets today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="p-6 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium text-success">{stat.change}</span>
                  <span className="text-sm text-muted-foreground">vs last month</span>
                </div>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Tickets */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Recent Tickets</h2>
          <Link to="/my-tickets" className="text-sm text-primary hover:underline font-medium">
            View all
          </Link>
        </div>

        <div className="space-y-4">
          {recentTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-sm text-muted-foreground">
                    {ticket.id}
                  </span>
                  <h3 className="font-semibold">{ticket.title}</h3>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{ticket.category}</span>
                  <span>•</span>
                  <span>{ticket.assignee}</span>
                  <span>•</span>
                  <span>{ticket.time}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                  {ticket.priority}
                </Badge>
                <Badge variant="outline" className={getStatusColor(ticket.status)}>
                  {ticket.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

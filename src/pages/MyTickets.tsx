import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter } from "lucide-react";

const tickets = [
  {
    id: "TKT-1089",
    title: "Cannot access VPN",
    category: "VPN",
    status: "In Progress",
    priority: "High",
    assignee: "IT Team A",
    created: "2024-01-15",
  },
  {
    id: "TKT-1088",
    title: "Password reset request",
    category: "Password",
    status: "Open",
    priority: "Medium",
    assignee: "IT Team B",
    created: "2024-01-15",
  },
  {
    id: "TKT-1087",
    title: "Software installation - Adobe CC",
    category: "Software",
    status: "Resolved",
    priority: "Low",
    assignee: "IT Team A",
    created: "2024-01-14",
  },
  {
    id: "TKT-1086",
    title: "Network connectivity issues",
    category: "Network",
    status: "Open",
    priority: "Critical",
    assignee: "IT Team C",
    created: "2024-01-14",
  },
  {
    id: "TKT-1085",
    title: "Laptop hardware replacement",
    category: "Hardware",
    status: "Closed",
    priority: "Medium",
    assignee: "IT Team B",
    created: "2024-01-13",
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

export default function MyTickets() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">My Tickets</h1>
        <p className="text-muted-foreground">
          View and manage all your support tickets in one place.
        </p>
      </div>

      <Card className="p-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search tickets..." className="pl-10" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Ticket ID</TableHead>
                <TableHead className="font-semibold">Title</TableHead>
                <TableHead className="font-semibold">Category</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Priority</TableHead>
                <TableHead className="font-semibold">Assigned Team</TableHead>
                <TableHead className="font-semibold">Created Date</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id} className="hover:bg-accent/50">
                  <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
                  <TableCell className="font-medium">{ticket.title}</TableCell>
                  <TableCell>{ticket.category}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{ticket.assignee}</TableCell>
                  <TableCell>{ticket.created}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
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

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { TicketCheck, Clock, CheckCircle, Bot, Database } from "lucide-react";
import { useEffect, useState } from "react";
import { getTickets } from "@/lib/api";
import { Ticket } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const data = await getTickets();
      setTickets(data);
    } finally {
      setLoading(false);
    }
  };

  const filteredTickets = sourceFilter === "all" 
    ? tickets 
    : tickets.filter(t => t.source === sourceFilter);

  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status === 'open').length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;
  const aiRoutedTickets = tickets.filter(t => t.aiRouted).length;

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'GLPI': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Solman': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Email': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-700';
      case 'in_progress': return 'bg-yellow-100 text-yellow-700';
      case 'resolved': return 'bg-blue-100 text-blue-700';
      case 'closed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to Smart Helpdesk</h1>
        <p className="text-muted-foreground">
          AI-powered ticket management for POWERGRID IT Services
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Tickets</p>
              <h3 className="text-3xl font-bold mt-2">{totalTickets}</h3>
              <p className="text-sm mt-2 text-green-600">Active system</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <TicketCheck className="h-6 w-6" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Open Tickets</p>
              <h3 className="text-3xl font-bold mt-2">{openTickets}</h3>
              <p className="text-sm mt-2 text-muted-foreground">Pending resolution</p>
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
              <p className="text-sm mt-2 text-green-600">Successfully closed</p>
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
              <p className="text-sm mt-2 text-blue-600">Auto-assigned</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <Bot className="h-6 w-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Ingested Tickets Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Database className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Unified Ticket Ingestion</h2>
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
            <Link to="/my-tickets">
              <button className="text-primary hover:underline text-sm">
                View All Tickets
              </button>
            </Link>
          </div>
        </div>

        {loading ? (
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
                {filteredTickets.slice(0, 5).map((ticket) => (
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

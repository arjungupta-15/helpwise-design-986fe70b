import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, AlertTriangle, Bot, Database, MessageSquare, User, Zap, Brain, Target, TrendingUp, Activity, Shield, HardDrive, Wifi, Settings as SettingsIcon } from "lucide-react";
import { useState } from "react";

// Smart automation mock data - tickets with intelligent routing
const smartTickets = [
  {
    id: "TKT-001",
    title: "VPN connection timeout issues",
    description: "User unable to connect to company VPN, getting timeout errors",
    priority: "High",
    status: "Auto-Routed",
    source: "GLPI",
    department: "Network Team",
    confidence: 95,
    mlCategory: "Network Connectivity",
    nlpKeywords: ["vpn", "timeout", "connection", "network"],
    createdBy: "john.doe@company.com",
    createdAt: "2024-01-15 10:30",
    estimatedTime: "2 hours",
    automationStatus: "Processed",
    routingReason: "Keywords: VPN, timeout detected. Network category confidence: 95%"
  },
  {
    id: "TKT-002", 
    title: "Password reset for domain account",
    description: "Employee forgot domain password, needs immediate reset",
    priority: "Medium",
    status: "Auto-Routed",
    source: "Chatbot",
    department: "IT Support",
    confidence: 98,
    mlCategory: "Account Management",
    nlpKeywords: ["password", "reset", "domain", "account"],
    createdBy: "jane.smith@company.com",
    createdAt: "2024-01-15 09:15",
    estimatedTime: "30 mins",
    automationStatus: "Processed",
    routingReason: "Standard password reset pattern detected. High confidence routing."
  },
  {
    id: "TKT-003",
    title: "Laptop hardware malfunction - screen flickering",
    description: "Dell laptop screen flickering, possible hardware issue",
    priority: "Medium",
    status: "Auto-Routed",
    source: "Manual",
    department: "Hardware Team",
    confidence: 87,
    mlCategory: "Hardware Issue",
    nlpKeywords: ["laptop", "screen", "flickering", "hardware"],
    createdBy: "mike.johnson@company.com",
    createdAt: "2024-01-15 08:45",
    estimatedTime: "1.5 hours",
    automationStatus: "Processed",
    routingReason: "Hardware keywords detected. Screen issue pattern matched."
  },
  {
    id: "TKT-004",
    title: "Suspicious email attachment blocked",
    description: "Security system blocked suspicious attachment, need investigation",
    priority: "Critical",
    status: "Auto-Routed",
    source: "Solman",
    department: "Security Team",
    confidence: 99,
    mlCategory: "Security Incident",
    nlpKeywords: ["suspicious", "email", "attachment", "security"],
    createdBy: "security.system@company.com",
    createdAt: "2024-01-15 11:20",
    estimatedTime: "3 hours",
    automationStatus: "Processed",
    routingReason: "Security threat detected. Immediate routing to security team."
  },
  {
    id: "TKT-005",
    title: "Software installation request - Adobe Creative Suite",
    description: "Marketing team needs Adobe Creative Suite installed",
    priority: "Low",
    status: "Pending Review",
    source: "GLPI",
    department: "Software Team",
    confidence: 75,
    mlCategory: "Software Request",
    nlpKeywords: ["software", "installation", "adobe", "creative"],
    createdBy: "marketing@company.com",
    createdAt: "2024-01-15 07:30",
    estimatedTime: "1 hour",
    automationStatus: "Low Confidence",
    routingReason: "Software request detected but requires license verification."
  }
];

const departments = [
  { name: "Network Team", icon: Wifi, color: "bg-blue-500", tickets: 12, active: 8 },
  { name: "Hardware Team", icon: HardDrive, color: "bg-green-500", tickets: 8, active: 5 },
  { name: "IT Support", icon: User, color: "bg-purple-500", tickets: 15, active: 12 },
  { name: "Security Team", icon: Shield, color: "bg-red-500", tickets: 6, active: 4 },
  { name: "Software Team", icon: SettingsIcon, color: "bg-orange-500", tickets: 10, active: 7 }
];

const dataSources = [
  { name: "GLPI", status: "Active", tickets: 25, lastSync: "2 mins ago", icon: Database },
  { name: "Solman", status: "Active", tickets: 18, lastSync: "5 mins ago", icon: Database },
  { name: "Chatbot", status: "Active", tickets: 32, lastSync: "1 min ago", icon: Bot },
  { name: "Manual", status: "Active", tickets: 12, lastSync: "Just now", icon: MessageSquare }
];

export default function Manage() {
  const [tickets, setTickets] = useState(smartTickets);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("All");
  const [filterSource, setFilterSource] = useState("All");

  const updateTicketStatus = (ticketId: string, newStatus: string) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status: newStatus }
        : ticket
    ));
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === "All" || ticket.department === filterDepartment;
    const matchesSource = filterSource === "All" || ticket.source === filterSource;
    return matchesSearch && matchesDepartment && matchesSource;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-500";
      case "High": return "bg-orange-500";
      case "Medium": return "bg-yellow-500";
      case "Low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "GLPI": return <Database className="h-4 w-4" />;
      case "Solman": return <Database className="h-4 w-4" />;
      case "Chatbot": return <Bot className="h-4 w-4" />;
      case "Manual": return <MessageSquare className="h-4 w-4" />;
      default: return <Database className="h-4 w-4" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600";
    if (confidence >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Smart IT Management Hub</h1>
        <p className="text-muted-foreground">Intelligent routing, automation, and department-wise ticket management</p>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Smart Dashboard</TabsTrigger>
          <TabsTrigger value="routing">Intelligent Routing</TabsTrigger>
          <TabsTrigger value="departments">Department View</TabsTrigger>
          <TabsTrigger value="automation">Automation Status</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Data Sources Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dataSources.map((source) => {
              const IconComponent = source.icon;
              return (
                <Card key={source.name} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <IconComponent className="h-4 w-4" />
                        <span className="font-semibold">{source.name}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Tickets: {source.tickets}</p>
                      <p className="text-xs text-muted-foreground">Last sync: {source.lastSync}</p>
                    </div>
                    <Badge variant={source.status === "Active" ? "default" : "secondary"}>
                      {source.status}
                    </Badge>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Search and Filter Bar */}
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Input
                placeholder="Search smart-routed tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept.name} value={dept.name}>{dept.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterSource} onValueChange={setFilterSource}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Sources</SelectItem>
                <SelectItem value="GLPI">GLPI</SelectItem>
                <SelectItem value="Solman">Solman</SelectItem>
                <SelectItem value="Chatbot">Chatbot</SelectItem>
                <SelectItem value="Manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Smart Tickets List */}
          <div className="grid gap-4">
            {filteredTickets.map((ticket) => (
              <Card key={ticket.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{ticket.id}</span>
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(ticket.priority)}`}></div>
                      <Badge variant="outline">{ticket.priority}</Badge>
                      <div className="flex items-center gap-1">
                        {getSourceIcon(ticket.source)}
                        <span className="text-sm">{ticket.source}</span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">{ticket.department}</Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{ticket.title}</h3>
                    <p className="text-muted-foreground mb-2">{ticket.description}</p>
                    
                    {/* ML/NLP Information */}
                    <div className="bg-gray-50 p-3 rounded mb-2">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Brain className="h-4 w-4 text-purple-500" />
                          <span>ML Category: <strong>{ticket.mlCategory}</strong></span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="h-4 w-4 text-green-500" />
                          <span className={getConfidenceColor(ticket.confidence)}>
                            Confidence: <strong>{ticket.confidence}%</strong>
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        <strong>Routing Logic:</strong> {ticket.routingReason}
                      </p>
                      <div className="flex gap-1 mt-2">
                        {ticket.nlpKeywords.map(keyword => (
                          <Badge key={keyword} variant="secondary" className="text-xs">{keyword}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Created by: {ticket.createdBy}</span>
                      <span>Time: {ticket.createdAt}</span>
                      <span>Est: {ticket.estimatedTime}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    {ticket.status === "Auto-Routed" && (
                      <>
                        <Button 
                          size="sm" 
                          onClick={() => updateTicketStatus(ticket.id, "In Progress")}
                          className="w-40"
                        >
                          Accept & Start
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateTicketStatus(ticket.id, "Needs Review")}
                          className="w-40"
                        >
                          Request Review
                        </Button>
                      </>
                    )}
                    {ticket.status === "Pending Review" && (
                      <>
                        <Button 
                          size="sm" 
                          onClick={() => updateTicketStatus(ticket.id, "Auto-Routed")}
                          className="w-40 bg-blue-600 hover:bg-blue-700"
                        >
                          Approve Routing
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateTicketStatus(ticket.id, "Manual Review")}
                          className="w-40"
                        >
                          Manual Review
                        </Button>
                      </>
                    )}
                    {ticket.status === "In Progress" && (
                      <Button 
                        size="sm" 
                        onClick={() => updateTicketStatus(ticket.id, "Resolved")}
                        className="w-40 bg-green-600 hover:bg-green-700"
                      >
                        Mark Resolved
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="routing" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Intelligent Routing Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">94.2%</div>
                <p className="text-sm text-muted-foreground">Routing Accuracy</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">2.3s</div>
                <p className="text-sm text-muted-foreground">Avg Processing Time</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">87</div>
                <p className="text-sm text-muted-foreground">Tickets Today</p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">ML Model Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Network Issues</span>
                    <span className="text-sm font-medium">96%</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Account Management</span>
                    <span className="text-sm font-medium">98%</span>
                  </div>
                  <Progress value={98} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Hardware Issues</span>
                    <span className="text-sm font-medium">89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Security Incidents</span>
                    <span className="text-sm font-medium">99%</span>
                  </div>
                  <Progress value={99} className="h-2" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">NLP Keyword Analysis</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Most Common Keywords</span>
                  <Badge>Today</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">password (23)</Badge>
                  <Badge variant="secondary">network (18)</Badge>
                  <Badge variant="secondary">email (15)</Badge>
                  <Badge variant="secondary">vpn (12)</Badge>
                  <Badge variant="secondary">laptop (10)</Badge>
                  <Badge variant="secondary">software (8)</Badge>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => {
              const IconComponent = dept.icon;
              return (
                <Card key={dept.name} className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-full ${dept.color} text-white`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold">{dept.name}</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Tickets:</span>
                      <Badge>{dept.tickets}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Active Now:</span>
                      <Badge variant="secondary">{dept.active}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Auto-Routed:</span>
                      <Badge className="bg-green-500">{Math.floor(dept.tickets * 0.85)}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Avg Confidence:</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    View Department Queue
                  </Button>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">System Status</p>
                  <p className="text-lg font-bold">Online</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Auto-Routing</p>
                  <p className="text-lg font-bold">Active</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-muted-foreground">ML Processing</p>
                  <p className="text-lg font-bold">Running</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Efficiency</p>
                  <p className="text-lg font-bold">94.2%</p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Automation Rules & Settings</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded">
                <div>
                  <p className="font-medium">Auto-route Network tickets to Network Team</p>
                  <p className="text-sm text-muted-foreground">Confidence threshold: 85%</p>
                </div>
                <Badge>Active</Badge>
              </div>
              <div className="flex justify-between items-center p-3 border rounded">
                <div>
                  <p className="font-medium">Security incidents to Security Team immediately</p>
                  <p className="text-sm text-muted-foreground">Confidence threshold: 90%</p>
                </div>
                <Badge>Active</Badge>
              </div>
              <div className="flex justify-between items-center p-3 border rounded">
                <div>
                  <p className="font-medium">Password resets to IT Support</p>
                  <p className="text-sm text-muted-foreground">Confidence threshold: 95%</p>
                </div>
                <Badge>Active</Badge>
              </div>
              <div className="flex justify-between items-center p-3 border rounded">
                <div>
                  <p className="font-medium">Hardware issues to Hardware Team</p>
                  <p className="text-sm text-muted-foreground">Confidence threshold: 80%</p>
                </div>
                <Badge>Active</Badge>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
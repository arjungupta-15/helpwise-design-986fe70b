import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, ArrowRight } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "How to Reset Your Password",
    description: "Step-by-step guide to reset your account password securely.",
    category: "Password",
    tags: ["password", "security", "account"],
    views: 1234,
  },
  {
    id: 2,
    title: "VPN Setup Guide",
    description: "Complete instructions for setting up VPN on Windows and Mac.",
    category: "VPN",
    tags: ["vpn", "network", "setup"],
    views: 856,
  },
  {
    id: 3,
    title: "Network Troubleshooting",
    description: "Common network issues and how to resolve them quickly.",
    category: "Network",
    tags: ["network", "troubleshooting", "connectivity"],
    views: 642,
  },
  {
    id: 4,
    title: "Software Installation Request",
    description: "How to request and install approved software on company devices.",
    category: "Software",
    tags: ["software", "installation", "apps"],
    views: 521,
  },
  {
    id: 5,
    title: "Hardware Replacement Process",
    description: "Guidelines for requesting hardware repairs or replacements.",
    category: "Hardware",
    tags: ["hardware", "replacement", "devices"],
    views: 438,
  },
  {
    id: 6,
    title: "Email Configuration",
    description: "Set up your work email on mobile and desktop devices.",
    category: "Email",
    tags: ["email", "configuration", "setup"],
    views: 912,
  },
];

const categoryColors = {
  Password: "bg-primary/10 text-primary border-primary/20",
  VPN: "bg-success/10 text-success border-success/20",
  Network: "bg-warning/10 text-warning border-warning/20",
  Software: "bg-accent text-accent-foreground border-border",
  Hardware: "bg-destructive/10 text-destructive border-destructive/20",
  Email: "bg-primary/10 text-primary border-primary/20",
};

export default function KnowledgeBase() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Knowledge Base</h1>
        <p className="text-muted-foreground">
          Find answers to common questions and learn how to resolve issues.
        </p>
      </div>

      {/* Search */}
      <Card className="p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search articles, guides, and solutions..."
            className="pl-12 h-14 text-base"
          />
        </div>
      </Card>

      {/* Popular Tags */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground mr-2">Popular:</span>
        {["VPN", "Password", "Network", "Software", "Hardware"].map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Card
            key={article.id}
            className="p-6 hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <Badge
                variant="outline"
                className={categoryColors[article.category]}
              >
                {article.category}
              </Badge>
            </div>

            <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
              {article.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {article.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {article.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                <span className="text-sm font-medium">Read</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-4 text-xs text-muted-foreground">
              {article.views} views
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

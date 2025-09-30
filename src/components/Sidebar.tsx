import { NavLink } from "react-router-dom";
import { LayoutDashboard, Ticket, Plus, BookOpen, Settings, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/my-tickets", icon: Ticket, label: "My Tickets" },
  { to: "/create-ticket", icon: Plus, label: "Create Ticket" },
  { to: "/knowledge-base", icon: BookOpen, label: "Knowledge Base" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 h-screen flex-shrink-0 overflow-y-auto bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border sticky top-0">
      <div className="p-6 flex items-center gap-3 border-b border-sidebar-border">
        <img src={logo} alt="Helpdesk Logo" className="w-10 h-10" />
        <div>
          <h1 className="font-bold text-lg">Smart Helpdesk</h1>
          <p className="text-xs text-sidebar-foreground/70">AI-Powered Support</p>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                    "hover:bg-sidebar-accent",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                      : "text-sidebar-foreground/80"
                  )
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-4 py-3 bg-sidebar-accent rounded-lg">
          <Headphones className="w-5 h-5 text-sidebar-primary" />
          <div className="text-sm">
            <p className="font-medium">Need Help?</p>
            <p className="text-xs text-sidebar-foreground/70">Contact Support</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

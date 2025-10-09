import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/DashboardLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateTicket from "./pages/CreateTicket";
import MyTickets from "./pages/MyTickets";
import KnowledgeBase from "./pages/KnowledgeBase";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ITDashboard from "./pages/ITDashboard";
import Manage from "./pages/Manage";
import Analytics from "./pages/Analytics";
import { RoleGuard } from "./components/RoleGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route
              path="employee-dashboard"
              element={
                <RoleGuard allow={["employee", "it"]}>
                  <EmployeeDashboard />
                </RoleGuard>
              }
            />
            <Route
              path="it-dashboard"
              element={
                <RoleGuard allow={["it"]}>
                  <ITDashboard />
                </RoleGuard>
              }
            />
            <Route
              path="manage"
              element={
                <RoleGuard allow={["it"]}>
                  <Manage />
                </RoleGuard>
              }
            />
            <Route path="analytics" element={<Analytics />} />
            <Route 
              path="create-ticket" 
              element={
                <RoleGuard allow={["employee"]}>
                  <CreateTicket />
                </RoleGuard>
              } 
            />
            <Route path="my-tickets" element={<MyTickets />} />
            <Route path="knowledge-base" element={<KnowledgeBase />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

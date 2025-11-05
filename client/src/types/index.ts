export type TicketSource = 'GLPI' | 'Solman' | 'Email' | 'Manual';
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';
export type TicketCategory = 'password' | 'vpn' | 'network' | 'software' | 'hardware' | 'other';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  source: TicketSource;
  assignedTeam: string;
  aiRouted: boolean;
  aiClassified: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface KBArticle {
  id: string;
  title: string;
  description: string;
  category: TicketCategory;
  tags: string[];
  steps: string[];
  views: number;
  trending: boolean;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
  suggestions?: string[];
  kbArticles?: KBArticle[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  authenticated: boolean;
}

export interface AlertSettings {
  emailAlerts: boolean;
  smsAlerts: boolean;
  pushNotifications: boolean;
  alertEvents: string[];
}

export interface IngestionSettings {
  autoSync: boolean;
  sources: {
    glpi: boolean;
    solman: boolean;
    email: boolean;
  };
}

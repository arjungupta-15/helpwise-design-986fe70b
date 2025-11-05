import { Ticket, KBArticle, ChatMessage, TicketCategory, TicketPriority } from '@/types';

// Mock data
const mockTickets: Ticket[] = [
  {
    id: 'TKT-1001',
    title: 'VPN Connection Issues',
    description: 'Unable to connect to VPN from home network',
    category: 'vpn',
    priority: 'high',
    status: 'open',
    source: 'GLPI',
    assignedTeam: 'Network Team',
    aiRouted: true,
    aiClassified: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    userId: 'user-1'
  },
  {
    id: 'TKT-1002',
    title: 'Password Reset Request',
    description: 'Need to reset my email password',
    category: 'password',
    priority: 'medium',
    status: 'in_progress',
    source: 'Email',
    assignedTeam: 'IT Support',
    aiRouted: true,
    aiClassified: true,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    userId: 'user-2'
  },
  {
    id: 'TKT-1003',
    title: 'Software Installation - AutoCAD',
    description: 'Need AutoCAD 2024 installed on workstation',
    category: 'software',
    priority: 'low',
    status: 'resolved',
    source: 'Solman',
    assignedTeam: 'Software Team',
    aiRouted: true,
    aiClassified: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    userId: 'user-3'
  },
  {
    id: 'TKT-1004',
    title: 'Network Printer Not Working',
    description: 'Cannot print to floor 3 printer',
    category: 'hardware',
    priority: 'medium',
    status: 'open',
    source: 'Manual',
    assignedTeam: 'Hardware Team',
    aiRouted: false,
    aiClassified: false,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    userId: 'user-1'
  },
  {
    id: 'TKT-1005',
    title: 'Internet Connectivity Problems',
    description: 'Slow internet speed in department',
    category: 'network',
    priority: 'critical',
    status: 'in_progress',
    source: 'GLPI',
    assignedTeam: 'Network Team',
    aiRouted: true,
    aiClassified: true,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    userId: 'user-4'
  }
];

const mockKBArticles: KBArticle[] = [
  {
    id: 'KB-001',
    title: 'How to Reset Your Password',
    description: 'Step-by-step guide to reset your POWERGRID account password',
    category: 'password',
    tags: ['password', 'security', 'account'],
    steps: [
      'Go to the login page',
      'Click on "Forgot Password" link',
      'Enter your registered email address',
      'Check your email for reset link',
      'Click the link and create new password',
      'Login with your new password'
    ],
    views: 1245,
    trending: true
  },
  {
    id: 'KB-002',
    title: 'VPN Setup Guide',
    description: 'Complete guide to set up and troubleshoot VPN connection',
    category: 'vpn',
    tags: ['vpn', 'remote access', 'network'],
    steps: [
      'Download VPN client from IT portal',
      'Install the VPN client',
      'Open VPN client and enter server address',
      'Use your POWERGRID credentials',
      'Connect to VPN',
      'If connection fails, check firewall settings'
    ],
    views: 892,
    trending: true
  },
  {
    id: 'KB-003',
    title: 'Software Installation Request Process',
    description: 'How to request new software installation',
    category: 'software',
    tags: ['software', 'installation', 'request'],
    steps: [
      'Create a ticket with software name',
      'Provide business justification',
      'Wait for manager approval',
      'IT will schedule installation',
      'Software will be installed within 2-3 days'
    ],
    views: 456,
    trending: false
  },
  {
    id: 'KB-004',
    title: 'Network Printer Configuration',
    description: 'How to add and configure network printers',
    category: 'hardware',
    tags: ['printer', 'hardware', 'network'],
    steps: [
      'Go to Settings > Devices > Printers',
      'Click "Add Printer"',
      'Select network printer from list',
      'Install printer drivers if prompted',
      'Set as default if needed',
      'Test print a page'
    ],
    views: 678,
    trending: false
  },
  {
    id: 'KB-005',
    title: 'Troubleshooting Slow Internet',
    description: 'Steps to diagnose and fix slow internet issues',
    category: 'network',
    tags: ['network', 'internet', 'troubleshooting'],
    steps: [
      'Check if other users are affected',
      'Restart your computer',
      'Check network cable connections',
      'Run speed test',
      'Clear browser cache',
      'Contact IT if issue persists'
    ],
    views: 1034,
    trending: true
  }
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API Functions
export const getTickets = async (params?: { role?: 'employee' | 'it'; userId?: string }): Promise<Ticket[]> => {
  await delay(500);
  const all = [...mockTickets];
  if (params?.role === 'employee') {
    const uid = params.userId || 'user-1';
    return all.filter(t => t.userId === uid);
  }
  return all;
};

export const getTicketById = async (id: string): Promise<Ticket | null> => {
  await delay(300);
  return mockTickets.find(t => t.id === id) || null;
};

export const createTicket = async (data: Partial<Ticket>): Promise<Ticket> => {
  await delay(800);
  
  const newTicket: Ticket = {
    id: `TKT-${1000 + mockTickets.length + 1}`,
    title: data.title || '',
    description: data.description || '',
    category: data.category || 'other',
    priority: data.priority || 'medium',
    status: 'open',
    source: 'Manual',
    assignedTeam: data.assignedTeam || 'IT Support',
    aiRouted: data.aiRouted || false,
    aiClassified: data.aiClassified || false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: 'user-1'
  };
  
  mockTickets.unshift(newTicket);
  return newTicket;
};

export const classifyTicket = async (description: string): Promise<{ category: TicketCategory; priority: TicketPriority; assignedTeam: string }> => {
  await delay(1000); // Simulate AI processing
  
  const lowerDesc = description.toLowerCase();
  
  // AI Classification Logic
  let category: TicketCategory = 'other';
  let priority: TicketPriority = 'medium';
  let assignedTeam = 'IT Support';
  
  if (lowerDesc.includes('password') || lowerDesc.includes('login') || lowerDesc.includes('account')) {
    category = 'password';
    priority = 'high';
    assignedTeam = 'IT Support';
  } else if (lowerDesc.includes('vpn') || lowerDesc.includes('remote')) {
    category = 'vpn';
    priority = 'high';
    assignedTeam = 'Network Team';
  } else if (lowerDesc.includes('network') || lowerDesc.includes('internet') || lowerDesc.includes('wifi')) {
    category = 'network';
    priority = lowerDesc.includes('down') || lowerDesc.includes('not working') ? 'critical' : 'high';
    assignedTeam = 'Network Team';
  } else if (lowerDesc.includes('software') || lowerDesc.includes('application') || lowerDesc.includes('install')) {
    category = 'software';
    priority = 'low';
    assignedTeam = 'Software Team';
  } else if (lowerDesc.includes('hardware') || lowerDesc.includes('printer') || lowerDesc.includes('keyboard') || lowerDesc.includes('mouse')) {
    category = 'hardware';
    priority = 'medium';
    assignedTeam = 'Hardware Team';
  }
  
  return { category, priority, assignedTeam };
};

export const getKBArticles = async (): Promise<KBArticle[]> => {
  await delay(400);
  return [...mockKBArticles];
};

// ---------------- Ingestion: connectors, summary, sync logs, alerts ----------------
type ConnectorStatus = 'online' | 'offline' | 'degraded';

interface ConnectorHealth {
  name: 'GLPI' | 'SAP Solman' | 'Email (IMAP)';
  status: ConnectorStatus;
  lastSync: string;
  successes: number;
  failures: number;
}

interface SourceSummaryEntry {
  name: 'GLPI' | 'Solman' | 'Email';
  new: number;
  open: number;
  resolved: number;
  queue: number;
}

interface SyncLogEntry {
  time: string;
  source: 'Email' | 'GLPI' | 'Solman';
  items: number;
  status: ConnectorStatus;
  duration: string;
}

interface IngestionAlert {
  id: string;
  source: 'GLPI' | 'Solman' | 'Email';
  level: 'info' | 'warning' | 'error';
  message: string;
}

let mockConnectors: ConnectorHealth[] = [
  { name: 'GLPI', status: 'online', lastSync: 'Today 10:12', successes: 154, failures: 2 },
  { name: 'SAP Solman', status: 'degraded', lastSync: 'Today 09:55', successes: 89, failures: 7 },
  { name: 'Email (IMAP)', status: 'online', lastSync: 'Today 10:20', successes: 231, failures: 1 },
];

let mockSourceSummary: SourceSummaryEntry[] = [
  { name: 'GLPI', new: 18, open: 120, resolved: 45, queue: 7 },
  { name: 'Solman', new: 11, open: 86, resolved: 34, queue: 12 },
  { name: 'Email', new: 27, open: 73, resolved: 29, queue: 5 },
];

let mockSyncLogs: SyncLogEntry[] = [
  { time: '10:20', source: 'Email', items: 32, status: 'online', duration: '3.4s' },
  { time: '10:12', source: 'GLPI', items: 21, status: 'online', duration: '2.1s' },
  { time: '09:55', source: 'Solman', items: 17, status: 'degraded', duration: '7.8s' },
  { time: '09:35', source: 'Email', items: 28, status: 'online', duration: '3.2s' },
];

let mockAlerts: IngestionAlert[] = [
  { id: 'alert-1', source: 'Solman', level: 'warning', message: 'API rate limited – retries scheduled' },
];

export const getConnectorHealth = async (): Promise<ConnectorHealth[]> => {
  try {
    const res = await fetch('http://localhost:3001/api/connectors');
    if (!res.ok) throw new Error('Failed');
    return await res.json();
  } catch (e) {
    await delay(300);
    return [...mockConnectors];
  }
};

export const getSourceSummary = async (): Promise<SourceSummaryEntry[]> => {
  try {
    const res = await fetch('http://localhost:3001/api/source-summary');
    if (!res.ok) throw new Error('Failed');
    return await res.json();
  } catch (e) {
    await delay(300);
    return [...mockSourceSummary];
  }
};

export const getSyncHistory = async (): Promise<SyncLogEntry[]> => {
  try {
    const res = await fetch('http://localhost:3001/api/sync-logs');
    if (!res.ok) throw new Error('Failed');
    return await res.json();
  } catch (e) {
    await delay(300);
    return [...mockSyncLogs];
  }
};

export const getIngestionAlerts = async (): Promise<IngestionAlert[]> => {
  try {
    const res = await fetch('http://localhost:3001/api/alerts');
    if (!res.ok) throw new Error('Failed');
    return await res.json();
  } catch (e) {
    await delay(200);
    return [...mockAlerts];
  }
};

export const resyncConnector = async (source: 'GLPI' | 'Solman' | 'Email'): Promise<{ success: boolean; itemsProcessed: number }> => {
  try {
    const res = await fetch('http://localhost:3001/api/resync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source }),
    });
    if (!res.ok) throw new Error('Failed');
    return await res.json();
  } catch (e) {
    // Fallback to mock mutation
    await delay(800);
    const items = Math.floor(Math.random() * 25) + 5;
    const status: ConnectorStatus = source === 'Solman' ? 'degraded' : 'online';
    const now = new Date();
    const hhmm = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    mockSyncLogs.unshift({ time: hhmm, source, items, status, duration: `${(Math.random() * 5 + 1).toFixed(1)}s` });
    mockConnectors = mockConnectors.map(c => {
      if ((source === 'GLPI' && c.name === 'GLPI') || (source === 'Solman' && c.name === 'SAP Solman') || (source === 'Email' && c.name === 'Email (IMAP)')) {
        return { ...c, lastSync: `Today ${hhmm}`, successes: c.successes + items, failures: c.failures + (status === 'online' ? 0 : 1), status };
      }
      return c;
    });
    const ssIndex = mockSourceSummary.findIndex(s => s.name.toLowerCase() === source.toLowerCase());
    if (ssIndex >= 0) {
      mockSourceSummary[ssIndex] = { ...mockSourceSummary[ssIndex], new: mockSourceSummary[ssIndex].new + Math.floor(items / 3), queue: Math.max(0, mockSourceSummary[ssIndex].queue - Math.floor(items / 4)) };
    }
    return { success: true, itemsProcessed: items };
  }
};

import { retryWithBackoff } from '@/lib/utils';
export const retryAlert = async (source: 'GLPI' | 'Solman' | 'Email'): Promise<{ success: boolean }> => {
  try {
    const res = await retryWithBackoff(async () => {
      const r = await fetch('http://localhost:3001/api/alerts/retry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source }),
      });
      if (!r.ok) throw new Error('Failed');
      return r;
    });
    return await res.json();
  } catch (e) {
    // Fallback: clear mock alert locally
    mockAlerts = mockAlerts.filter(a => a.source !== source);
    return { success: true };
  }
};

export const getTrendingArticles = async (): Promise<KBArticle[]> => {
  await delay(300);
  return mockKBArticles.filter(a => a.trending);
};

export const searchKBArticles = async (query: string): Promise<KBArticle[]> => {
  await delay(400);
  const lowerQuery = query.toLowerCase();
  return mockKBArticles.filter(a => 
    a.title.toLowerCase().includes(lowerQuery) ||
    a.description.toLowerCase().includes(lowerQuery) ||
    a.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

export const sendChatMessage = async (message: string, history: ChatMessage[]): Promise<ChatMessage> => {
  await delay(1000);
  
  const lowerMsg = message.toLowerCase();
  let response = '';
  let suggestions: string[] = [];
  let kbArticles: KBArticle[] = [];
  
  // Self-service flows
  if (lowerMsg.includes('password') || lowerMsg.includes('reset')) {
    response = "I can help you reset your password! Here's what you need to do:\n\n1. Go to the login page\n2. Click 'Forgot Password'\n3. Enter your email\n4. Check your inbox for the reset link\n\nWould you like me to create a ticket for you, or can you try these steps?";
    suggestions = ['Create Ticket', 'I tried, still not working'];
    kbArticles = [mockKBArticles[0]];
  } else if (lowerMsg.includes('vpn')) {
    response = "Having VPN issues? Let me help:\n\n1. Check if VPN client is installed\n2. Verify your credentials\n3. Check firewall settings\n4. Try restarting VPN client\n\nIf the issue persists, I can create a ticket for the Network Team.";
    suggestions = ['Create VPN Ticket', 'Show VPN Setup Guide'];
    kbArticles = [mockKBArticles[1]];
  } else if (lowerMsg.includes('printer')) {
    response = "Printer not working? Here's a quick fix:\n\n1. Check if printer is online\n2. Restart the printer\n3. Check paper and ink levels\n4. Try printing a test page\n\nNeed me to route this to Hardware Team?";
    suggestions = ['Yes, create ticket', 'Show printer guide'];
    kbArticles = [mockKBArticles[3]];
  } else if (lowerMsg.includes('slow') || lowerMsg.includes('internet')) {
    response = "Experiencing slow internet? Try these quick fixes:\n\n1. Close unnecessary applications\n2. Clear browser cache\n3. Restart your computer\n4. Check if others are affected\n\nShall I create a ticket for the Network Team?";
    suggestions = ['Create Network Ticket', 'Show troubleshooting guide'];
    kbArticles = [mockKBArticles[4]];
  } else if (lowerMsg.includes('create ticket') || lowerMsg.includes('yes')) {
    const classified = await classifyTicket(history[history.length - 2]?.content || 'general issue');
    response = `✅ I've created ticket #TKT-${Math.floor(Math.random() * 9000) + 1000} for you!\n\n**Routed to:** ${classified.assignedTeam} (AI-powered routing)\n**Priority:** ${classified.priority.toUpperCase()}\n\nYou'll receive updates via email. Anything else I can help with?`;
    suggestions = ['Track my tickets', 'Ask another question'];
  } else {
    response = "I'm your POWERGRID IT assistant! I can help you with:\n\n• Password resets\n• VPN connection issues\n• Printer problems\n• Network issues\n• Software installation requests\n\nWhat do you need help with today?";
    suggestions = ['Reset Password', 'VPN Help', 'Printer Issue', 'Browse Knowledge Base'];
  }
  
  return {
    id: Date.now().toString(),
    content: response,
    sender: 'bot',
    timestamp: new Date().toISOString(),
    suggestions,
    kbArticles
  };
};

export const syncIngestion = async (): Promise<{ success: boolean; newTickets: number }> => {
  await delay(2000);
  return {
    success: true,
    newTickets: Math.floor(Math.random() * 10) + 1
  };
};

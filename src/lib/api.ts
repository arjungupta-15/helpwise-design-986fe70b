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
export const getTickets = async (): Promise<Ticket[]> => {
  await delay(500);
  return [...mockTickets];
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

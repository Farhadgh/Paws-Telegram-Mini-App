import { TelegramUser } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface AuthResponse {
  user: {
    id: string;
    telegramId: string;
    firstName: string;
    lastName?: string;
    username?: string;
  };
  token: string;
  type: string;
}

export const authenticateTelegram = async (initData: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/telegram/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Telegram-Init-Data': initData,
      },
    });

    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Telegram authentication error:', error);
    throw error;
  }
};

export const verifyToken = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.valid;
  } catch (error) {
    console.error('Token verification error:', error);
    return false;
  }
};

// Helper function to make authenticated API calls
export const fetchWithAuth = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
};

// Referral system API calls
export const getReferralCode = async (): Promise<string> => {
  const response = await fetchWithAuth('/referral/code');
  return response.code;
};

export const getReferralStats = async (): Promise<{
  totalReferrals: number;
  totalPointsEarned: number;
}> => {
  return await fetchWithAuth('/referral/stats');
};

export const processReferral = async (code: string): Promise<void> => {
  await fetchWithAuth('/referral/process', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });
};

export const shareReferralLink = async (): Promise<void> => {
  if (window.Telegram?.WebApp) {
    const code = await getReferralCode();
    const botUsername = process.env.NEXT_PUBLIC_BOT_USERNAME;
    const link = `https://t.me/${botUsername}?start=${code}`;
    
    // Use Telegram's built-in sharing functionality
    window.Telegram.WebApp.switchInlineQuery(code, ['users', 'groups', 'channels']);
  } else {
    throw new Error('Telegram WebApp is not available');
  }
};

// Task API calls
export interface Task {
  id: string;
  name: string;
  description: string;
  points: string;
  type: 'telegram' | 'twitter' | 'wallet' | 'invite' | 'partner';
  link: string;
  icon: string;
  isCompleted: boolean;
}

export interface TasksResponse {
  inGame: Task[];
  partners: Task[];
}

export const getTasks = async (): Promise<TasksResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/tasks`);
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }
  return response.json();
};

export const completeTask = async (taskId: string): Promise<{ message: string; points: string }> => {
  return await fetchWithAuth(`/api/tasks/${taskId}/complete`, {
    method: 'POST'
  });
};

export const openTaskLink = async (task: Task): Promise<void> => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.openTelegramLink(task.link);
  } else {
    window.open(task.link, '_blank');
  }
};

// utils/types.ts

/**
 * This project was developed by Nikandr Surkov.
 * 
 * YouTube: https://www.youtube.com/@NikandrSurkov
 * GitHub: https://github.com/nikandr-surkov
 */

// Component Props Types
export type IconProps = {
    size?: number;
    className?: string;
}

// Navigation Types
export type TabType = 'home' | 'leaderboard' | 'friends' | 'earn'  | 'game';

// Telegram Types
export interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
}

// API Response Types
export interface AuthResponse {
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

export interface ApiError {
    error: string;
    message?: string;
    status?: number;
}

// Game Types
export interface Task {
    id: string;
    name: string;
    description: string;
    points: number;
    type: 'telegram' | 'twitter' | 'wallet' | 'invite';
    link: string;
    icon: string;
    isCompleted: boolean;
    status: 'pending' | 'completed';
    completedAt?: string;
}

export interface LeaderboardEntry {
    id: string;
    telegramId: string;
    firstName: string;
    lastName?: string;
    username?: string;
    points: number;
    rank: number;
}

export interface GameState {
    currentScore: number;
    highScore: number;
    lastPlayed: string;
    achievements: Achievement[];
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    unlockedAt: string;
}

// User Profile Types
export interface UserProfile {
    id: string;
    telegramId: string;
    firstName: string;
    lastName?: string;
    username?: string;
    points: number;
    gamePoints: number;
    referralCode: string;
    referredBy?: string;
    completedTasks: CompletedTask[];
    createdAt: string;
    updatedAt: string;
}

export interface CompletedTask {
    taskId: string;
    completedAt: string;
}

// Referral System Types
export interface Referral {
    id: string;
    referrerId: string;
    referredId: string;
    points: number;
    percentage: number;
    createdAt: string;
}

export interface ReferralStats {
    totalReferrals: number;
    totalPointsEarned: number;
    activeReferrals: number;
}

export interface ReferralCode {
    code: string;
    userId: string;
    usageCount: number;
    createdAt: string;
}

export interface ReferredUser {
    id: string;
    telegramId: string;
    firstName: string;
    lastName?: string;
    username?: string;
    pointsEarned: number;
    joinedAt: string;
}

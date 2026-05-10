/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum ProjectStatus {
  PLANNING = 'PLANNING',
  IN_PROGRESS = 'IN_PROGRESS',
  ON_HOLD = 'ON_HOLD',
  COMPLETED = 'COMPLETED',
  DELAYED = 'DELAYED'
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface Project {
  id: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  progress: number; // 0-100
  budget: number;
  spent: number;
  manager: string;
}

export interface Task {
  id: string;
  projectId: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: TaskPriority;
  assignee: string;
  progress: number;
}

export interface Resource {
  id: string;
  type: 'HUMAN' | 'EQUIPMENT' | 'MATERIAL';
  name: string;
  unit: string;
  currentStock: number;
  totalAllocated: number;
  costPerUnit: number;
}

export interface DailyReport {
  id: string;
  date: string;
  projectId: string;
  weather: string;
  workersCount: number;
  activities: string[];
  issues: string[];
  photos: string[];
  recordedBy: string;
}

export interface CostItem {
  id: string;
  category: string;
  amount: number;
  date: string;
  description: string;
  type: 'EXPENSE' | 'INCOME';
}

export interface Risk {
  id: string;
  title: string;
  description: string;
  probability: 'LOW' | 'MEDIUM' | 'HIGH';
  impact: 'LOW' | 'MEDIUM' | 'HIGH';
  mitigation: string;
  status: 'OPEN' | 'MITIGATED' | 'CLOSED';
  aiAnalysis?: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
  version: string;
  tags: string[];
}

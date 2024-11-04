export interface Task {
  id: number;
  title: string;
  status: 'PENDING' | 'ONGOING' | 'COMPLETED';
  type: number;
  startDate: string;
  dueDate: string;
  amount?: number;
}

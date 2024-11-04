export interface Task {
  id: number;
  title: string;
  type: number;
  startDate: string;
  dueDate: string;
  amount?: number;
}

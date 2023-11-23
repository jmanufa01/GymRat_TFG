export interface Notification {
  id?: string;
  sender: string;
  receiver: string;
  message: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

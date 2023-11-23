export interface Notification {
  sender: string;
  receiver: string;
  message: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

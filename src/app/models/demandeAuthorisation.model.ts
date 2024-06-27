export interface DemandeAuthorisation {
  id: number;
  description: string;
  userId: number;
  apiId: number;
  startDate: Date;
  endDate: Date;
  approved: boolean;
  status: string; // "PENDING", "APPROVED", "REJECTED"
  username?: string; 
  apiName?: string; 
}

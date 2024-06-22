export interface DemandeAuthorisation {
  id: number;
  description: string;
  userId: number;
  apiId: number;
  startDate: Date;
  endDate: Date;
  approved: boolean;
  status: string; // "PENDING", "APPROVED", "REJECTED"
  username?: string; // The name of the user (optional)
  apiName?: string; // The name of the API (optional)
}

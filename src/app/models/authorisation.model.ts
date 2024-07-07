export interface Authorisation {
  authorisationId: number;
  userId: number;
  username: string;
  apiId: number;
  apiName: string; 
  startDate: Date;
  endDate: Date;
  status: boolean;
}

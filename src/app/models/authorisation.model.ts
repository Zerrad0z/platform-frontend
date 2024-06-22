export interface Authorisation {
  authorisationId: number;
  userId: number;
  username: string; // Add this property
  apiId: number;
  apiName: string; // Add this property
  startDate: Date;
  endDate: Date;
  status: boolean;
}

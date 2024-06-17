// src/app/models/authorisation.model.ts
export interface Authorisation {
  authorisationId: number;
  userId: number;
  apiId: number;
  startDate: string;
  endDate: string;
  status: boolean;
}

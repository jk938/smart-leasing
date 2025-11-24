export enum LeaseType {
  DirectLease = '直接租赁',
  SaleLeaseback = '售后回租'
}

export enum PaymentFrequency {
  Monthly = '按月支付',
  Quarterly = '按季支付',
  SemiAnnually = '半年支付',
  Annually = '按年支付'
}

export interface LeaseFormData {
  lessorName: string;
  lessorAddress: string;
  lesseeName: string;
  lesseeAddress: string;
  equipmentName: string;
  equipmentModel: string;
  equipmentValue: number;
  leaseTermMonths: number;
  totalRent: number;
  paymentFrequency: PaymentFrequency;
  leaseType: LeaseType;
  jurisdiction: string; // e.g., Shanghai, Beijing
  specialConditions: string;
}

export interface GeneratedContractResponse {
  contractMarkdown: string;
  optimizationAnalysis: string;
}

export interface LoadingStep {
  message: string;
  status: 'pending' | 'active' | 'completed';
}
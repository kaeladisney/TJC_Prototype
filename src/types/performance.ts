export type MetricType = 'currency' | 'percentage' | 'number';

export interface PerformanceMetric {
  id: string;
  title: string;
  type: MetricType;
  value: number;
  goal: number;
  trend: {
    percentage: number;
    isPositive: boolean;
  };
  comparisonPeriod: 'yesterday' | 'last month';
  color?: string;
}

export const defaultMetrics: PerformanceMetric[] = [
  {
    id: 'sales',
    title: 'Sales',
    type: 'currency',
    value: 8000,
    goal: 23000,
    trend: {
      percentage: 10.5,
      isPositive: true
    },
    comparisonPeriod: 'yesterday',
    color: '#024C6F'
  },
  {
    id: 'total-conversion',
    title: 'Total Conversion',
    type: 'percentage',
    value: 70,
    goal: 65,
    trend: {
      percentage: 11.2,
      isPositive: true
    },
    comparisonPeriod: 'yesterday',
    color: '#7E59F9'
  },
  {
    id: 'total-visits',
    title: 'Total Visits',
    type: 'number',
    value: 145,
    goal: 363,
    trend: {
      percentage: 11.2,
      isPositive: true
    },
    comparisonPeriod: 'yesterday',
    color: '#024C6F'
  },
  {
    id: 'attrition',
    title: 'Attrition',
    type: 'percentage',
    value: 5,
    goal: 10,
    trend: {
      percentage: 10.5,
      isPositive: true
    },
    comparisonPeriod: 'yesterday',
    color: '#F38C2D'
  },
  {
    id: 'digital-lead-conversions',
    title: 'Digital Lead Conversions',
    type: 'percentage',
    value: 0,
    goal: 50,
    trend: {
      percentage: 10,
      isPositive: false
    },
    comparisonPeriod: 'yesterday',
    color: '#024C6F'
  },
  {
    id: 'arb-collected',
    title: 'ARB Collected',
    type: 'currency',
    value: 22,
    goal: 500,
    trend: {
      percentage: 5,
      isPositive: false
    },
    comparisonPeriod: 'yesterday',
    color: '#024C6F'
  },
  {
    id: 'memberships',
    title: 'Memberships',
    type: 'number',
    value: 45,
    goal: 100,
    trend: {
      percentage: 8,
      isPositive: true
    },
    comparisonPeriod: 'yesterday'
  },
  {
    id: 'new-patients',
    title: 'New Patients',
    type: 'number',
    value: 12,
    goal: 30,
    trend: {
      percentage: 15,
      isPositive: true
    },
    comparisonPeriod: 'yesterday'
  },
  {
    id: 'packages',
    title: 'Packages',
    type: 'number',
    value: 8,
    goal: 20,
    trend: {
      percentage: 7,
      isPositive: false
    },
    comparisonPeriod: 'yesterday'
  }
]; 
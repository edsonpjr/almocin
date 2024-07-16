export interface ListItemProps {
  name: string;
  deleteBtnCallback: () => void;
  deleteDisabled?: boolean;
  editButtonCallback?: () => void;
  editDisabled?: boolean;
}

export interface BaseLayoutProps {
  titlePage: string;
  children: React.ReactNode;
}

export enum StatsFilter {
  ALL = 'all',
  MONTH = 'month',
  MONEY = 'money'
}

export interface StatsState {
  filter: StatsFilter;
  totalRevenue?: number;
  currentMonthRevenue?: number;
  totalOrders?: number;
  monthOrders?: number;
  averageTicket?: number;
  currentMonthAverageTicket?: number;
  totalUsers?: number;
  totalItems?: number;
  loading?: boolean;
  error?: boolean;
}

export interface StatsAction {
  type: string;
  payload?: Partial<StatsState>;
}

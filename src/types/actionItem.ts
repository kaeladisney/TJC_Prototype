export type ActionItemStatus = 'complete' | 'incomplete' | 'in_progress';

export interface ActionItem {
  id: string;
  name: string;
  status: ActionItemStatus;
  dueDate: string;
  dateCreated: string;
  dateModified: string;
  lastModifiedBy: string;
  patientId: string;
}

export interface ActionItemsState {
  selectedItems: string[];
  sortColumn: keyof ActionItem | null;
  sortDirection: 'asc' | 'desc';
  searchQuery: string;
  filters: {
    status?: ActionItemStatus[];
    dateRange?: {
      start: string;
      end: string;
    };
  };
  visibleColumns: (keyof ActionItem)[];
} 
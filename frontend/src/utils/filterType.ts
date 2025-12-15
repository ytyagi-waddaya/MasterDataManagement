

export type FilterType = "single" | "multi" | "date" | "dynamic";

export interface FilterOption<TValue> {
  value: TValue;
  label: string;
}

export interface TableFilter<TValue> {
  type: FilterType;
  columnId: string;
  title?: string;
  options?: FilterOption<TValue>[];       
  multi?: boolean;

  // for dynamic filters
  fetcher?: () => { data?: any[]; isLoading: boolean };
  labelKey?: string;
  valueKey?: string;
}

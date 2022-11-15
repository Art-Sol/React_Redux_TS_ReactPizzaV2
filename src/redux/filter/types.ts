export type SortTypeItem = {
  name: string;
  sortProp: string;
  order: string;
};

export interface IFilterSliceState {
  activeCategoryIndex: number;
  activeSortType: SortTypeItem;
  currentPage: number;
  searchValue?: string;
}

export type pagination = {
  page: number;
  limit: number;
  searchKeyword: string;
  setPage: (value: number) => void
  setLimit: (value: number) => void
  debouncedSearch: (value: string, time: number) => void
  setSearchKeyword: (value: string) => void
  handleDelete?: (value: string) => void
  handleEdit?: (value: string) => void
  handleAdd?: () => void
  handleView?: (value: any) => void
}

export type responsePage = {
  success: boolean
  data: any[]
  meta: {
    page: number
    totalData: number
    totalDataOnPage: number
    totalPage: number
  }
  message: string
  code: number
}

export type resultPage = {
  data: responsePage;
  isLoading: boolean;
  isError: boolean;
}

export type tableProps = {
  title: string;
  header: string[];
  result: resultPage;
  id?: string;
  props: pagination;
}
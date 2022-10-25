import { UseMutationResult } from "@tanstack/react-query";

export type pagination = {
  handleDelete?: (a: string, b: UseMutationResult) => void;
  handleEdit?: (value: string) => void;
  handleAdd?: () => void;
  handleView?: (value: any) => void;
};

export type responsePage = {
  success: boolean;
  data: any[];
  meta: {
    page: number;
    totalData: number;
    totalDataOnPage: number;
    totalPage: number;
  };
  message: string;
  code: number;
};

export type resultPage = {
  data: responsePage;
  isLoading: boolean;
  isError: boolean;
};

export type tableProps = {
  title: string;
  header: string[];
  result: any;
  id?: string;
  props: pagination;
};

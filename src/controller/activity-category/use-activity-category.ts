import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NextRouter } from "next/router";
import Swal from "sweetalert2";

import { deleteOneActivityCategoryAdmin, getAllActivityCategoryAdmin, getListActivityCategory, getListActivityCategoryAdmin, getOneActivityCategoryAdmin, patchOneActivityCategoryAdmin, postOneActivityCategoryAdmin } from "@/controller/activity-category/activity-category.service";
import { Toast, ToastTimer } from "@/helpers/utils/swal";

// Admin React Query Service
export const useGetListActivityCategoryAdmin = (token: string) => {
    return useQuery(
      ["list-activity-category-admin", token], 
      async () => await getListActivityCategoryAdmin(token), 
      {enabled: token ? true : false});
}

export const useGetAllActivityCategoryAdmin = (params, token: string) => {
    return useQuery(
      ["all-activity-category-admin", params, token], 
      async () => await getAllActivityCategoryAdmin(params, token), 
      {
        enabled: token ? true : false,
        retry: 2,
      });
};
export const useGetOneActivityCategoryAdmin = (params, token: string) => {
    return useQuery(
      ["one-activity-category-admin", params, token], 
      async () => await getOneActivityCategoryAdmin(params, token), 
      {
        enabled: params.id && token ? true : false,
        retry: 2,
      });
};
export const usePostOneActivityCategoryAdmin = (router: NextRouter, setLoading) => {
  const onMutate = async () => {
    setLoading(true);
  }
  const onError = async (err: any) => {
    setLoading(false)
    if (err.code == 500) return ToastTimer(Toast);
  }
  const onSuccess = async (response: any) => {
    const {data, code} = response;
    setLoading(false)
    if (code == 500) return ToastTimer(Toast);
    if (data) return router.isReady && router.push('/admin/activity/category');
  }
  return useMutation(postOneActivityCategoryAdmin, { onMutate, onError, onSuccess });
};
export const useDeleteOneActivityCategoryAdmin = () => {
  const queryClient = useQueryClient();
  const onError = async (err: any) => {
    if (err.code == 500) return ToastTimer(Toast);
  }
  const onSuccess = async (response: any) => {
    const {data, code} = response;
    if (code == 500) return ToastTimer(Toast);
    if (data) {
      queryClient.invalidateQueries({queryKey:['all-activity-category-admin']});
      return Swal.fire('Deleted!', `activity category ${data.name} has been deleted.`, 'success');
    }
  }
  return useMutation(deleteOneActivityCategoryAdmin, { onError, onSuccess }); 
};
export const usePatchOneActivityCategoryAdmin = (router: NextRouter, setLoading) => {
  const onMutate = async () => {
    setLoading(true);
  }
  const onError = async (err: any) => {
    setLoading(false);
    if (err.code == 500) return ToastTimer(Toast);
  }
  const onSuccess = async (response: any) => {
    const {data, code} = response;
    setLoading(false);
    if (code == 500) return ToastTimer(Toast);
    if (data) return router.isReady && router.push('/admin/activity/category');
  }
  return useMutation(patchOneActivityCategoryAdmin, { onMutate, onError, onSuccess }); 
}

// User React Query Service
export const useGetListActivityCategory = () => {
  return useQuery(
    ["list-activity-category"], 
    async () => await getListActivityCategory(), 
    {retry: 1});
}
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NextRouter } from "next/router";
import Swal from "sweetalert2";

import { deleteOneNewsCategoryAdmin, getAllNewsCategoryAdmin, getListNewsCategory, getListNewsCategoryAdmin, getOneNewsCategoryAdmin, patchOneNewsCategoryAdmin, postOneNewsCategoryAdmin } from "@/controller/news-category/news-category.service";
import { Toast, ToastTimer } from "@/helpers/utils/swal";

// Admin React Query Service
export const useGetListNewsCategoryAdmin = (token: string) => {
    return useQuery(
      ["list-news-category-admin", token], 
      async () => await getListNewsCategoryAdmin(token), 
      {
        enabled: token ? true : false
      });
}
export const useGetAllNewsCategoryAdmin = (params, token: string) => {
    return useQuery(
      ["all-news-category-admin", params, token], 
      async () => await getAllNewsCategoryAdmin(params, token), 
      {
        enabled: token ? true : false,
        retry: 2,
      });
};
export const useGetOneNewsCategoryAdmin = (params, token: string) => {
    return useQuery(
      ["one-news-category-admin", params, token], 
      async () => await getOneNewsCategoryAdmin(params, token), 
      {
        enabled: params.id && token ? true : false,
        retry: 2,
      });
};
export const usePostOneNewsCategoryAdmin = (router: NextRouter, setLoading) => {
  async function onMutate() {
    setLoading(true);
  }
  async function onError(err: any) {
    setLoading(false)
    if (err.code == 500) return ToastTimer(Toast);
  }
  async function onSuccess(response: any) {
    // muttion done with success response
    const {data, code} = response;
    setLoading(false)
    if (code == 500) return ToastTimer(Toast);
    if (data) return router.isReady && router.push('/admin/news/category');
  }
  return useMutation(postOneNewsCategoryAdmin, { onMutate, onError, onSuccess });
};
export const useDeleteOneNewsCategoryAdmin = () => {
  const queryClient = useQueryClient();
  async function onError(err: any) {
    if (err.code == 500) ToastTimer(Toast);
  }
  async function onSuccess(response: any) {
    // muttion done with success response
    const {data, code} = response;
    if (code == 500) return ToastTimer(Toast);
    if (data) {
      queryClient.invalidateQueries({queryKey:['all-news-category-admin']});
      return Swal.fire('Deleted!', `news category ${data.name} has been deleted.`, 'success');
    }
  }
  return useMutation(deleteOneNewsCategoryAdmin, { onError, onSuccess }); 
};
export const usePatchOneNewsCategoryAdmin = (router: NextRouter, setLoading) => {
  async function onMutate () {
    setLoading(true);
  }
  async function onError(err: any) {
    setLoading(false);    
    if (err.code == 500) return ToastTimer(Toast);
  }
  async function onSuccess(response: any) {    
    const {data, code} = response;
    setLoading(false);
    if (code == 500) ToastTimer(Toast);
    if (data) return router.isReady && router.push('/admin/news/category');
  }
  return useMutation(patchOneNewsCategoryAdmin, { onMutate, onError, onSuccess }); 
}

// User React Query Service
export const useGetListNewsCategory = () =>{
  return useQuery(
    ["list-news-category"], 
    async () => await getListNewsCategory(), 
    { retry: 1 });
}
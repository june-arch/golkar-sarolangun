import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NextRouter } from "next/router";
import Swal from 'sweetalert2';

import { deleteOneNewsAdmin, getAllNews, getAllNewsAdmin, getOneNews, getOneNewsAdmin, patchOneNewsAdmin, postOneNewsAdmin } from "@/controller/news/news.service";
import { Toast, ToastTimer } from "@/helpers/utils/swal";

// Admin React Query Service
export const useGetAllNewsAllAdmin = (params, token: string) => {
    return useQuery(
      ["all-news-admin", params, token], 
      async () => await getAllNewsAdmin(params, token), 
      {
        enabled: token ? true : false,
        retry: 2,
      })
    };
export const useGetOneNewsAdmin = (params, token: string) => {
    return useQuery(
      ["one-news-admin", params, token], 
      async () => await getOneNewsAdmin(params, token), 
      {
        enabled: params.id && token ? true : false,
        retry: 2,
      });
};
export const usePostOneNewsAdmin = (router: NextRouter, setLoading) => {
  async function onMutate() {
    setLoading(true);
  }
  async function onError(err: any) {
    setLoading(false)
    if (err.code == 500) return ToastTimer(Toast);
  }
  async function onSuccess(response: any) {
    const {data, code} = response;
    setLoading(false)
    if (code == 500) return ToastTimer(Toast);
    if (data) return router.isReady && router.push('/admin/news');
  }
  return useMutation(postOneNewsAdmin, { onMutate, onError, onSuccess }) 
};
export const useDeleteOneNewsAdmin = () => {
  const queryClient = useQueryClient();
  async function onError(err: any) {
    if (err.code == 500) return ToastTimer(Toast);
  }
  async function onSuccess(response: any) {
    const {data, code} = response;
    if (code == 500) return ToastTimer(Toast);
    if (data) {
      queryClient.invalidateQueries({queryKey:['all-news-admin']});
      return Swal.fire('Deleted!', `title ${data.title} has been deleted.`, 'success');
    }
  }
  return useMutation(deleteOneNewsAdmin, { onError, onSuccess }); 
};
export const usePatchOneNewsAdmin = (router: NextRouter, setLoading) => {
  async function onMutate() {
    setLoading(true);
  }
  async function onError(err: any) {
    setLoading(false);
    if (err.code == 500) return ToastTimer(Toast);
  }
  async function onSuccess(response: any) {
    const {data, code} = response;
    setLoading(false);
    if (code == 500) return ToastTimer(Toast);
    if (data) return router.isReady && router.push('/admin/news');
  }
  return useMutation(patchOneNewsAdmin, { onMutate, onError, onSuccess }); 
}

// User React Query Service
export const useGetHomePageNews = (params) => {
  return useQuery(
    ["all-news-home", params], 
    async () => await getAllNews(params), 
    {
      retry: 1,
    })
}

export const useGetAllNews = (params) => {
  return useQuery(
    ["all-news", params], 
    async () => await getAllNews(params), 
    {
      retry: 1,
    })
}

export const useGetOneNews = (params, initialDataProps ?: any) => {
  const config = {
    retry:1,
  }
  if(initialDataProps){
    config["initialDataProps"] = initialDataProps;
  }
  return useQuery(
      ["one-news", params], 
      async () => await getOneNews(params), 
      config
    );
}
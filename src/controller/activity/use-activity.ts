import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NextRouter } from "next/router";
import Swal from 'sweetalert2';

import { deleteOneActivityAdmin, getAllActivity, getAllActivityAdmin, getOneActivity, getOneActivityAdmin, patchOneActivityAdmin, postOneActivityAdmin } from "@/controller/activity/activity.service";
import { Toast, ToastTimer } from "@/helpers/utils/swal";

// Admin React Query Service
export const useGetAllActivityAdmin = (params, token: string) => {
    return useQuery(
      ["all-activity-admin", params, token], 
      async () => await getAllActivityAdmin(params, token), 
      {
        enabled: token ? true : false,
        retry: 2,
      })
};
export const useGetOneActivityAdmin = (params, token: string) => {
    return useQuery(
      ["one-activity-admin", params, token], 
      async () => await getOneActivityAdmin(params, token), 
      {
        enabled: params.id && token ? true : false,
        retry: 2,
      });
};
export const usePostOneActivityAdmin = (router: NextRouter, setLoading) => {
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
    if (data) return router.isReady && router.push('/admin/activity');
  }
  return useMutation(postOneActivityAdmin, { onMutate, onError, onSuccess }); 
};
export const useDeleteOneActivityAdmin = () => {
  const queryClient = useQueryClient();
  const onError = async (err: any) => {
    if (err.code == 500) return ToastTimer(Toast);
  }
  const onSuccess = async (response: any) => {
    const {data, code} = response;
    if (code == 500) return ToastTimer(Toast);
    if (data) {
      queryClient.invalidateQueries({queryKey:['all-activity-admin']});
      return Swal.fire('Deleted!', `activity ${data.title} has been deleted.`, 'success');
    }
  }
  return useMutation(deleteOneActivityAdmin, { onError, onSuccess }); 
};
export const usePatchOneActivityAdmin = (router: NextRouter, setLoading) => {
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
    if (data) return router.isReady && router.push('/admin/activity');
  }
  return useMutation(patchOneActivityAdmin, { onMutate, onError, onSuccess }); 
}

// User React Query Service
export const useGetHomePageActivity = (params) => {
  return useQuery(
    ["all-activity-home", params], 
    async () => await getAllActivity(params), 
    {
      retry: 1,
    })
}

export const useGetAllActivity = (params) => {
  return useQuery(
    ["all-activity", params], 
    async () => await getAllActivity(params), 
    {
      retry: 1,
    })
}

export const useGetOneActivity = (params, initialData ?: any) => {
  const config = {
    retry: 1,
  };
  if(initialData){
    config["initialData"] = initialData;
  }
  return useQuery(
    ["one-activity", params], 
    async () => await getOneActivity(params), 
    config
    )
}
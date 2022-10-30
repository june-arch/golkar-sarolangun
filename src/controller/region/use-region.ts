import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NextRouter } from "next/router";
import Swal from "sweetalert2";

import { deleteOneRegionAdmin, getAllRegionAdmin, getListRegion, getListRegionAdmin, getOneRegionAdmin, patchOneRegionAdmin, postOneRegionAdmin } from "@/controller/region/region.service";
import { Toast, ToastTimer } from "@/helpers/utils/swal";

// Admin React Query Service
export const useGetAllRegionAdmin = (params, token: string) => {
    return useQuery(
      ["all-region-admin", params, token], 
      async () => await getAllRegionAdmin(params, token));
}
export const useGetListRegionAdmin = (token: string) => {
    return useQuery(
      ["list-region-admin", token], 
      async () => await getListRegionAdmin(token), 
      {enabled: token ? true : false});
}
export const useGetOneRegionAdmin = (params, token: string) => {
    return useQuery(
      ["one-region", params, token], 
      async () => await getOneRegionAdmin(params, token), 
      {
        enabled: params.id && token ? true : false,
        retry: 1,
      });
};
export const usePostOneRegionAdmin = (router: NextRouter, setLoading) => {
  async function onMutate() {
    setLoading(true);
  }
  async function onError(err: any) {
    setLoading(false)
    if (err.code == 500) return ToastTimer(Toast);
  }
  async function onSuccess(response: any) {
    const { data, code } = response;
    setLoading(false)
    if (code == 500) return ToastTimer(Toast);
    if (data) return router.isReady && router.push('/admin/region');
  }
  return useMutation(postOneRegionAdmin, { onMutate, onError, onSuccess }); 
};
export const usePatchOneRegionAdmin = (router: NextRouter, setLoading) => {
  async function onMutate() {
    setLoading(true);
  }
  async function onError(err: any) {
    setLoading(false)
    if (err.code == 500) return ToastTimer(Toast);
  }
  async function onSuccess(response: any) {
    // muttion done with success response
    const { data, code } = response;
    setLoading(false);
    if (code == 500) return ToastTimer(Toast);
    if (data) return router.isReady && router.push('/admin/region');
  }
  return useMutation(patchOneRegionAdmin, { onMutate, onError, onSuccess }); 
}
export const useDeleteOneRegionAdmin = () => {
  const queryClient = useQueryClient();
  async function onError(err: any) {
    if (err.code == 500) return ToastTimer(Toast);
  }
  async function onSuccess(response: any) {
    const {data, code} = response;
    if (code == 500) return ToastTimer(Toast);
    if (data) {
      queryClient.invalidateQueries({queryKey:['all-region-admin']});
      Swal.fire('Deleted!', `region ${data.name} has been deleted.`, 'success');
      return;
    }
  }
  return useMutation(deleteOneRegionAdmin, { onError, onSuccess });
};

// User React Query Service
export const useGetlistRegion = () => {
  return useQuery(
    ["list-region"], 
    async () => await getListRegion(), 
    {retry:1});
}
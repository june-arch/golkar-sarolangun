import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NextRouter } from "next/router";
import Swal from 'sweetalert2';

import { deleteOneMemberAdmin, getAllMemberAdmin, getOneMemberAdmin, getOneMemberByNik, patchOneMemberAdmin, postOneMember, postOneMemberAdmin } from "@/controller/member/member.service";
import { Toast, ToastTimer } from "@/helpers/utils/swal";

// Admin React Query Service
export const useGetAllMemberAdmin = (params, token: string) => {
    return useQuery(
      ["all-member-admin", params, token], 
      async () => await getAllMemberAdmin(params, token), 
      { 
        enabled: token ? true : false, 
        retry: 2
      })
};
export const useGetOneMemberAdmin = (params, token: string) => {
    return useQuery(
      ["one-member-admin", params, token], 
      async () => await getOneMemberAdmin(params, token), 
      { 
        enabled: params.id && token ? true : false,
        retry: 2
      });
};
export const usePostOneMemberAdmin = (router: NextRouter, setLoading) => {
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
    if (data) return router.isReady && router.push('/admin/member');
  }
  return useMutation(postOneMemberAdmin, { onMutate, onError, onSuccess }); 
};
export const useDeleteOneMemberAdmin = () => {
  const queryClient = useQueryClient();
  const onError = async (err: any) => {
    if (err.code == 500) return ToastTimer(Toast);
  }
  const onSuccess = async (response: any) => {
    const {data, code} = response;
    if (code == 500) return ToastTimer(Toast);
    if (data) {
      queryClient.invalidateQueries({queryKey:['all-member-admin']});
      return Swal.fire('Deleted!', `Member ${data.fullname} has been deleted.`, 'success');
    }
  }
  return useMutation(deleteOneMemberAdmin, { onError, onSuccess }); 
};
export const usePatchOneMemberAdmin = (router: NextRouter, setLoading) => {
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
    if (code == 500) ToastTimer(Toast);
    if (data) return router.isReady && router.push('/admin/member');
  }
  return useMutation(patchOneMemberAdmin, { onMutate, onError, onSuccess }); 
}

// User React Query Service
export const useGetOneByNikMember = (params) => {
  return useQuery(
    ["one-member-home", params], 
    async () => await getOneMemberByNik(params), 
    {  retry: 1, });
}

export const usePostOneMember = (router: NextRouter, formik) => {
  const onMutate = async () => {
    Swal.fire({
      allowOutsideClick: false,
      showConfirmButton: false,
      color: 'grey',
      width: '15%',
      html: `
      <style>
        svg {
          stroke-dasharray: 269.7405090332031px;
          stroke-dashoffset: 0;
          animation: heartBeat 4s linear reverse infinite;
          transform: rotate(-90deg);
        }
        
        @keyframes heartBeat {
          50% {
            stroke-dashoffset: 269.7405090332031px;
          }
          50.01% {
            stroke-dashoffset: -269.7405090332031px;
          }
        }
      </style>
      <div class="flex justify-center">
        <div class="h-40 w-40 p-10">
          <svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
            <circle id="c" fill="none" stroke-width="8" stroke-linecap="round" stroke="grey" cx="45" cy="45" r="40" />
          </svg>
        </div>
      </div>`
    })
  }
  const onError = async (err: any) => {    
    return ToastTimer(Toast);
  }
  const onSuccess = async (response: any) => {
    const {data, code, message} = response;
    if (code != 201) {
      console.log(data)
      if(code == 400){
        Swal.fire({
          position:'center',
          icon:'error',
          showCloseButton: true,
          showConfirmButton: false,
          title: message,
          color: 'red'
        });
        return;
      }
      return ToastTimer(Toast);
    }
    if (data) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Berhasil daftar tolong tunggu konfirmasi dari admin atau cek progress di homepage',
        showConfirmButton: false,
        timer: 5500
      });  
      return formik.resetForm();
    }
  }
  return useMutation(postOneMember, { onMutate, onError, onSuccess }); 
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NextRouter } from "next/router";
import Swal from 'sweetalert2';

import { deleteOneMemberAdmin, getAllMemberAdmin, getOneMemberAdmin, patchOneMemberAdmin, postOneMemberAdmin } from "@/controller/member/member.service";

export const useMembersAdminQuery = (params, token: string) => {
    return useQuery(["members", params, token], async () => await getAllMemberAdmin(params, token), {
      enabled: token ? true : false,
      retry: 2,
    })
};
export const useMemberAdminQuery = (params, token: string) => {
    return useQuery(["member", params, token], async () => await getOneMemberAdmin(params, token), {
      enabled: params.id && token ? true : false,
      retry: 2,
    });
};
export const useMemberPostAdminQuery = (router: NextRouter, setLoading) => {
  return useMutation(postOneMemberAdmin, {
      onMutate: async () => {
        // mution in progress
        // use for spinner, disabled form
        setLoading(true);
      },
      onSettled: async () => {
        // mutation done -> success error
      },
      onError: async (err: any) => {
        // muttion done with error response
        setLoading(false)
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
        if (err.code == 500) Toast.fire({
          icon: 'error',
          title: `Opss Something went wrong. Please try again later`,
          color: 'red',});
      },
      onSuccess: async (response: any) => {
        // muttion done with success response
        const {data, code, message} = response;
        setLoading(false)
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
        if (code == 500) Toast.fire({
          icon: 'error',
          title: `Opss Something went wrong. Please try again later`,
          color: 'red',});
        if (data) {
          return router.isReady && router.push('/admin/member');
        }
      }
    }) 
};
export const useMemberDeleteAdminQuery = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteOneMemberAdmin, {
      onMutate: async () => {
        // mution in progress
        // use for spinner, disabled form
      },
      onSettled: async () => {
        // mutation done -> success error
      },
      onError: async (err: any) => {
        // muttion done with error response
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
        if (err.code == 500) Toast.fire({
          icon: 'error',
          title: `Opss Something went wrong. Please try again later`,
          color: 'red',});
      },
      onSuccess: async (response: any) => {
        // muttion done with success response
        const {data, code, message} = response;
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
        if (code == 500) Toast.fire({
          icon: 'error',
          title: `Opss Something went wrong. Please try again later`,
          color: 'red',});
        if (data) {
          queryClient.invalidateQueries({queryKey:['members']});
          Swal.fire('Deleted!', `Member ${data.fullname} has been deleted.`, 'success');
        }
      }
    }) 
};
export const useMemberPatchAdminQuery = (router: NextRouter, setLoading) => {
  return useMutation(patchOneMemberAdmin, {
    onMutate: async () => {
      // mution in progress
      // use for spinner, disabled form
      setLoading(true);
    },
    onSettled: async () => {
      // mutation done -> success error
    },
    onError: async (err: any) => {
      // muttion done with error response
      setLoading(false);
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });
      if (err.code == 500) Toast.fire({
        icon: 'error',
        title: `Opss Something went wrong. Please try again later`,
        color: 'red',});
    },
    onSuccess: async (response: any) => {
      // muttion done with success response
      const {data, code, message} = response;
      setLoading(false);
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });
      if (code == 500) Toast.fire({
        icon: 'error',
        title: `Opss Something went wrong. Please try again later`,
        color: 'red',});
      if (data) {
        return router.isReady && router.push('/admin/member');
      }
    }
  }) 
}
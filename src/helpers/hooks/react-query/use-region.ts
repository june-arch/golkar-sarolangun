import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NextRouter } from "next/router";
import Swal from "sweetalert2";

import { deleteOneRegionAdmin, getAllRegionAdmin, getListRegionAdmin, getOneRegionAdmin, patchOneRegionAdmin, postOneRegionAdmin } from "@/controller/region/region.service";

export const useRegionsAdminQuery = (params, token: string) => {
    return useQuery(["regions", params, token], async () => await getAllRegionAdmin(params, token));
}

export const useRegionsListQuery = (token: string) => {
    return useQuery(["list-regions", token], async () => await getListRegionAdmin(token), {enabled: token ? true : false});
}

export const useRegionAdminQuery = (params, token: string) => {
    return useQuery(["region", params, token], async () => await getOneRegionAdmin(params, token), {
      enabled: params.id && token ? true : false,
      retry: 2,
    });
};
export const useRegionPostAdminQuery = (router: NextRouter, setLoading) => {
  return useMutation(postOneRegionAdmin, {
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
          return router.isReady && router.push('/admin/region');
        }
      }
    }) 
};
export const useRegionDeleteAdminQuery = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteOneRegionAdmin, {
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
          queryClient.invalidateQueries({queryKey:['regions']});
          Swal.fire('Deleted!', `region ${data.name} has been deleted.`, 'success');
        }
      }
    }) 
};
export const useRegionPatchAdminQuery = (router: NextRouter, setLoading) => {
  return useMutation(patchOneRegionAdmin, {
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
        return router.isReady && router.push('/admin/region');
      }
    }
  }) 
}
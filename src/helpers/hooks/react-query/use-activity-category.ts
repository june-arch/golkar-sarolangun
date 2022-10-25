import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NextRouter } from "next/router";
import Swal from "sweetalert2";

import { deleteOneActivityCategoryAdmin, getAllActivityCategoryAdmin, getListActivityCategoryAdmin, getOneActivityCategoryAdmin, patchOneActivityCategoryAdmin, postOneActivityCategoryAdmin } from "@/controller/activity-category/activity-category.service";

export const useActivityCategoryListQuery = (token: string) => {
    return useQuery(["list-activity-category", token], async () => await getListActivityCategoryAdmin(token), {enabled: token ? true : false});
}

export const useActivityCategoriesAdminQuery = (params, token: string) => {
    return useQuery(["activity-categories", params, token], async () => await getAllActivityCategoryAdmin(params, token), {
      enabled: token ? true : false,
      retry: 2,
    })
};
export const useActivityCategoryAdminQuery = (params, token: string) => {
    return useQuery(["activity-category", params, token], async () => await getOneActivityCategoryAdmin(params, token), {
      enabled: params.id && token ? true : false,
      retry: 2,
    });
};
export const useActivityCategoryPostAdminQuery = (router: NextRouter, setLoading) => {
  return useMutation(postOneActivityCategoryAdmin, {
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
          return router.isReady && router.push('/admin/activity/category');
        }
      }
    }) 
};
export const useActivityCategoryDeleteAdminQuery = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteOneActivityCategoryAdmin, {
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
          queryClient.invalidateQueries({queryKey:['activity-categories']});
          Swal.fire('Deleted!', `activity category ${data.name} has been deleted.`, 'success');
        }
      }
    }) 
};
export const useActivityCategoryPatchAdminQuery = (router: NextRouter, setLoading) => {
  return useMutation(patchOneActivityCategoryAdmin, {
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
        return router.isReady && router.push('/admin/activity/category');
      }
    }
  }) 
}
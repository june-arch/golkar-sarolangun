import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NextRouter } from "next/router";
import Swal from "sweetalert2";

import { deleteOneNewsCategoryAdmin, getAllNewsCategoryAdmin, getListNewsCategoryAdmin, getOneNewsCategoryAdmin, patchOneNewsCategoryAdmin, postOneNewsCategoryAdmin } from "@/controller/news-category/news-category.service";

export const useNewsCategoryListQuery = (token: string) => {
    return useQuery(["list-news-category", token], async () => await getListNewsCategoryAdmin(token), {enabled: token ? true : false});
}

export const useNewsCategoriesAdminQuery = (params, token: string) => {
    return useQuery(["news-categories", params, token], async () => await getAllNewsCategoryAdmin(params, token), {
      enabled: token ? true : false,
      retry: 2,
    })
};
export const useNewsCategoryAdminQuery = (params, token: string) => {
    return useQuery(["news-category", params, token], async () => await getOneNewsCategoryAdmin(params, token), {
      enabled: params.id && token ? true : false,
      retry: 2,
    });
};
export const useNewsCategoryPostAdminQuery = (router: NextRouter, setLoading) => {
  return useMutation(postOneNewsCategoryAdmin, {
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
          return router.isReady && router.push('/admin/news/category');
        }
      }
    }) 
};
export const useNewsCategoryDeleteAdminQuery = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteOneNewsCategoryAdmin, {
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
          queryClient.invalidateQueries({queryKey:['news-categories']});
          Swal.fire('Deleted!', `news category ${data.name} has been deleted.`, 'success');
        }
      }
    }) 
};
export const useNewsCategoryPatchAdminQuery = (router: NextRouter, setLoading) => {
  return useMutation(patchOneNewsCategoryAdmin, {
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
        return router.isReady && router.push('/admin/news/category');
      }
    }
  }) 
}
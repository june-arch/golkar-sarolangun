import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NextRouter } from "next/router";
import Swal from 'sweetalert2';

import { deleteOneNewsAdmin, getAllNews, getAllNewsAdmin, getOneNewsAdmin, patchOneNewsAdmin, postOneNewsAdmin } from "@/controller/news/news.service";

export const useNewsAllAdminQuery = (params, token: string) => {
    return useQuery(["news-all", params, token], async () => await getAllNewsAdmin(params, token), {
      enabled: token ? true : false,
      retry: 2,
    })
};
export const useNewsOneAdminQuery = (params, token: string) => {
    return useQuery(["news", params, token], async () => await getOneNewsAdmin(params, token), {
      enabled: params.id && token ? true : false,
      retry: 2,
    });
};
export const useNewsPostAdminQuery = (router: NextRouter, setLoading) => {
  return useMutation(postOneNewsAdmin, {
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
          return router.isReady && router.push('/admin/news');
        }
      }
    }) 
};
export const useNewsDeleteAdminQuery = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteOneNewsAdmin, {
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
          queryClient.invalidateQueries({queryKey:['news-all']});
          Swal.fire('Deleted!', `title ${data.title} has been deleted.`, 'success');
        }
      }
    }) 
};
export const useNewsPatchAdminQuery = (router: NextRouter, setLoading) => {
  return useMutation(patchOneNewsAdmin, {
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
        return router.isReady && router.push('/admin/news');
      }
    }
  }) 
}

export const useNewsHomePageQuery = (params) => {
  return useQuery(["news-homepage", params], async () => await getAllNews(params), {
    retry: 2,
  })
}
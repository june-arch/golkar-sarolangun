import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

import { postLogin } from '@/controller/admin/admin.service';
import { getWithExpiration, setWithExpiration } from '@/helpers/db/local-storage';
import { TokenContext } from '@/helpers/hooks/use-context';

const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const {token, setToken} = useContext(TokenContext);
  const router = useRouter();
  const getTokenData = async () => {
    const data = await getWithExpiration('token-auth');
    setToken(data);
    setLoading(false);
  }
  useEffect(() => {
    setLoading(true);
    getTokenData().catch((error) => console.log(error))
  }, [])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(90, 'Must be 90 characters or less')
        .required('Required'),
      password: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      mutation.mutate(values);
      
    },
  });
  const mutation = useMutation(postLogin, {
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
      if (code == 409) formik.errors.password = message;
      if (code == 404) formik.errors.username = 'username not found';
      if (code == 500) Toast.fire({
        icon: 'error',
        title: `Opss Something went wrong. Please try again later`,
        color: 'red',});
      if (data) {
        await setWithExpiration('token-auth', data.token, 60*60);
        setToken(data.token);
        router.push('/admin');
      }
    }
  }) 
  if(isLoading) return <p>Loading ...</p>
  if(token) {
    router.push('/admin');
    return null;
  }

  return (
    <section className='flex h-screen justify-center'>
      <div className='h-full w-full px-6 text-gray-800'>
        <div className='flex h-full flex-col lg:flex-row items-center justify-center lg:justify-between xl:justify-center'>
          <div className='mb-12 grow-0 basis-auto lg:md-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12'>
            <Image
              src='/images/logo.png'
              className='w-full'
              alt='Sample image'
              width={640}
              height={613}
            />
          </div>
          <div className='mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12'>
            <form onSubmit={formik.handleSubmit}>
              <div className='mb-6'>
                <input
                  type='text'
                  className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-primary focus:bg-white focus:text-gray-700 focus:outline-none'
                  id='username'
                  name='username'
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  placeholder='Username'
                />
                {formik.touched.username && formik.errors.username ? (
                  <p className=' text-red-500'>{formik.errors.username}</p>
                ) : null}
              </div>

              <div className='mb-6'>
                <input
                  type='password'
                  className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-primary focus:bg-white focus:text-gray-700 focus:outline-none'
                  id='password'
                  name='password'
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder='Password'
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className=' text-red-500'>{formik.errors.password}</p>
                ) : null}
              </div>

              <div className='text-center lg:text-left'>
                <button
                  type='submit'
                  disabled={formik.isSubmitting}
                  className={`inline-block rounded bg-primary ${formik.isSubmitting && '!bg-gray-500'} px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-primary hover:shadow-lg focus:bg-primary focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary active:shadow-lg`}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;

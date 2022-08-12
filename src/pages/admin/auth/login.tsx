import { useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import * as Yup from 'yup';

import { useAppDispatch } from '@/helpers/redux/hook';
import { setIsLogin, setToken } from '@/helpers/redux/slice/auth-admin.slice';
import { postLogin } from '@/service/admin/auth.admin';

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
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
      const { data, code } = await postLogin(values);
      if (code !== 200) {
        formik.errors.username = 'username salah';
        formik.errors.password = 'password salah';
      }
      if (data) {
        dispatch(setIsLogin(true));
        dispatch(setToken(data.token));
        router.push('/admin');
      }
    },
  });

  return (
    <section className='h-screen'>
      <div className='h-full px-6 text-gray-800'>
        <div className='g-6 flex h-full flex-wrap items-center justify-center lg:justify-between xl:justify-center'>
          <div className='shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12'>
            <Image
              src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp'
              className='w-full'
              alt='Sample image'
              width={500}
              height={500}
            />
          </div>
          <div className='mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:ml-20 xl:w-5/12'>
            <form onSubmit={formik.handleSubmit}>
              <div className='mb-6'>
                <input
                  type='text'
                  className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                  id='username'
                  name='username'
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  placeholder='Username'
                />
                {formik.touched.username && formik.errors.username ? (
                  <>{formik.errors.username}</>
                ) : null}
              </div>

              <div className='mb-6'>
                <input
                  type='password'
                  className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
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
                  className='inline-block rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'
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

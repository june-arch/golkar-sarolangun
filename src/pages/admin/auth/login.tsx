
import * as Yup from 'yup'
import React from 'react'
import { postLogin } from '@/service/admin/auth.admin'
import { setIsLogin, setToken } from '@/lib/redux/slice/auth-slice-admin'
import { useAppDispatch } from '@/lib/redux/hook'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import Image from 'next/image'

const Login = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      password: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      const { data, code } = await postLogin(values)
      if (code !== 200) {
        formik.errors.username = 'username salah'
        formik.errors.password = 'password salah'
      }
      if (data) {
        dispatch(setIsLogin(true))
        dispatch(setToken(data.token))
        router.push('/admin')
      }
    },
  })

  return (
    <section className="h-screen">
      <div className="px-6 h-full text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <Image
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
              width={500}
              height={500}
            />
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="username"
                  name="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  placeholder="Username"
                />
                {formik.touched.username && formik.errors.username ? (
                  <>{formik.errors.username}</>
                ) : null}
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder="Password"
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className=" text-red-500">{formik.errors.password}</p>
                ) : null}
              </div>

              <div className="text-center lg:text-left">
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login

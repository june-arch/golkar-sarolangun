/* eslint-disable react-hooks/exhaustive-deps */
import { Form } from '@/components/admin/Form'
import { Layout } from '@/components/admin/layout/Main'
import { useAppSelector } from '@/helpers/redux/hook'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { selectToken } from '@/helpers/redux/slice/auth-admin.slice'
import { patchRegion, useGetRegion } from '@/service/admin/region.admin'
import { headerItemRegions } from '@/helpers/resource/table-admin'
import { useEffect } from 'react'

function EditRegion() {
  const token = useAppSelector(selectToken)
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      name: '',
      kemendagri_code: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      kemendagri_code: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      const result = await patchRegion(values, id, token)
      if (result.code !== 200) {
        formik.errors.name = 'name tidak valid'
        formik.errors.kemendagri_code = 'kemendagri_code tidak valid'
      }
      if (result.data) {
        return router.push('/admin/region')
      }
    },
  })
  const { id } = router.query
  const value = Array.isArray(id) ? id[0] : id
  const { region, isError, isLoading } = useGetRegion({id:value}, token)
  useEffect(() => {
    if(region) formik.setValues({ name: region.data ? region.data.name : '', kemendagri_code: region.data ? region.data.kemendagri_code : ''})
  }, [region])
  
  if (isError)
    return (
      <div>
        error fetch data with error code: {isError['status']},{' '}
        {JSON.stringify(isError['info'])}
      </div>
    )
  if (isLoading) return <div>Loading ...</div>
  return (
    <div className="p-5 max-w-7xl mx-auto ">
      <Form formik={formik} header={headerItemRegions}>
        <div className="py-6 flex flex-col md:flex-row  md:space-y-0 items-center space-y-5 justify-between">
          <div className="text-3xl">Region : {id}</div>
        </div>
      </Form>
    </div>
  )
}

const Edit = () => {
  return (
    <Layout>
      <EditRegion />
    </Layout>
  )
}

export default Edit

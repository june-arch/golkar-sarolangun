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
import { getChangedValues } from '@/helpers/utils/common'

function EditRegion({ props }) {
  const { region, id, token, router } = props;
  const initialValues = {
    name: region.data.name,
    kemendagri_code: region.data.kemendagri_code
  }
  const validationSchema = Yup.object({
    name: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    kemendagri_code: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
  });
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      const editedValues = getChangedValues(values, initialValues);
      const result = await patchRegion(editedValues, id, token)
      if (result.code !== 200) {
        if (result.status == 400) {
          result.info.data.map(value => Object.keys(value).map(key => formik.setFieldError(key, value[key])))
        }
      }
      if (result.success == true) {
        return router.push('/admin/region')
      }
    },
  })

  return (
    <div className="p-5 max-w-7xl mx-auto ">
      <Form formik={formik} header={headerItemRegions}>
        <div className="py-6 flex flex-col md:flex-row  md:space-y-0 items-center space-y-5 justify-between">
          <div className="text-3xl">Edit Region : {id}</div>
        </div>
      </Form>
    </div>
  )
}

const Edit = () => {
  const token = useAppSelector(selectToken)
  const router = useRouter()
  const { id } = router.query
  const value = Array.isArray(id) ? id[0] : id
  const { region, isError, isLoading } = useGetRegion({ id: value }, token)
  if (isError)
    return (
      <div>
        error fetch data with error code: {isError['status']},{' '}
        {JSON.stringify(isError['info'])}
      </div>
    )
  if (isLoading) return <div>Loading ...</div>
  const props = {
    region,
    id,
    token,
    router
  }
  return (
    <Layout>
      <EditRegion props={props} />
    </Layout>
  )
}

export default Edit

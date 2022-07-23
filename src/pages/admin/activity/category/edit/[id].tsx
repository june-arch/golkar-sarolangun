import { Form } from '@/components/admin/Form'
import { Layout } from '@/components/admin/layout/Main'
import { useAppSelector } from '@/helpers/redux/hook'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { selectToken } from '@/helpers/redux/slice/auth-slice-admin'
import { headerItemActivityCateogries } from '@/helpers/resource/table-admin'
import { useEffect } from 'react'
import { putActivityCategory, useGetActivityCategory } from '@/service/admin/activity-category'

function EditActivityCategory() {
  const token = useAppSelector(selectToken)
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      description: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      const result = await putActivityCategory(values, id, token)
      if (result.code !== 200) {
        formik.errors.name = 'name tidak valid'
        formik.errors.description = 'description tidak valid'
      }
      if (result.data) {
        return router.push('/admin/activity/category')
      }
    },
  })
  const { id } = router.query
  const value = Array.isArray(id) ? id[0] : id
  const { activityCategory, isError, isLoading } = useGetActivityCategory({ id: value }, token)
  useEffect(() => {
    if (activityCategory) formik.setValues({ name: activityCategory.data ? activityCategory.data.name : '', description: activityCategory.data ? activityCategory.data.description : '' })
  }, [activityCategory])

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
      <Form formik={formik} header={headerItemActivityCateogries}>
        <div className="py-6 flex flex-col md:flex-row  md:space-y-0 items-center space-y-5 justify-between">
          <div className="text-3xl">Activity Category : {id}</div>
        </div>
      </Form>
    </div>
  )
}

const Edit = () => {
  return (
    <Layout>
      <EditActivityCategory />
    </Layout>
  )
}

export default Edit

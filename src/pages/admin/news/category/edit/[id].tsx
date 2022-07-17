import { Form } from '@/components/admin/Form'
import { Layout } from '@/components/admin/layout/Main'
import { useAppSelector } from '@/lib/redux/hook'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { selectToken } from '@/lib/redux/slice/auth-slice-admin'
import { headerItemNewsCateogries } from '@/lib/resource/table-admin'
import { useEffect } from 'react'
import { putNewsCategory, useGetNewsCategory } from '@/service/admin/news-category'

function EditNewsCategory() {
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
      const result = await putNewsCategory(values, id, token)
      if (result.code !== 200) {
        formik.errors.name = 'name tidak valid'
        formik.errors.description = 'description tidak valid'
      }
      if (result.data) {
        return router.push('/admin/news/category')
      }
    },
  })
  const { id } = router.query
  const value = Array.isArray(id) ? id[0] : id
  const { newsCategory, isError, isLoading } = useGetNewsCategory({ id: value }, token)
  useEffect(() => {
    if (newsCategory) formik.setValues({ name: newsCategory.data ? newsCategory.data.name : '', description: newsCategory.data ? newsCategory.data.description : '' })
  }, [newsCategory])

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
      <Form formik={formik} header={headerItemNewsCateogries}>
        <div className="py-6 flex flex-col md:flex-row  md:space-y-0 items-center space-y-5 justify-between">
          <div className="text-3xl">News Category : {id}</div>
        </div>
      </Form>
    </div>
  )
}

const Edit = () => {
  return (
    <Layout>
      <EditNewsCategory />
    </Layout>
  )
}

export default Edit

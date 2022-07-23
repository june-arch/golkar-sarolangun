import { Form } from '@/components/admin/Form'
import { Layout } from '@/components/admin/layout/Main'
import { useAppSelector } from '@/helpers/redux/hook'
import { selectToken } from '@/helpers/redux/slice/auth-slice-admin'
import { headerItemRegions } from '@/helpers/resource/table-admin'
import { postRegion } from '@/service/admin/region.admin'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import * as Yup from 'yup'

function AddRegion() {
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
      const result = await postRegion(values, token)
      if (result.code !== 200) {
        formik.errors.name = 'name tidak valid'
        formik.errors.kemendagri_code = 'kemendagri_code tidak valid'
      }
      if (result.data) {
        return router.push('/admin/region')
      }
    },
  })
  return (
    <div className="p-5 max-w-7xl mx-auto ">
      <Form formik={formik} header={headerItemRegions}>
        <div className="py-6 flex flex-col md:flex-row  md:space-y-0 items-center space-y-5 justify-between">
          <div className="text-3xl">Tambah Region</div>
        </div>
      </Form>
    </div>
  )
}

const Tambah = () => {
  return (
    <Layout>
       <AddRegion />
    </Layout>
  )
}

export default Tambah

import { Form } from '@/components/admin/Form'
import { Layout } from '@/components/admin/layout/Main'
import { useAppSelector } from '@/helpers/redux/hook'
import { selectToken } from '@/helpers/redux/slice/auth-slice-admin'
import { headerItemActivityCateogries } from '@/helpers/resource/table-admin'
import { postActivityCategory } from '@/service/admin/activity-category'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import * as Yup from 'yup'

function AddActivityCategory() {
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
            const result = await postActivityCategory(values, token)
            if (result.code !== 200) {
                formik.errors.name = 'name tidak valid'
                formik.errors.description = 'description tidak valid'
            }
            if (result.data) {
                return router.push('/admin/activity/category')
            }
        },
    })
    return (
        <div className="p-5 max-w-7xl mx-auto ">
            <Form formik={formik} header={headerItemActivityCateogries}>
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
            <AddActivityCategory />
        </Layout>
    )
}

export default Tambah

import { Form } from '@/components/admin/Form'
import { Layout } from '@/components/admin/layout/Main'
import { useAppSelector } from '@/lib/redux/hook'
import { selectToken } from '@/lib/redux/slice/auth-slice-admin'
import { formActivity } from '@/lib/resource/table-admin'
import { checkIfFilesAreCorrectType, checkIfFilesAreTooBig } from '@/lib/utils/common'
import { postActivity } from '@/service/admin/activity'
import { useGetActivityCategoryList } from '@/service/admin/activity-category'
import { FormikProvider, useFormik } from 'formik'
import { useRouter } from 'next/router'
import * as Yup from 'yup'

function AddActivity() {
    const token = useAppSelector(selectToken)
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            title: '',
            category_activity_id: '',
            video: '',
            image: '',
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            category_activity_id: Yup.number()
                .max(20, 'Must be number')
                .required('Required'),
            image: Yup.mixed().test("fileSize", "The file is too large", checkIfFilesAreTooBig).test("fileType","The file type invalid", checkIfFilesAreCorrectType).nullable(),
            video: Yup.string().matches(
                /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/,
                'Enter correct url!'
            ).nullable(),
        }),
        enableReinitialize: true,
        onSubmit: async (values) => {
            const result = await postActivity(values, token)
            if (result.code !== 200) {
                if(result.code == 400){
                    result.data.map(value => Object.keys(value).map(key => formik.errors[key] = value[key]))
                }
            }
            if (result.data && (result.success == true)) {
                return router.push('/admin/activity')
            }
        },
    })
    const { activityCategory, isError, isLoading } = useGetActivityCategoryList(token)
    if (isError)
        return (
        <div>
            error fetch data with error code: {isError['status']},{' '}
            {JSON.stringify(isError['info'])}
        </div>
        )
    if (isLoading) return <div>Loading ...</div>
    const listCategoryActivity = activityCategory.data.map((item) => { return {label: item.name, value: item.id_category_activity}})
    return (
        <div className="p-5 max-w-7xl mx-auto ">
            <FormikProvider value={formik}>
                <Form formik={formik} header={formActivity} data={listCategoryActivity} >
                    <div className="py-6 flex flex-col md:flex-row  md:space-y-0 items-center space-y-5 justify-between">
                        <div className="text-3xl">Tambah Activity</div>
                    </div>
                </Form>
            </FormikProvider>
        </div>
    )
}

const Tambah = () => {
    return (
        <Layout>
            <AddActivity />
        </Layout>
    )
}

export default Tambah

import { Form } from '@/components/admin/Form'
import { Layout } from '@/components/admin/layout/Main'
import { useAppSelector } from '@/lib/redux/hook'
import { selectToken } from '@/lib/redux/slice/auth-slice-admin'
import { formNews } from '@/lib/resource/table-admin'
import { checkIfFilesAreCorrectType, checkIfFilesAreTooBig } from '@/lib/utils/common'
import { postNews } from '@/service/admin/news'
import { useGetNewsCategoryList } from '@/service/admin/news-category'
import { FormikProvider, useFormik } from 'formik'
import { useRouter } from 'next/router'
import * as Yup from 'yup'

function AddNews() {
    const token = useAppSelector(selectToken)
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            title: '',
            category_news_id: '',
            content: '',
            author: '',
            image: '',
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            category_news_id: Yup.number()
                .max(20, 'Must be number')
                .required('Required'),
            image: Yup.mixed().test("fileSize", "The file is too large", checkIfFilesAreTooBig).test("fileType","The file type invalid", checkIfFilesAreCorrectType).required(),
            content: Yup.string().min(3).max(2000).required("Required"),
            author: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
        }),
        enableReinitialize: true,
        onSubmit: async (values) => {
            const result = await postNews(values, token)
            if (result.code !== 200) {
                if(result.code == 400){
                    result.data.map(value => Object.keys(value).map(key => formik.errors[key] = value[key]))
                }
            }
            if (result.data && (result.success == true)) {
                return router.push('/admin/news')
            }
        },
    })
    const { newsCategory, isError, isLoading } = useGetNewsCategoryList(token)
    if (isError)
        return (
        <div>
            error fetch data with error code: {isError['status']},{' '}
            {JSON.stringify(isError['info'])}
        </div>
        )
    if (isLoading) return <div>Loading ...</div>
    const listCategory = newsCategory.data.map((item) => { return {label: item.name, value: item.id_category_news}})
    return (
        <div className="p-5 max-w-7xl mx-auto ">
            <FormikProvider value={formik}>
                <Form formik={formik} header={formNews} data={listCategory} >
                    <div className="py-6 flex flex-col md:flex-row  md:space-y-0 items-center space-y-5 justify-between">
                        <div className="text-3xl">Tambah News</div>
                    </div>
                </Form>
            </FormikProvider>
        </div>
    )
}

const Tambah = () => {
    return (
        <Layout>
            <AddNews />
        </Layout>
    )
}

export default Tambah

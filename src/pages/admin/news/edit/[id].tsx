/* eslint-disable react-hooks/exhaustive-deps */
import { Form } from '@/components/admin/Form'
import { Layout } from '@/components/admin/layout/Main'
import { useAppSelector } from '@/helpers/redux/hook'
import { selectToken } from '@/helpers/redux/slice/auth-admin.slice'
import { formNews } from '@/helpers/resource/table-admin'
import { checkIfFilesAreCorrectType, checkIfFilesAreTooBig, getChangedValues } from '@/helpers/utils/common'
import { putNews, useGetNews } from '@/service/admin/news'
import { useGetNewsCategoryList } from '@/service/admin/news-category'
import { FormikProvider, useFormik } from 'formik'
import { useRouter } from 'next/router'
import * as Yup from 'yup'

function EditNews({props}) {
    const { news, newsCategory, id, token, router } = props;
    const initialValues = {
        title: news.data.title,
        category_news_id: news.data.category_news_id,
        content: news.data.content,
        author: news.data.author,
        image: '',
    }
    const validationSchema = Yup.object({
        title: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
        category_news_id: Yup.number()
            .max(20, 'Must be number')
            .required('Required'),
        image: Yup.mixed().test("fileSize", "The file is too large", checkIfFilesAreTooBig).test("fileType", "The file type invalid", checkIfFilesAreCorrectType).nullable(),
        content: Yup.string().min(3).max(2000).required("Required"),
        author: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
    })
    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            const editedValues = getChangedValues(values, initialValues);
            const result = await putNews(editedValues, id, token)
            if (result.code !== 200) {
                if (result.status == 400) {
                    result.info.data.map(value => Object.keys(value).map(key => formik.setFieldError(key, value[key])))
                }
            }
            if (result.data && (result.success == true)) {
                return router.push('/admin/news')
            }
        },
    })

    const listCategory = newsCategory.data.map((item) => { return { label: item.name, value: item.id_category_news } })
    return (
        <div className="p-5 max-w-7xl mx-auto ">
            <FormikProvider value={formik}>
                <Form formik={formik} header={formNews} data={listCategory} content={news.data} bucket='images/news' >
                    <div className="py-6 flex flex-col md:flex-row  md:space-y-0 items-center space-y-5 justify-between">
                        <div className="text-3xl">Edit News</div>
                    </div>
                </Form>
            </FormikProvider>
        </div>
    )
}

const Edit = () => {
    const token = useAppSelector(selectToken)
    const router = useRouter()
    const { id } = router.query
    const value = Array.isArray(id) ? id[0] : id
    const { news, isError: isErrorNews, isLoading: isLoadingNews } = useGetNews({ id: value }, token)
    const { newsCategory, isError, isLoading } = useGetNewsCategoryList(token)
    if (isError || isErrorNews)
    return (
        <div>
            error fetch data with error code: {isError['status']},{' '}
            {JSON.stringify(isError['info'])}
        </div>
    )
if (isLoading || isLoadingNews) return <div>Loading ...</div>
    const props = {
        news,
        newsCategory,
        id,
        token,
        router
    }
    return (
        <Layout>
            <EditNews props={props} />
        </Layout>
    )
}

export default Edit

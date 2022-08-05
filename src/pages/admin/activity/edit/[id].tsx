/* eslint-disable react-hooks/exhaustive-deps */
import { Form } from '@/components/admin/Form'
import { Layout } from '@/components/admin/layout/Main'
import { useAppSelector } from '@/helpers/redux/hook'
import { selectToken } from '@/helpers/redux/slice/auth-admin.slice'
import { formActivity, formNews } from '@/helpers/resource/table-admin'
import { checkIfFilesAreCorrectType, checkIfFilesAreTooBig, getChangedValues } from '@/helpers/utils/common'
import { putActivity, useGetActivity } from '@/service/admin/activity'
import { useGetActivityCategoryList } from '@/service/admin/activity-category'
import { FormikProvider, useFormik } from 'formik'
import { useRouter } from 'next/router'
import * as Yup from 'yup'

function EditActivity({props}) {
    const { activity, activityCategory, id, token, router } = props;
    const initialValues = {
        title: activity.data['title'],
        category_activity_id: activity.data['category_activity_id'],
        video: activity.data['video'],
        image: [],
    };
    const validationSchema = Yup.object({
        title: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
        category_activity_id: Yup.number()
            .max(20, 'Must be number')
            .required('Required'),
        image: Yup.array(
            Yup.mixed().test("fileSize", "The file is too large", checkIfFilesAreTooBig).test("fileType", "The file type invalid", checkIfFilesAreCorrectType).required()
        ).nullable(),
        video: Yup.string().matches(
            /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/,
            'Enter correct url!'
        ).nullable(),
    })
    
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, formik) => {
            const editedValues = getChangedValues(values, initialValues);
            const result = await putActivity(editedValues, id, token)
            if (result.code !== 200) {
                if (result.status == 400) {
                    result.info.data.map(value => Object.keys(value).map(key => formik.setFieldError(key, value[key])))
                }
            }
            if (result.data && (result.success == true)) {
                return router.push('/admin/activity')
            }
        }
    })
    const listCategory = activityCategory.data.map((item) => { return { label: item.name, value: item.id_category_activity } })
    return (
        <div className="p-5 max-w-7xl mx-auto ">
            <FormikProvider value={formik}>
                <Form formik={formik} header={formActivity} data={listCategory} content={activity.data} bucket='images/activity' isMultiple={true}>
                    <div className="py-6 flex flex-col md:flex-row  md:space-y-0 items-center space-y-5 justify-between">
                        <div className="text-3xl">Edit Activity</div>
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
    const { activity, isError: isErrorActivity, isLoading: isLoadingActivity } = useGetActivity({ id: value }, token)
    const { activityCategory, isError, isLoading } = useGetActivityCategoryList(token)
    if (isError || isErrorActivity)
        return (
           <Layout>
                <div>
                    error fetch data with error code: {isError['status']},{' '}
                    {JSON.stringify(isError['info'])}
                </div>
           </Layout>
        )
    if (isLoading || isLoadingActivity) return <Layout><div>Loading ...</div></Layout>
    const props = {
        activity,
        activityCategory,
        id,
        token,
        router
    }
    return (
        <Layout>
            <EditActivity props={props} />
        </Layout>
    )
}

export default Edit

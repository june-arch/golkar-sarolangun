/* eslint-disable react-hooks/exhaustive-deps */
import { Form } from '@/components/admin/Form'
import { Layout } from '@/components/admin/layout/Main'
import { useAppSelector } from '@/helpers/redux/hook'
import { selectToken } from '@/helpers/redux/slice/auth-admin.slice'
import { formMember } from '@/helpers/resource/table-admin'
import { checkIfFilesAreCorrectType, checkIfFilesAreTooBig, getChangedValues } from '@/helpers/utils/common'
import { patchMember, useGetMember } from '@/service/admin/member.admin'
import { useGetRegionsList } from '@/service/admin/region.admin'
import { FormikProvider, useFormik } from 'formik'
import { useRouter } from 'next/router'
import * as Yup from 'yup'

function EditMember({ props }) {
    const { member, regions, id, token, router } = props;
    const initialValues = {
        region_id: member.data.region_id,
        nik: member.data.nik,
        fullname: member.data.fullname,
        photo: '',
        photo_ktp: '',
        address: member.data.address,
        phone_number: member.data.phone_number,
        email: member.data.email,
        place_of_birth: member.data.place_of_birth,
        date_of_birth: member.data.date_of_birth,
        gender: member.data.gender,
        status: member.data.status
    }
    const validationSchema = Yup.object({
        region_id: Yup.number().required(),
        nik: Yup.string().max(25).min(16).required(),
        fullname: Yup.string().max(255).required(),
        photo: Yup.mixed().test("fileSize", "The file is too large", checkIfFilesAreTooBig).test("fileType", "The file type invalid", checkIfFilesAreCorrectType).nullable(),
        photo_ktp: Yup.mixed().test("fileSize", "The file is too large", checkIfFilesAreTooBig).test("fileType", "The file type invalid", checkIfFilesAreCorrectType).nullable(),
        address: Yup.string().required(),
        phone_number: Yup.string().max(15).required(),
        email: Yup.string().email().required(),
        place_of_birth: Yup.string().max(100).required(),
        date_of_birth: Yup.string().required(),
        gender: Yup.string().required(),
        status: Yup.number().required(),
    })
    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            const editedValues = getChangedValues(values, initialValues);
            const result = await patchMember(editedValues, id, token)
            if (result.code !== 200) {
                if (result.status == 400) {
                    result.info.data.map(value => Object.keys(value).map(key => formik.setFieldError(key, value[key])))
                }
            }
            if (result.data && (result.success == true)) {
                return router.push('/admin/member')
            }
        },
    })

    const listRegion = regions.data.map((item) => { return { label: item.name, value: item.id_regional } })
    return (
        <div className="p-5 max-w-7xl mx-auto ">
            <FormikProvider value={formik}>
                <Form formik={formik} header={formMember} data={listRegion} content={member.data} bucket='images/users' >
                    <div className="py-6 flex flex-col md:flex-row  md:space-y-0 items-center space-y-5 justify-between">
                        <div className="text-3xl">Edit Member : {id}</div>
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
    const { member, isError: isErrorMember, isLoading: isLoadingMember } = useGetMember({ id: value }, token)
    const { regions, isError, isLoading } = useGetRegionsList(token)
    if (isError || isErrorMember)
        return (
            <div>
                error fetch data with error code: {isError['status']},{' '}
                {JSON.stringify(isError['info'])}
            </div>
        )
    if (isLoading || isLoadingMember) return <div>Loading ...</div>
    const props = {
        member,
        regions,
        id,
        token,
        router
    }
    return (
        <Layout>
            <EditMember props={props} />
        </Layout>
    )
}

export default Edit

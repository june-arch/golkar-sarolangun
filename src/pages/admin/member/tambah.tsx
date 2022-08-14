import { FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

import { Form } from '@/components/admin/Form';
import { Layout } from '@/components/admin/layout/Main';

import { useAppSelector } from '@/helpers/redux/hook';
import { selectToken } from '@/helpers/redux/slice/auth-admin.slice';
import { formMember } from '@/helpers/resource/table-admin';
import {
  checkIfFilesAreCorrectType,
  checkIfFilesAreTooBig,
} from '@/helpers/utils/common';
import { postMember } from '@/service/admin/member.admin';
import { useGetRegionsList } from '@/service/admin/region.admin';

const Tambah = () => {
  const token = useAppSelector(selectToken);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      region_id: '',
      nik: '',
      photo: '',
      fullname: '',
      photo_ktp: '',
      address: '',
      phone_number: '',
      email: '',
      place_of_birth: '',
      date_of_birth: '',
      gender: '',
      status: '',
    },
    validationSchema: Yup.object({
      region_id: Yup.number().required(),
      nik: Yup.string().max(25).min(16).required(),
      fullname: Yup.string().max(255).required(),
      photo: Yup.mixed()
        .test('fileSize', 'The file is too large', checkIfFilesAreTooBig)
        .test('fileType', 'The file type invalid', checkIfFilesAreCorrectType)
        .required(),
      photo_ktp: Yup.mixed()
        .test('fileSize', 'The file is too large', checkIfFilesAreTooBig)
        .test('fileType', 'The file type invalid', checkIfFilesAreCorrectType)
        .required(),
      address: Yup.string().required(),
      phone_number: Yup.string().max(15).required(),
      email: Yup.string().email().required(),
      place_of_birth: Yup.string().max(100).required(),
      date_of_birth: Yup.string().required(),
      gender: Yup.string().required(),
      status: Yup.number().required(),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {      
      const result = await postMember(values, token);
      if (result.code !== 200) {
        if (result.status == 400) {
          result.info.data.map((value) =>
            Object.keys(value).map((key) =>
              formik.setFieldError(key, value[key])
            )
          );
        }
      }
      if (result.success == true) {
        return router.push('/admin/member');
      }
    },
  });
  const { regions, isError, isLoading } = useGetRegionsList(token);
  if (isError)
    return (
      <Layout>
        <div>
          error fetch data with error code: {isError['status']},{' '}
          {JSON.stringify(isError['info'])}
        </div>
      </Layout>
    );
  if (isLoading)
    return (
      <Layout>
        <div>Loading ...</div>
      </Layout>
    );
  const listCategory = regions.data.map((item) => {
    return { label: item.name, value: item.id_regional };
  });
  return (
    <Layout>
      <div className='mx-auto max-w-7xl p-5 '>
        <FormikProvider value={formik}>
          <Form formik={formik} header={formMember} data={listCategory}>
            <div className='flex flex-col items-center justify-between  space-y-5 py-6 md:flex-row md:space-y-0'>
              <div className='text-3xl'>Tambah Member</div>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </Layout>
  );
};

export default Tambah;

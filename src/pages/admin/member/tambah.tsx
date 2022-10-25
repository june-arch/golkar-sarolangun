import { FormikProvider, useFormik } from 'formik';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import * as Yup from 'yup';

import { Form } from '@/components/admin/Form';
import LoadingScreen from '@/components/LoadingScreen';
import PopupError from '@/components/PopupError';
import { formMember } from '@/components/resource/table-admin';

import { useMemberPostAdminQuery } from '@/helpers/hooks/react-query/use-member';
import { useRegionsListQuery } from '@/helpers/hooks/react-query/use-region';
import { TokenContext } from '@/helpers/hooks/use-context';
import {
  checkIfFilesAreCorrectType,
  checkIfFilesAreTooBig,
} from '@/helpers/utils/common';

const Layout = dynamic(
  () => import('@/components/admin/Layout'),
  { ssr: false }
);

const Page = () => {
  const {token} = useContext(TokenContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const mutation = useMemberPostAdminQuery(router, setLoading);
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
      mutation.mutate({payload:values, token})
    },
  });
  const { data:regions, isError, isLoading } = useRegionsListQuery(token);
  if (isError) return <PopupError isError={isError} />
  if (isLoading || loading) return <LoadingScreen/>;
  const listCategory = regions.data.map((item) => {
    return { label: item.name, value: item.id_regional };
  });
  return (
    <div className='mx-auto max-w-7xl p-5 '>
      <FormikProvider value={formik}>
        <Form formik={formik} header={formMember} data={listCategory}>
          <div className='flex flex-col items-center justify-between  space-y-5 py-6 md:flex-row md:space-y-0'>
            <div className='text-3xl'>Tambah Member</div>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

const Index = () => {
  return (
    <Layout>
      <Page />
    </Layout>
  );
}

export default Index;

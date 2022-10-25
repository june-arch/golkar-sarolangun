/* eslint-disable react-hooks/exhaustive-deps */
import { FormikProvider, useFormik } from 'formik';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import * as Yup from 'yup';

import { Form } from '@/components/admin/Form';
import LoadingScreen from '@/components/LoadingScreen';
import PopupError from '@/components/PopupError';
import { formMember } from '@/components/resource/table-admin';

import { useMemberAdminQuery, useMemberPatchAdminQuery } from '@/helpers/hooks/react-query/use-member';
import { useRegionsListQuery } from '@/helpers/hooks/react-query/use-region';
import { TokenContext } from '@/helpers/hooks/use-context';
import {
  checkIfFilesAreCorrectType,
  checkIfFilesAreTooBig,
  formatDateInput,
  getChangedValues,
} from '@/helpers/utils/common';

const Layout = dynamic(
  () => import('@/components/admin/Layout'),
  { ssr: false }
);

function EditMember({props}) {
  const { member, regions, id, token, setLoading } = props;
  const router = useRouter();
  const initialValues = {
    region_id: member?.data.region_id,
    nik: member?.data.nik,
    fullname: member?.data.fullname,
    photo: '',
    photo_ktp: '',
    address: member?.data.address,
    phone_number: member?.data.phone_number,
    email: member?.data.email,
    place_of_birth: member?.data.place_of_birth,
    date_of_birth: formatDateInput(member?.data.date_of_birth),
    gender: member?.data.gender,
    status: member?.data.status,
  };
  const validationSchema = Yup.object({
    region_id: Yup.number().required(),
    nik: Yup.string().max(25).min(16).required(),
    fullname: Yup.string().max(255).required(),
    photo: Yup.mixed()
      .test('fileSize', 'The file is too large', checkIfFilesAreTooBig)
      .test('fileType', 'The file type invalid', checkIfFilesAreCorrectType)
      .nullable(),
    photo_ktp: Yup.mixed()
      .test('fileSize', 'The file is too large', checkIfFilesAreTooBig)
      .test('fileType', 'The file type invalid', checkIfFilesAreCorrectType)
      .nullable(),
    address: Yup.string().required(),
    phone_number: Yup.string().max(15).required(),
    email: Yup.string().email().required(),
    place_of_birth: Yup.string().max(100).required(),
    date_of_birth: Yup.string().required(),
    gender: Yup.string().required(),
    status: Yup.number().required(),
  });
  const mutation = useMemberPatchAdminQuery(router, setLoading);
  
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const editedValues = getChangedValues(values, initialValues);
      mutation.mutate({body: {...editedValues}, id, token} );
    },
  });

  const listRegion = regions?.data.map((item) => {
    return { label: item.name, value: item.id_regional };
  });
  return (
    <div className='mx-auto max-w-7xl p-5 '>
      <FormikProvider value={formik}>
        <Form
          formik={formik}
          header={formMember}
          data={listRegion}
          content={member?.data}
        >
          <div className='flex flex-col items-center justify-between  space-y-5 py-6 md:flex-row md:space-y-0'>
            <div className='text-3xl'>Edit Member : {id}</div>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
}

function Page() {
  const {token} = useContext(TokenContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.isReady && router.query;  
  const { data:member, isError:isErrorMember, isLoading:isLoadingMember } = useMemberAdminQuery({ id }, token);
  const { data:regions, isError, isLoading } = useRegionsListQuery(token);
  if (isError || isErrorMember) return <PopupError isError={isError || isErrorMember} />
  if (isLoading || isLoadingMember || loading) return <LoadingScreen />
  return <EditMember props={{member, regions, id, token, setLoading}} />
}

const Index = () => {
  return (
    <Layout>
      <Page />
    </Layout>
  );
}

export default Index;

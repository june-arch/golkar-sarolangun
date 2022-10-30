/* eslint-disable react-hooks/exhaustive-deps */
import { FormikProvider, useFormik } from 'formik';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import * as Yup from 'yup';

import { Form } from '@/components/admin/Form';
import PopupError from '@/components/error/PopupError';
import LoadingScreen from '@/components/loading/LoadingScreen';
import { headerItemRegions } from '@/components/resource/table-admin';

import { useGetOneRegionAdmin, usePatchOneRegionAdmin } from '@/controller/region/use-region';
import { TokenContext } from '@/helpers/hooks/use-context';
import { getChangedValues } from '@/helpers/utils/common';
const Layout = dynamic(
  () => import('@/components/admin/Layout'),
  { ssr: false }
);


function EditRegion({ props }) {
  const { region, id, token, setLoading } = props;
  const router = useRouter();
  const initialValues = {
    name: region.data.name,
    kemendagri_code: region.data.kemendagri_code,
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .max(90, 'Must be 90 characters or less')
      .required('Required'),
    kemendagri_code: Yup.string()
      .max(10, 'Must be 10 characters or less')
      .required('Required'),
  });
  const mutation = usePatchOneRegionAdmin(router, setLoading);
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      const editedValues = getChangedValues(values, initialValues);
      mutation.mutate({payload: editedValues, id, token});
    },
  });

  return (
    <div className='mx-auto max-w-7xl p-5 '>
      <FormikProvider value={formik}>
        <Form formik={formik} header={headerItemRegions}>
          <div className='flex flex-col items-center justify-between  space-y-5 py-6 md:flex-row md:space-y-0'>
            <div className='text-3xl'>Edit Region : {id}</div>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
}

const Page = () => {
  const {token} = useContext(TokenContext);
  const [loading, setLoading] = useState(false);  
  const router = useRouter();
  const { id } = router.isReady && router.query;
  const { data:region, isError, isLoading } = useGetOneRegionAdmin({ id }, token);
  if (isError) return <PopupError isError={isError} />
  if (isLoading || loading) return <LoadingScreen />
  return <EditRegion props={{region, id, token, setLoading}} />;
};

const Index = () => {
  return (
    <Layout>
      <Page />
    </Layout>
  )
}

export default Index;

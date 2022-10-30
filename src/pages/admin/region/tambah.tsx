import { FormikProvider, useFormik } from 'formik';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import * as Yup from 'yup';

import { Form } from '@/components/admin/Form';
import { headerItemRegions } from '@/components/resource/table-admin';

import { usePostOneRegionAdmin } from '@/controller/region/use-region';
import { TokenContext } from '@/helpers/hooks/use-context';
const Layout = dynamic(
  () => import('@/components/admin/Layout'),
  { ssr: false }
);

function Page() {
  const {token} = useContext(TokenContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const mutation = usePostOneRegionAdmin(router, setLoading);
  const formik = useFormik({
    initialValues: {
      name: '',
      kemendagri_code: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .max(90, 'Must be 90 characters or less')
        .required('Required'),
      kemendagri_code: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      mutation.mutate({payload: values, token});
    },
  });
  return (
    <div className='mx-auto max-w-7xl p-5 '>
      <FormikProvider value={formik}>
        <Form formik={formik} header={headerItemRegions}>
          <div className='flex flex-col items-center justify-between  space-y-5 py-6 md:flex-row md:space-y-0'>
            <div className='text-3xl'>Tambah Region</div>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
}

const Index = () => {
  return (
    <Layout>
      <Page />
    </Layout>
  );
};

export default Index;

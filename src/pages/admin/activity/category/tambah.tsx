import { FormikProvider, useFormik } from 'formik';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import * as Yup from 'yup';

import { Form } from '@/components/admin/Form';
import { headerItemActivityCateogries } from '@/components/resource/table-admin';

import { useActivityCategoryPostAdminQuery } from '@/helpers/hooks/react-query/use-activity-category';
import { TokenContext } from '@/helpers/hooks/use-context';
const Layout = dynamic(
  () => import('@/components/admin/Layout'),
  { ssr: false }
);

function Page() {
  const {token} = useContext(TokenContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const mutation = useActivityCategoryPostAdminQuery(router, setLoading);
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .max(90, 'Must be 90 characters or less')
        .required('Required'),
      description: Yup.string()
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
        <Form formik={formik} header={headerItemActivityCateogries}>
          <div className='flex flex-col items-center justify-between  space-y-5 py-6 md:flex-row md:space-y-0'>
            <div className='text-3xl'>Tambah Activity Category</div>
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

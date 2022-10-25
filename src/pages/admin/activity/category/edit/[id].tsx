/* eslint-disable react-hooks/exhaustive-deps */
import { FormikProvider, useFormik } from 'formik';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import * as Yup from 'yup';

import { Form } from '@/components/admin/Form';
import LoadingScreen from '@/components/LoadingScreen';
import PopupError from '@/components/PopupError';
import { headerItemActivityCateogries } from '@/components/resource/table-admin';

import { useActivityCategoryAdminQuery, useActivityCategoryPatchAdminQuery } from '@/helpers/hooks/react-query/use-activity-category';
import { TokenContext } from '@/helpers/hooks/use-context';
import { getChangedValues } from '@/helpers/utils/common';
const Layout = dynamic(
  () => import('@/components/admin/Layout'),
  { ssr: false }
);

function EditActivityCategory({ props }) {
  const { activityCategory, id, token, setLoading } = props;
  const router = useRouter();
  const initialValues = {
    name: activityCategory.data.name,
    description: activityCategory.data.description,
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .max(90, 'Must be 90 characters or less')
      .required('Required'),
    description: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
  });
  const mutation = useActivityCategoryPatchAdminQuery(router, setLoading);
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
        <Form formik={formik} header={headerItemActivityCateogries}>
          <div className='flex flex-col items-center justify-between  space-y-5 py-6 md:flex-row md:space-y-0'>
            <div className='text-3xl'>Activity Category : {id}</div>
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
  const { data:activityCategory, isError, isLoading } = useActivityCategoryAdminQuery({ id }, token);
  if (isError) return <PopupError isError={isError} />
  if (isLoading || loading) return <LoadingScreen />
  return <EditActivityCategory props={{activityCategory, id, token, setLoading}} />;
};

const Index = () => {
  return (
    <Layout>
      <Page />
    </Layout>
  )
}

export default Index;

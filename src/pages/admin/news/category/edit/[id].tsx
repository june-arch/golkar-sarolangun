/* eslint-disable react-hooks/exhaustive-deps */
import { FormikProvider, useFormik } from 'formik';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import * as Yup from 'yup';

import { Form } from '@/components/admin/Form';
import PopupError from '@/components/error/PopupError';
import LoadingScreen from '@/components/loading/LoadingScreen';
import { headerItemNewsCateogries } from '@/components/resource/table-admin';

import { useGetOneNewsCategoryAdmin, usePatchOneNewsCategoryAdmin } from '@/controller/news-category/use-news-category';
import { TokenContext } from '@/helpers/hooks/use-context';
import { getChangedValues } from '@/helpers/utils/common';
const Layout = dynamic(
  () => import('@/components/admin/Layout'),
  { ssr: false }
);

function EditNewsCategory({ props }) {
  const { newsCategory, id, token, setLoading } = props;
  const router = useRouter();
  const initialValues = {
    name: newsCategory.data.name,
    description: newsCategory.data.description,
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .max(90, 'Must be 90 characters or less')
      .required('Required'),
    description: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
  });
  const mutation = usePatchOneNewsCategoryAdmin(router, setLoading);
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
        <Form formik={formik} header={headerItemNewsCateogries}>
          <div className='flex flex-col items-center justify-between  space-y-5 py-6 md:flex-row md:space-y-0'>
            <div className='text-3xl'>News Category : {id}</div>
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
  const { data:newsCategory, isError, isLoading } = useGetOneNewsCategoryAdmin({id},token);
  if (isError) return <PopupError isError={isError} />
  if (isLoading || loading) return <LoadingScreen />
  return <EditNewsCategory props={{newsCategory,id,token,setLoading}} />;
};

const Index = () => {
  return (
    <Layout>
      <Page />
    </Layout>
  )
}

export default Index;

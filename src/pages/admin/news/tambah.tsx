import { FormikProvider, useFormik } from 'formik';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import * as Yup from 'yup';

import { Form } from '@/components/admin/Form';
import LoadingScreen from '@/components/loading/LoadingScreen';
import { formNews } from '@/components/resource/table-admin';

import { usePostOneNewsAdmin } from '@/controller/news/use-news';
import { useGetListNewsCategoryAdmin } from '@/controller/news-category/use-news-category';
import { TokenContext } from '@/helpers/hooks/use-context';
import {
  checkIfFilesAreCorrectType,
  checkIfFilesAreTooBig,
} from '@/helpers/utils/common';

const Layout = dynamic(
  () => import('@/components/admin/Layout'),
  { ssr: false }
);

function Page() {
  const {token} = useContext(TokenContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const mutation = usePostOneNewsAdmin(router, setLoading);
  const formik = useFormik({
    initialValues: {
      title: '',
      category_news_id: '',
      content: '',
      author: '',
      image: '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(90, 'Must be 90 characters or less')
        .required('Required'),
      category_news_id: Yup.number()
        .max(20, 'Must be number')
        .required('Required'),
      image: Yup.mixed()
        .test('fileSize', 'The file is too large', checkIfFilesAreTooBig)
        .test('fileType', 'The file type invalid', checkIfFilesAreCorrectType)
        .required(),
      content: Yup.string().min(3).max(2000).required('Required'),
      author: Yup.string()
        .max(90, 'Must be 90 characters or less')
        .required('Required'),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      mutation.mutate({payload:values, token})
    },
  });
  const { data:newsCategory, isError, isLoading } = useGetListNewsCategoryAdmin(token);
  if (isError)
    return (
      <div>
        error fetch data with error code: {isError},{' '}
        {JSON.stringify(isError)}
      </div>
    );
    if (isLoading || loading) return <LoadingScreen/>;
  const listCategory = newsCategory.data.map((item) => {
    return { label: item.name, value: item.id_category_news };
  });
  return (
    <div className='mx-auto max-w-7xl p-5 '>
      <FormikProvider value={formik}>
        <Form formik={formik} header={formNews} data={listCategory}>
          <div className='flex flex-col items-center justify-between  space-y-5 py-6 md:flex-row md:space-y-0'>
            <div className='text-3xl'>Tambah News</div>
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

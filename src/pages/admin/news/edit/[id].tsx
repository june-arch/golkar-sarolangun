/* eslint-disable react-hooks/exhaustive-deps */
import { FormikProvider, useFormik } from 'formik';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import * as Yup from 'yup';

import { Form } from '@/components/admin/Form';
import PopupError from '@/components/error/PopupError';
import LoadingScreen from '@/components/loading/LoadingScreen';
import { formNews } from '@/components/resource/table-admin';

import { useGetOneNewsAdmin, usePatchOneNewsAdmin } from '@/controller/news/use-news';
import { useGetListNewsCategoryAdmin } from '@/controller/news-category/use-news-category';
import { TokenContext } from '@/helpers/hooks/use-context';
import {
  checkIfFilesAreCorrectType,
  checkIfFilesAreTooBig,
  getChangedValues,
} from '@/helpers/utils/common';
const Layout = dynamic(
  () => import('@/components/admin/Layout'),
  { ssr: false }
);

function EditNews({ props }) {
  const { news, newsCategory, id, token, setLoading } = props;
  const router = useRouter();
  const initialValues = {
    title: news.data.title,
    category_news_id: news.data.category_news_id,
    content: news.data.content,
    author: news.data.author,
    image: '',
  };
  const validationSchema = Yup.object({
    title: Yup.string()
      .max(90, 'Must be 90 characters or less')
      .required('Required'),
    category_news_id: Yup.number()
      .max(20, 'Must be number')
      .required('Required'),
    image: Yup.mixed()
      .test('fileSize', 'The file is too large', checkIfFilesAreTooBig)
      .test('fileType', 'The file type invalid', checkIfFilesAreCorrectType)
      .nullable(),
    content: Yup.string().min(3).max(2000).required('Required'),
    author: Yup.string()
      .max(90, 'Must be 90 characters or less')
      .required('Required'),
  });
  const mutation = usePatchOneNewsAdmin(router, setLoading)
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const editedValues = getChangedValues(values, initialValues);
      mutation.mutate({payload: editedValues, id, token})
    },
  });

  const listCategory = newsCategory.data.map((item) => {
    return { label: item.name, value: item.id_category_news };
  });
  return (
    <div className='mx-auto max-w-7xl p-5 '>
      <FormikProvider value={formik}>
        <Form
          formik={formik}
          header={formNews}
          data={listCategory}
          content={news?.data}
        >
          <div className='flex flex-col items-center justify-between  space-y-5 py-6 md:flex-row md:space-y-0'>
            <div className='text-3xl'>Edit News : {id}</div>
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
  const { data:news, isError:isErrorNews, isLoading:isLoadingNews } = useGetOneNewsAdmin({ id }, token);
  const { data:newsCategory, isError, isLoading } = useGetListNewsCategoryAdmin(token);
  if (isError || isErrorNews) return <PopupError isError={isError || isErrorNews} />
  if (isLoading || isLoadingNews || loading) return <LoadingScreen />
  return <EditNews props={{news, newsCategory, id, token, setLoading}} />
};

const Index = () => {
  return (
    <Layout>
      <Page />
    </Layout>
  )
}

export default Index;

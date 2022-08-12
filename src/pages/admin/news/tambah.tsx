import { FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

import { Form } from '@/components/admin/Form';
import { Layout } from '@/components/admin/layout/Main';

import { useAppSelector } from '@/helpers/redux/hook';
import { selectToken } from '@/helpers/redux/slice/auth-admin.slice';
import { formNews } from '@/helpers/resource/table-admin';
import {
  checkIfFilesAreCorrectType,
  checkIfFilesAreTooBig,
} from '@/helpers/utils/common';
import { postNews } from '@/service/admin/news';
import { useGetNewsCategoryList } from '@/service/admin/news-category';

function AddNews() {
  const token = useAppSelector(selectToken);
  const router = useRouter();
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
      const result = await postNews(values, token);
      if (result.code !== 200) {
        if (result.status == 400) {
          result.info.data.map((value) =>
            Object.keys(value).map((key) =>
              formik.setFieldError(key, value[key])
            )
          );
        }
      }
      if (result.data && result.success == true) {
        return router.push('/admin/news');
      }
    },
  });
  const { newsCategory, isError, isLoading } = useGetNewsCategoryList(token);
  if (isError)
    return (
      <div>
        error fetch data with error code: {isError['status']},{' '}
        {JSON.stringify(isError['info'])}
      </div>
    );
  if (isLoading) return <div>Loading ...</div>;
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

const Tambah = () => {
  return (
    <Layout>
      <AddNews />
    </Layout>
  );
};

export default Tambah;

import { FormikProvider, useFormik } from 'formik';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import * as Yup from 'yup';

import { Form } from '@/components/admin/Form';
import PopupError from '@/components/error/PopupError';
import LoadingScreen from '@/components/loading/LoadingScreen';
import { formActivity } from '@/components/resource/table-admin';

import { usePostOneActivityAdmin } from '@/controller/activity/use-activity';
import { useGetListActivityCategoryAdmin } from '@/controller/activity-category/use-activity-category';
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
  const mutation = usePostOneActivityAdmin(router, setLoading);
  const formik = useFormik({
    initialValues: {
      title: '',
      category_activity_id: '',
      video: '',
      image: [],
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(90, 'Must be 90 characters or less')
        .required('Required'),
      category_activity_id: Yup.number()
        .max(20, 'Must be number')
        .required('Required'),
      image: Yup.array(
        Yup.mixed()
          .test('fileSize', 'The file is too large', checkIfFilesAreTooBig)
          .test('fileType', 'The file type invalid', checkIfFilesAreCorrectType)
          .required()
      ).nullable(),
      video: Yup.string()
        .matches(
          /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/,
          'Enter correct url!'
        )
        .nullable(),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      return mutation.mutate({payload: values, token});
    },
  });
  const { data:activityCategory, isError, isLoading } = useGetListActivityCategoryAdmin(token);
  if (isError) return <PopupError isError={isError} />
  if (isLoading || loading) return <LoadingScreen />;
  const listCategoryActivity = activityCategory.data.map((item) => {
    return { label: item.name, value: item.id_category_activity };
  });
  return (
    <div className='mx-auto max-w-7xl p-5 '>
      <FormikProvider value={formik}>
        <Form formik={formik} header={formActivity} data={listCategoryActivity} isMultiple={true}>
          <div className='flex flex-col items-center justify-between  space-y-5 py-6 md:flex-row md:space-y-0'>
            <div className='text-3xl'>Tambah Activity</div>
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

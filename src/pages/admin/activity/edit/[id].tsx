/* eslint-disable react-hooks/exhaustive-deps */
import { FormikProvider, useFormik } from 'formik';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import * as Yup from 'yup';

import { Form } from '@/components/admin/Form';
import LoadingScreen from '@/components/LoadingScreen';
import PopupError from '@/components/PopupError';
import { formActivity } from '@/components/resource/table-admin';

import { useActivityOneAdminQuery, useActivityPatchAdminQuery } from '@/helpers/hooks/react-query/use-activity';
import { useActivityCategoryListQuery } from '@/helpers/hooks/react-query/use-activity-category';
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

function EditActivity({ props }) {
  const { activity, activityCategory, id, token, setLoading } = props;
  const router = useRouter();
  const initialValues = {
    title: activity.data['title'],
    category_activity_id: activity.data['category_activity_id'],
    video: activity.data['video'],
    image: [],
  };
  const validationSchema = Yup.object({
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
  });
  const mutation = useActivityPatchAdminQuery(router, setLoading);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, formik) => {
      const editedValues = getChangedValues(values, initialValues);
      mutation.mutate({payload: editedValues, id, token});
    },
  });
  const listCategory = activityCategory.data.map((item) => {
    return { label: item.name, value: item.id_category_activity };
  });
  return (
    <div className='mx-auto max-w-7xl p-5 '>
      <FormikProvider value={formik}>
        <Form
          formik={formik}
          header={formActivity}
          data={listCategory}
          content={activity.data}
          isMultiple={true}
        >
          <div className='flex flex-col items-center justify-between  space-y-5 py-6 md:flex-row md:space-y-0'>
            <div className='text-3xl'>Edit Activity</div>
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
  const { data:activity, isError: isErrorActivity, isLoading: isLoadingActivity} = useActivityOneAdminQuery({ id }, token);
  const { data:activityCategory, isError, isLoading } = useActivityCategoryListQuery(token);
  if (isError || isErrorActivity) return <PopupError isError={isError || isErrorActivity} />
  if (isLoading || isLoadingActivity || loading)return <LoadingScreen />
  return <EditActivity props={{ activity, activityCategory, id, token, setLoading}} />;
};

const Index = () => {
  return (
    <Layout>
      <Page />
    </Layout>
  )
}

export default Index;

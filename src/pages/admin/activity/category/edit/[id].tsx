/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

import { Form } from '@/components/admin/Form';
import { Layout } from '@/components/admin/layout/Main';

import { useAppSelector } from '@/helpers/redux/hook';
import { selectToken } from '@/helpers/redux/slice/auth-admin.slice';
import { headerItemActivityCateogries } from '@/helpers/resource/table-admin';
import { getChangedValues } from '@/helpers/utils/common';
import {
  putActivityCategory,
  useGetActivityCategory,
} from '@/service/admin/activity-category';

function EditActivityCategory({ props }) {
  const { activityCategory, id, token, router } = props;
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
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      const editedValues = getChangedValues(values, initialValues);
      const result = await putActivityCategory(editedValues, id, token);
      if (result.code !== 200) {
        if (result.status == 400) {
          result.info.data.map((value) =>
            Object.keys(value).map((key) =>
              formik.setFieldError(key, value[key])
            )
          );
        }
      }
      if (result.success == true) {
        return router.push('/admin/activity/category');
      }
    },
  });

  return (
    <div className='mx-auto max-w-7xl p-5 '>
      <Form formik={formik} header={headerItemActivityCateogries}>
        <div className='flex flex-col items-center justify-between  space-y-5 py-6 md:flex-row md:space-y-0'>
          <div className='text-3xl'>Activity Category : {id}</div>
        </div>
      </Form>
    </div>
  );
}

const Edit = () => {
  const token = useAppSelector(selectToken);
  const router = useRouter();
  const { id } = router.query;
  const value = Array.isArray(id) ? id[0] : id;
  const { activityCategory, isError, isLoading } = useGetActivityCategory(
    { id: value },
    token
  );
  if (isError)
    return (
      <div>
        error fetch data with error code: {isError['status']},{' '}
        {JSON.stringify(isError['info'])}
      </div>
    );
  if (isLoading) return <div>Loading ...</div>;
  const props = {
    activityCategory,
    id,
    token,
    router,
  };
  return (
    <Layout>
      <EditActivityCategory props={props} />
    </Layout>
  );
};

export default Edit;

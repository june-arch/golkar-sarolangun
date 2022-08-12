import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

import { Form } from '@/components/admin/Form';
import { Layout } from '@/components/admin/layout/Main';

import { useAppSelector } from '@/helpers/redux/hook';
import { selectToken } from '@/helpers/redux/slice/auth-admin.slice';
import { headerItemRegions } from '@/helpers/resource/table-admin';
import { postRegion } from '@/service/admin/region.admin';

function AddRegion() {
  const token = useAppSelector(selectToken);
  const router = useRouter();
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
      const result = await postRegion(values, token);
      if (result.code !== 200) {
        formik.errors.name = 'name tidak valid';
        formik.errors.kemendagri_code = 'kemendagri_code tidak valid';
      }
      if (result.data) {
        return router.push('/admin/region');
      }
    },
  });
  return (
    <div className='mx-auto max-w-7xl p-5 '>
      <Form formik={formik} header={headerItemRegions}>
        <div className='flex flex-col items-center justify-between  space-y-5 py-6 md:flex-row md:space-y-0'>
          <div className='text-3xl'>Tambah Region</div>
        </div>
      </Form>
    </div>
  );
}

const Tambah = () => {
  return (
    <Layout>
      <AddRegion />
    </Layout>
  );
};

export default Tambah;

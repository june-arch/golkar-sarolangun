import { useRouter } from 'next/router';

import { Input } from './Input';

export const Form = ({
  formik,
  header,
  data,
  content,
  isMultiple,
  children,
}: {
  formik: any;
  header: any;
  data?: any;
  content?: any;
  isMultiple?: boolean;
  children?: any;
}) => {
  const router = useRouter();
  return (
    <div className='w-full'>
      {children}
      <form onSubmit={formik.handleSubmit} encType='multipart/form-data' className='space-y-12'>
        <div className='flex flex-wrap items-center justify-center'>
          {header.map((value, key) => (
            <Input
              value={value}
              formik={formik}
              data={data}
              content={content}
              key={key}
              isMultiple={isMultiple}
            />
          ))}
        </div>

        <div className='space-x-2 text-center'>
          <button
            type='submit'
            disabled={formik.isSubmitting}
            className='inline-block rounded w-40 bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'
          >
            Submit
          </button>
          <button
            type='button'
            onClick={() => router.back()}
            className='inline-block rounded w-40 bg-gray-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg'
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

import { Field } from 'formik';
import Image from 'next/image';

import 'draft-js/dist/Draft.css';

import CustomSelect from './CustomSelect';
import { TextEditor } from './MyEditor';

export const Input = ({
  value,
  formik,
  data,
  content,
  bucket,
  isMultiple,
}: {
  value: string;
  formik: any;
  data?: any;
  content?: any;
  bucket?: string;
  isMultiple?: boolean;
}) => {
  const handleInput = () => {
    if (value == 'image') {
      return (
        <div>
          {isMultiple ? (
            <>
              <input
                type='file'
                className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                id={value}
                name={`${value}[]`}
                onChange={(e) =>
                  formik.setFieldValue(value, e.currentTarget.files)
                }
                accept={'image/*'}
                multiple={true}
              />
              {content &&
                content.image &&
                content.image
                  .split(',')
                  .map((item, index) => (
                    <Image
                      key={index}
                      id={value}
                      src={
                        process.env.DOMAIN_API +
                        '/api/v1?file=' +
                        item +
                        '&bucket=' +
                        bucket
                      }
                      alt='your image'
                      width={200}
                      height={200}
                    />
                  ))}
            </>
          ) : (
            <>
              <input
                type='file'
                className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                id={value}
                name={value}
                onChange={(e) =>
                  formik.setFieldValue(value, e.currentTarget.files[0])
                }
                accept={'image/*'}
              />
              {content && content.image && (
                <Image
                  id={value}
                  src={
                    process.env.DOMAIN_API +
                    '/api/v1?file=' +
                    content.image +
                    '&bucket=' +
                    bucket
                  }
                  alt='your image'
                  width={200}
                  height={200}
                />
              )}
            </>
          )}
        </div>
      );
    }
    if (value == 'photo') {
      return (
        <div>
          {isMultiple ? (
            <>
              <input
                type='file'
                className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                id={value}
                name={`${value}[]`}
                onChange={(e) =>
                  formik.setFieldValue(value, e.currentTarget.files)
                }
                accept={'image/*'}
                multiple={true}
              />
              {content &&
                content.photo &&
                content.photo
                  .split(',')
                  .map((item, index) => (
                    <Image
                      key={index}
                      id={value}
                      src={
                        process.env.DOMAIN_API +
                        '/api/v1?file=' +
                        item +
                        '&bucket=' +
                        bucket
                      }
                      alt='your image'
                      width={200}
                      height={200}
                    />
                  ))}
            </>
          ) : (
            <>
              <input
                type='file'
                className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                id={value}
                name={value}
                onChange={(e) =>
                  formik.setFieldValue(value, e.currentTarget.files[0])
                }
                accept={'image/*'}
              />
              {content && content.photo && (
                <Image
                  id={value}
                  src={
                    process.env.DOMAIN_API +
                    '/api/v1?file=' +
                    content.photo +
                    '&bucket=' +
                    bucket
                  }
                  alt='your image'
                  width={200}
                  height={200}
                />
              )}
            </>
          )}
        </div>
      );
    }
    if (value == 'photo_ktp') {
      return (
        <div>
          {isMultiple ? (
            <>
              <input
                type='file'
                className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                id={value}
                name={`${value}[]`}
                onChange={(e) =>
                  formik.setFieldValue(value, e.currentTarget.files)
                }
                accept={'image/*'}
                multiple={true}
              />
              {content &&
                content.photo_ktp &&
                content.photo_ktp
                  .split(',')
                  .map((item, index) => (
                    <Image
                      key={index}
                      id={value}
                      src={
                        process.env.DOMAIN_API +
                        '/api/v1?file=' +
                        item +
                        '&bucket=' +
                        bucket
                      }
                      alt='your image'
                      width={200}
                      height={200}
                    />
                  ))}
            </>
          ) : (
            <>
              <input
                type='file'
                className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                id={value}
                name={value}
                onChange={(e) =>
                  formik.setFieldValue(value, e.currentTarget.files[0])
                }
                accept={'image/*'}
              />
              {content && content.photo_ktp && (
                <Image
                  id={value}
                  src={
                    process.env.DOMAIN_API +
                    '/api/v1?file=' +
                    content.photo_ktp +
                    '&bucket=' +
                    bucket
                  }
                  alt='your image'
                  width={200}
                  height={200}
                />
              )}
            </>
          )}
        </div>
      );
    }
    if (value == 'content') {
      return (
        <TextEditor
          content={content && content.content}
          setFieldValue={(val) => formik.setFieldValue('content', val)}
          value={formik.values[value]}
        />
      );
    }
    if (
      value
        .split('_')
        .map((value) => value.toLowerCase())
        .find((item) => item == 'id')
    ) {
      return (
        data && (
          <Field
            className='custom-select'
            name={value}
            options={data}
            component={CustomSelect}
            placeholder='Select a id...'
            isMulti={false}
          />
        )
      );
    }
    if (value == 'gender') {
      return (
        <Field
          className='custom-select'
          name={value}
          options={[
            { label: 'Laki-laki', value: 'L' },
            { label: 'Perempuan', value: 'P' },
          ]}
          component={CustomSelect}
          placeholder='Select a gender...'
          isMulti={false}
        />
      );
    }
    if (value == 'status') {
      return (
        <Field
          className='custom-select'
          name={value}
          options={[
            { label: 'Pending', value: 0 },
            { label: 'Approved', value: 1 },
            { label: 'Blocked', value: 2 },
          ]}
          component={CustomSelect}
          placeholder='Select a status...'
          isMulti={false}
        />
      );
    }
    if (
      value
        .split('_')
        .map((value) => value.toLowerCase())
        .find((item) => item == 'date')
    ) {
      return (
        <input
          type='date'
          className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
          id={value}
          name={value}
          onChange={formik.handleChange}
          value={formik.values[value]}
        />
      );
    }
    return (
      <input
        type='text'
        className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
        id={value}
        name={value}
        onChange={formik.handleChange}
        value={formik.values[value]}
        placeholder={`Name of ${value}`}
      />
    );
  };
  const handleValue = (text: string) => {
    return text
      .split('_')
      .map((item) => (item = item.charAt(0).toUpperCase() + item.substring(1)))
      .join(' ')
      .replace('Id', '')
      .trim();
  };
  return (
    <div className='mb-6'>
      <label htmlFor={value} className='block pb-2 text-xl'>
        {handleValue(value)}
      </label>
      {handleInput()}
      {formik.touched[value] && formik.errors[value] && (
        <p className=' text-red-500'>{formik.errors[value]}</p>
      )}
    </div>
  );
};

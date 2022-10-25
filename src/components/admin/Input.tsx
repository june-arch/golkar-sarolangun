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
  isMultiple,
}: {
  value: string;
  formik: any;
  data?: any;
  content?: any;
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
              {content && content.image && content.image.split(',')
                  .map((item, index) => (
                    <Image
                      key={index}
                      id={value}
                      src={item}
                      alt='your image'
                      width={200}
                      height={200}
                    />
                  ))}
            </>
          ) : (
            <div className='flex relative w-500px h-48px group justify-center items-center z-1001'>
              <input
                type='file'
                className='form-control m-0 block w-full h-[210px] rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                id={value}
                name={value}
                onChange={(e) =>
                  formik.setFieldValue(value, e.currentTarget.files[0])
                }
                accept={'image/*'}
              />
              {content && content.image && (
                <span className='flex absolute right-0 bg-transparent rounded text-base text-gray-600 p-2'>
                  <Image
                    id={value}
                    src={content.image}
                    alt='your image'
                    width={200}
                    height={200}
                  />
                </span>
              )}
            </div>
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
                      src={item}
                      alt='your image'
                      width={200}
                      height={200}
                    />
                  ))}
            </>
          ) : (
            <div className='flex relative w-500px h-48px group justify-center items-center z-1001'>
              <input
                type='file'
                className='form-control m-0 block w-full h-[210px] rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                id={value}
                name={value}
                onChange={(e) =>
                  formik.setFieldValue(value, e.currentTarget.files[0])
                }
                accept={'image/*'}
              />
              {content && content.photo && (
                <span className='flex absolute right-0 bg-transparent rounded text-base text-gray-600 p-2'>
                  <Image
                    id={value}
                    src={content.photo}
                    alt='your image'
                    width={200}
                    height={200}
                  />
                </span>
              )}
            </div>
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
              {content && content.photo_ktp && content.photo_ktp.split(',')
                  .map((item, index) => (
                    <Image
                      key={index}
                      id={value}
                      src={item}
                      alt='your image'
                      width={200}
                      height={200}
                    />
                  ))}
            </>
          ) : (
            <div className='flex relative w-500px h-48px group justify-center items-center z-1001'>
              <input
                type='file'
                className='form-control m-0 w-full h-[210px] block rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                id={value}
                name={value}
                onChange={(e) =>
                  formik.setFieldValue(value, e.currentTarget.files[0])
                }
                accept={'image/*'}
              />
              {content && content.photo_ktp && (
                <span className='flex absolute right-0 bg-transparent rounded text-base text-gray-600 p-2'>
                  <Image
                  id={value}
                  src={content.photo_ktp}
                  alt='your image'
                  width={200}
                  height={200}
                />
                </span>
              )}
            </div>
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
    <div className={`mb-6 w-full md:w-1/3 px-1 ${value == 'address' || value == 'content' ? 'md:!w-full' : ''} ${value == 'photo' || value == 'photo_ktp' || value == 'image' ? 'md:!w-1/2' : ''}`}>
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

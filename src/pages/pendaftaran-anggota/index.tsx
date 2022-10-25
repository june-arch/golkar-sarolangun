import { CheckIcon } from '@heroicons/react/outline';
import { FormikProvider, useFormik } from 'formik';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

import Bookmark from '@/components/icon/bookmark';
import BookmarkNoto from '@/components/icon/bookmarknoto';
import Footer from '@/components/landing-page/Footer';
import Layout from '@/components/landing-page/Layout';
import Navbar from '@/components/landing-page/Navbar';

import { NavItem } from '@/helpers/interface/types';
import { contentOne } from '@/components/resource/navigation';
import { checkIfFilesAreCorrectType, checkIfFilesAreTooBig } from '@/helpers/utils/common';
import { postMember } from '@/service/landing-page/member';
import { getAllRegions } from '@/service/landing-page/region';

type Props = {
  navItem: NavItem;
  regions: any;
  gender: any;
};

const PendaftaranAnggota = ({ navItem, regions, gender }: Props) => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      region_id: '',
      nik: '',
      photo: '',
      fullname: '',
      photo_ktp: '',
      address: '',
      phone_number: '',
      email: '',
      place_of_birth: '',
      date_of_birth: '',
      gender: '',
    },
    validationSchema: Yup.object({
      region_id: Yup.number().required(),
      nik: Yup.string().max(25).min(16).required(),
      fullname: Yup.string().max(255).required(),
      photo: Yup.mixed()
        .test('fileSize', 'The file is too large', checkIfFilesAreTooBig)
        .test('fileType', 'The file type invalid', checkIfFilesAreCorrectType)
        .required(),
      photo_ktp: Yup.mixed()
        .test('fileSize', 'The file is too large', checkIfFilesAreTooBig)
        .test('fileType', 'The file type invalid', checkIfFilesAreCorrectType)
        .required(),
      address: Yup.string().required(),
      phone_number: Yup.string().max(15).required(),
      email: Yup.string().email().required(),
      place_of_birth: Yup.string().max(100).required(),
      date_of_birth: Yup.string().required(),
      gender: Yup.string().required(),
    }),
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {      
      const result = await postMember(values);
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
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Berhasil daftar tolong tunggu konfirmasi dari admin atau cek progress di homepage',
          showConfirmButton: false,
          timer: 5500
        })
        return resetForm();
      }
    },
  });
  return (
    <Layout>
      <main className='bg-[#F9F9F9]'>
        <div className='sticky top-0 z-50 bg-primary'>
          <Navbar nav-items={navItem['nav-items']} />
        </div>
        <section className='mx-auto flex flex-col space-y-6 p-8'>
          <div className='flex flex-col space-y-2 border-l-8 border-l-primary bg-[#EEEEEE] px-6 py-4'>
            <span className='h-16 w-16'>
              <Bookmark />
            </span>
            <div className='text-[15px] font-[700]'>
              Persyaratan Menjadi Anggota
            </div>
            <div className='flex flex-col space-y-2'>
              <div className='flex items-center space-x-2'>
                <span className='rounded-full bg-primary p-[2px]'>
                  <CheckIcon className='h-5 w-5 text-white' />
                </span>
                <span className='text-xs font-[500]'>
                  Bertempat tinggal di Jambi
                </span>
              </div>
              <div className='flex items-center space-x-2'>
                <span className='rounded-full bg-primary p-[2px]'>
                  <CheckIcon className='h-5 w-5 text-white' />
                </span>
                <span className='text-xs font-[500]'>
                  Mempunyai KTP provinsi Jambi
                </span>
              </div>
              <div className='flex items-center space-x-2'>
                <span className='rounded-full bg-primary p-[2px]'>
                  <CheckIcon className='h-5 w-5 text-white' />
                </span>
                <span className='text-xs font-[500]'>
                  Mampu berkomunikasi dengan baik
                </span>
              </div>
            </div>
          </div>
          <div className='flex flex-col space-y-2 border-l-8 border-l-green-500 bg-[#EEEEEE] px-6 py-4'>
            <span className='h-16 w-16'>
              <BookmarkNoto />
            </span>
            <div className='text-[15px] font-[700]'>
              Manfaat Menjadi Anggota
            </div>
            <div className='flex flex-col space-y-2'>
              <div className='flex items-center space-x-2'>
                <span className='rounded-full bg-green-500 p-[2px]'>
                  <CheckIcon className='h-5 w-5 text-white' />
                </span>
                <span className='text-xs font-[500]'>
                  Ikut webinar gratis pengembangan potensi
                </span>
              </div>
              <div className='flex items-center space-x-2'>
                <span className='rounded-full bg-green-500 p-[2px]'>
                  <CheckIcon className='h-5 w-5 text-white' />
                </span>
                <span className='text-xs font-[500]'>
                  Pelatihan eksklusif pengembangan usaha
                </span>
              </div>
              <div className='flex items-center space-x-2'>
                <span className='rounded-full bg-green-500 p-[2px]'>
                  <CheckIcon className='h-5 w-5 text-white' />
                </span>
                <span className='text-xs font-[500]'>
                  Ikut kegiatan produktif & eksklusif
                </span>
              </div>
            </div>
          </div>
          <div className='flex flex-col space-y-2 rounded-md border-2 border-[#EEEEEE] bg-[#EEEEEE] shadow-sm'>
            <div className='flex flex-col p-2 text-center'>
              <div className='text-[24px] font-[700] text-primary'>
                Pendaftaran
              </div>
              <div className='text-[15px] font-[700] text-black'>
                Kartu Tanda Anggota Online
              </div>
            </div>
            <FormikProvider value={formik}>
              <form className='flex flex-col space-y-4 pb-4' onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                <div className='flex flex-col space-y-2 bg-white py-4 px-6'>
                  <label className='text-[12px] font-[400]'>
                    Nomor NIK/KTP (*)
                  </label>
                  <input
                    type='text'
                    className='form-control m-0 block h-[34px] w-full min-w-0 flex-auto border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-1 text-[12px] font-normal text-gray-700 transition ease-in-out focus:border-primary focus:bg-white focus:text-gray-700 focus:outline-none'
                    placeholder='Contoh: 1503091306960001'
                    name='nik'
                    value={formik.values.nik}
                    onChange={formik.handleChange}
                    id='nik'
                  />
                  {formik.touched.nik && formik.errors.nik && (
                    <p className=' text-red-500'>{formik.errors.nik.toString()}</p>
                  )}
                  <label className='text-[12px] font-[400]'>
                    Nama Lengkap (*)
                  </label>
                  <input
                    type='text'
                    className='form-control m-0 block h-[34px] w-full min-w-0 flex-auto border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-1 text-[12px] font-normal text-gray-700 transition ease-in-out focus:border-primary focus:bg-white focus:text-gray-700 focus:outline-none'
                    placeholder='Contoh: Muhammad Budianto'
                    name='fullname'
                    value={formik.values.fullname}
                    onChange={formik.handleChange}
                    id='fullname'
                  />
                  {formik.touched.fullname && formik.errors.fullname && (
                    <p className=' text-red-500'>{formik.errors.fullname.toString()}</p>
                  )}
                  <label className='text-[12px] font-[400]'>
                    Tempat Lahir (*)
                  </label>
                  <input
                    type='text'
                    className='form-control m-0 block h-[34px] w-full min-w-0 flex-auto border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-1 text-[12px] font-normal text-gray-700 transition ease-in-out focus:border-primary focus:bg-white focus:text-gray-700 focus:outline-none'
                    placeholder='Contoh : Bungo'
                    name='place_of_birth'
                    value={formik.values.place_of_birth}
                    onChange={formik.handleChange}
                    id='place_of_birth'
                  />
                  {formik.touched.place_of_birth && formik.errors.place_of_birth && (
                    <p className=' text-red-500'>{formik.errors.place_of_birth.toString()}</p>
                  )}
                  <label className='text-[12px] font-[400]'>
                    Tanggal Lahir (*)
                  </label>
                  <input
                    type='date'
                    className='form-control m-0 block h-[34px] w-full min-w-0 flex-auto border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-1 text-[12px] font-normal text-gray-700 transition ease-in-out focus:border-primary focus:bg-white focus:text-gray-700 focus:outline-none'
                    placeholder='Contoh: Muara Bungo'
                    name='date_of_birth'
                    value={formik.values.date_of_birth}
                    onChange={formik.handleChange}
                    id='date_of_birth'
                  />
                  {formik.touched.date_of_birth && formik.errors.date_of_birth && (
                    <p className=' text-red-500'>{formik.errors.date_of_birth.toString()}</p>
                  )}
                  <label className='text-[12px] font-[400]'>
                    Jenis Kelamin (*)
                  </label>
                  <select
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    name='gender'
                    id='gender' 
                    className='form-control m-0 block h-[34px] w-full min-w-0 flex-auto border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-1 text-[12px] font-normal text-gray-700 transition ease-in-out focus:border-primary focus:bg-white focus:text-gray-700 focus:outline-none'>
                    <option value="">Pilih Jenis Kelamin</option>
                    {gender.map((value, i) => (<option key={i} value={value.value} >{value.label}</option>))}
                  </select>
                  {formik.touched.gender && formik.errors.gender && (
                    <p className=' text-red-500'>{formik.errors.gender.toString()}</p>
                  )}
                  <label className='text-[12px] font-[400]'>Email (*)</label>
                  <input
                    type='email'
                    className='form-control m-0 block h-[34px] w-full min-w-0 flex-auto border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-1 text-[12px] font-normal text-gray-700 transition ease-in-out focus:border-primary focus:bg-white focus:text-gray-700 focus:outline-none'
                    placeholder='Contoh: budi@gmail.com'
                    name='email'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    id='email'
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className=' text-red-500'>{formik.errors.email.toString()}</p>
                  )}
                  <label className='text-[12px] font-[400]'>
                    Nomor Telepon (*)
                  </label>
                  <input
                    type='text'
                    className='form-control m-0 block h-[34px] w-full min-w-0 flex-auto border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-1 text-[12px] font-normal text-gray-700 transition ease-in-out focus:border-primary focus:bg-white focus:text-gray-700 focus:outline-none'
                    placeholder='Contoh: 0821********'
                    name='phone_number'
                    onChange={formik.handleChange}
                    value={formik.values.phone_number}
                    id='phone_number'
                  />
                  {formik.touched.phone_number && formik.errors.phone_number && (
                    <p className=' text-red-500'>{formik.errors.phone_number.toString()}</p>
                  )}
                  <label className='text-[12px] font-[400]'>Alamat (*)</label>
                  <input
                    type='text'
                    className='form-control m-0 block h-[34px] w-full min-w-0 flex-auto border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-1 text-[12px] font-normal text-gray-700 transition ease-in-out focus:border-primary focus:bg-white focus:text-gray-700 focus:outline-none'
                    placeholder='Contoh: Jalan Apel Limau No. 32'
                    name='address'
                    onChange={formik.handleChange}
                    value={formik.values.address}
                    id='address'
                  />
                  {formik.touched.address && formik.errors.address && (
                    <p className=' text-red-500'>{formik.errors.address.toString()}</p>
                  )}
                  <label className='text-[12px] font-[400]'>Kecamatan (*)</label>
                  <select 
                    name='region_id'
                    value={formik.values.region_id}
                    onChange={formik.handleChange}
                    id='region_id' 
                    className='form-control m-0 block h-[34px] w-full min-w-0 flex-auto border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-1 text-[12px] font-normal text-gray-700 transition ease-in-out focus:border-primary focus:bg-white focus:text-gray-700 focus:outline-none'>
                    <option value="">Pilih Kecamatan</option>
                    {regions.map((value, i) => (<option key={i} value={value.value}>{value.label}</option>))}
                  </select>
                  {formik.touched.region_id && formik.errors.region_id && (
                    <p className=' text-red-500'>{formik.errors.region_id.toString()}</p>
                  )}
                  <label className='text-[12px] font-[400]'>Foto Wajah (*)</label>
                  <input
                    type='file'
                    className='form-control m-0 block h-[34px] w-full min-w-0 flex-auto border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-1 text-[12px] font-normal text-gray-700 transition ease-in-out focus:border-primary focus:bg-white focus:text-gray-700 focus:outline-none'
                    name='photo'
                    onChange={(e) =>
                      formik.setFieldValue('photo', e.currentTarget.files[0])
                    }
                    accept={'image/*'}
                    id='photo'
                  />
                  {formik.touched.photo && formik.errors.photo && (
                    <p className=' text-red-500'>{formik.errors.photo.toString()}</p>
                  )}
                  <p className='text-[11px]'>
                    Maksimal ukuran file 200kb dan format file JPEG
                  </p>
                  <label className='text-[12px] font-[400]'>Foto KTP (*)</label>
                  <input
                    type='file'
                    className='form-control m-0 block h-[34px] w-full min-w-0 flex-auto border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-1 text-[12px] font-normal text-gray-700 transition ease-in-out focus:border-primary focus:bg-white focus:text-gray-700 focus:outline-none'
                    name='photo_ktp'
                    onChange={(e) =>
                      formik.setFieldValue('photo_ktp', e.currentTarget.files[0])
                    }
                    accept={'image/*'}
                    id='photo_ktp'
                  />
                  {formik.touched.photo_ktp && formik.errors.photo_ktp && (
                    <p className=' text-red-500'>{formik.errors.photo_ktp.toString()}</p>
                  )}
                  <p className='text-[11px]'>
                    Maksimal ukuran file 200kb dan format file JPEG
                  </p>
                  <p className='text-[11px]'>
                    Anda Wajib Mengisi Form yang Bertanda (*)
                  </p>
                </div>
                <button 
                  type='submit'
                  disabled={formik.isSubmitting}
                  className='self-center rounded-md bg-primary px-6 py-2 text-white'>
                  {' '}
                  Daftar{' '}
                </button>
              </form>
            </FormikProvider>
          </div>
        </section>
        <Footer />
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const navItem = contentOne;
  const resRegions = await getAllRegions();
  const regions = [];
  if (!resRegions.success) {
    regions.push({ label: '', value: '' });
  }else{
    resRegions.data.map((item) => {
      return regions.push({ label: item.name, value: item.id_regional });
    });
  }
  const gender = [
    { label: 'Laki-laki', value: 'L' },
    { label: 'Perempuan', value: 'P' },
  ]
  
  return {
    props: {
      navItem,
      regions,
      gender
    },
  };
};

export default PendaftaranAnggota;

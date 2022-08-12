import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { Layout } from '@/components/admin/layout/Main';
import { Table } from '@/components/admin/Table';

import useDebounce from '@/helpers/hooks/use-debounce';
import { pagination } from '@/helpers/interface/pagination.interface';
import { useAppSelector } from '@/helpers/redux/hook';
import { selectToken } from '@/helpers/redux/slice/auth-admin.slice';
import { headerItemMembers } from '@/helpers/resource/table-admin';
import { formatDate, formatDateHome } from '@/helpers/utils/common';
import { deleteMember, useGetMembers } from '@/service/admin/member.admin';

const Index = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState('');
  const router = useRouter();
  const token = useAppSelector(selectToken);
  async function handleAdd() {
    return router.push('/admin/member/tambah');
  }
  async function handleEdit(id: string) {
    return router.push(`/admin/member/edit/${id}`);
  }
  async function handleDelete(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await deleteMember(id, token);
        if (result.code !== 200) {
          Swal.fire('Delete', 'Failed to delete data', 'error');
          return;
        }
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        return router.reload();
      }
    });
  }
  async function handleView(data: any) {
    Swal.fire({
      showCloseButton: true,
      showConfirmButton: false,
      color: 'grey',
      width: '80%',
      html:
        `<div class="px-2 py-6 flex flex-col items-start space-y-2"><div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 text-left w-full"><p class="w-full font-[900] sm:w-4/12">NIK</p> <p class="w-full sm:w-8/12">${data['nik']}</p></div>` +
        `<div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full"><p class="w-full font-[900] sm:w-4/12">Fullname</p><p class="w-full sm:w-8/12">${data['fullname']}</p></div>` +
        `<div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full"><p class="w-full font-[900] sm:w-4/12">Region</p><p class="w-full sm:w-8/12">${data['region_id']}</p></div>` +
        `<div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full"><p class="w-full font-[900] sm:w-4/12">Photo</p><div class="w-full sm:w-8/12">${data[
          'photo'
        ]
          .split(',')
          .map(
            (value) =>
              `<img src="${
                process.env.DOMAIN_API +
                '/api/v1?file=' +
                value +
                '&bucket=images/users'
              }" height="200" width="200" alt="" />`
          )}</div></div>` +
        `<div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full"><p class="w-full font-[900] sm:w-4/12">Photo KTP</p><div class="w-full sm:w-8/12">${data[
          'photo_ktp'
        ]
          .split(',')
          .map(
            (value) =>
              `<img src="${
                process.env.DOMAIN_API +
                '/api/v1?file=' +
                value +
                '&bucket=images/users'
              }" height="200" width="200" alt="" />`
          )}</div></div>` +
        `<div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full"><p class="w-full font-[900] sm:w-4/12">Address</p><div class="w-full sm:w-8/12">${data['address']}</div></div>` +
        `<div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full"><p class="w-full font-[900] sm:w-4/12">Phone No</p><p class="w-full sm:w-8/12">${data['phone_number']}</p></div>` +
        `<div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full"><p class="w-full font-[900] sm:w-4/12">Email</p><p class="w-full sm:w-8/12">${data['email']}</p></div>` +
        `<div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full"><p class="w-full font-[900] sm:w-4/12">Place of birth</p><p class="w-full sm:w-8/12">${data['place_of_birth']}</p></div>` +
        `<div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full"><p class="w-full font-[900] sm:w-4/12">Date of birth</p><p class="w-full sm:w-8/12">${formatDateHome(
          data['date_of_birth']
        )}</p></div>` +
        `<div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full"><p class="w-full font-[900] sm:w-4/12">Gender</p><p class="w-full sm:w-8/12">${data['gender']}</p></div>` +
        `<div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full"><p class="w-full font-[900] sm:w-4/12">Status</p><p class="w-full sm:w-8/12">${data['status']}</p></div>` +
        `<div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full"><p class="w-full font-[900] sm:w-4/12">updated by</p><p class="w-full sm:w-8/12">${data['updated_by']}</p></div>` +
        `<div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full"><p class="w-full font-[900] sm:w-4/12">created date</p><p class="w-full sm:w-8/12">${formatDate(
          data['created_date']
        )}</p></div>` +
        `<div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full"><p class="w-full font-[900] sm:w-4/12">updated_date</p><p class="w-full sm:w-8/12">${formatDate(
          data['updated_date']
        )}</p></div></div>`,
    });
  }
  const debouncedSearch = useDebounce(searchKeyword, 1000);
  const result = useGetMembers(
    { page: page.toString(), limit: limit.toString(), debouncedSearch },
    token
  );
  const props: pagination = {
    page,
    limit,
    searchKeyword,
    setLimit,
    setPage,
    debouncedSearch,
    setSearchKeyword,
    handleAdd,
    handleDelete,
    handleEdit,
    handleView,
  };
  return (
    <Layout>
      <div className='mx-auto max-w-7xl p-5 '>
        <Table
          title='Members'
          header={headerItemMembers}
          result={result}
          id='id_member'
          props={props}
        />
      </div>
    </Layout>
  );
};

export default Index;

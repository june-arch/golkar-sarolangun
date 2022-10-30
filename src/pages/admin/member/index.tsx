import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Swal from 'sweetalert2';

import { Table } from '@/components/admin/Table';
import { headerItemMembers } from '@/components/resource/table-admin';

import { useDeleteOneMemberAdmin, useGetAllMemberAdmin } from '@/controller/member/use-member';
import { TableContext, TokenContext } from '@/helpers/hooks/use-context';
import useDebounce from '@/helpers/hooks/use-debounce';
import { pagination } from '@/helpers/interface/pagination.interface';
import { formatDate, formatDateHome, formatGender, statusMember } from '@/helpers/utils/common';

const Layout = dynamic(
  () => import('@/components/admin/Layout'),
  { ssr: false }
);

const Index = () => {
  const {pageState, limitState, searchState} = useContext(TableContext);
  const {token, setToken} = useContext(TokenContext);
  const router = useRouter();
  const mutation = useDeleteOneMemberAdmin();
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
        return mutation.mutate({id, token});
      }
    });
  }
  async function handleView(data: any) {
    Swal.fire({
      showCloseButton: true,
      showConfirmButton: false,
      color: 'grey',
      width: '80%',
      html: popupHtml(data),
    });
  }
  const debouncedSearch = useDebounce(searchState.search, 1000);
  const result = useGetAllMemberAdmin(
    { page: pageState.page.toString(), limit: limitState.limit.toString(), debouncedSearch },
    token
  );
  const props: pagination = {
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

const popupHtml = (data) => {
  return `
  <div class="px-2 py-6 flex flex-col items-start space-y-2">
    <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 text-left w-full">
      <p class="w-full font-[900] sm:w-4/12">NIK</p> 
      <p class="w-full sm:w-8/12">${data['nik']}</p>
    </div>
    <div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full">
      <p class="w-full font-[900] sm:w-4/12">Fullname</p>
      <p class="w-full sm:w-8/12">${data['fullname']}</p>
    </div>
    <div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full">
      <p class="w-full font-[900] sm:w-4/12">Region</p>
      <p class="w-full sm:w-8/12">${data['region'].name}</p>
    </div>
    <div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full">
      <p class="w-full font-[900] sm:w-4/12">Photo</p>
      <div class="w-full sm:w-8/12">
        ${data['photo'].split(',').map((value) => `<img src="${value}" height="200" width="200" alt="" />`)}
      </div>
    </div>
    <div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full">
      <p class="w-full font-[900] sm:w-4/12">Photo KTP</p>
      <div class="w-full sm:w-8/12">
        ${data['photo_ktp'].split(',').map((value) =>`<img src="${value}" height="200" width="200" alt="" />`)}
      </div>
    </div>
    <div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full">
      <p class="w-full font-[900] sm:w-4/12">Address</p>
      <div class="w-full sm:w-8/12">
        ${data['address']}
      </div>
    </div>
    <div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full">
      <p class="w-full font-[900] sm:w-4/12">Phone No</p>
      <p class="w-full sm:w-8/12">${data['phone_number']}</p>
    </div>
    <div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full">
      <p class="w-full font-[900] sm:w-4/12">Email</p>
      <p class="w-full sm:w-8/12">${data['email']}</p>
    </div>
    <div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full">
      <p class="w-full font-[900] sm:w-4/12">Place of birth</p>
      <p class="w-full sm:w-8/12">${data['place_of_birth']}</p>
    </div>
    <div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full">
      <p class="w-full font-[900] sm:w-4/12">Date of birth</p>
      <p class="w-full sm:w-8/12">${formatDateHome(data['date_of_birth'])}</p>
    </div>
    <div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full">
      <p class="w-full font-[900] sm:w-4/12">Gender</p>
      <p class="w-full sm:w-8/12">${formatGender(data['gender'])}</p>
    </div>
    <div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full">
      <p class="w-full font-[900] sm:w-4/12">Status</p>
      <p class="w-full sm:w-8/12">${statusMember(data['status'])}</p>
    </div>
    <div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full">
      <p class="w-full font-[900] sm:w-4/12">updated by</p>
      <p class="w-full sm:w-8/12">${data['updated_by']}</p>
    </div>
    <div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full">
      <p class="w-full font-[900] sm:w-4/12">created date</p>
      <p class="w-full sm:w-8/12">${formatDate(data['created_date'])}</p>
    </div>
    <div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full">
      <p class="w-full font-[900] sm:w-4/12">updated_date</p>
      <p class="w-full sm:w-8/12">${formatDate(data['updated_date'])}</p>
    </div>
  </div>`;
}

export default Index;
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Swal from 'sweetalert2';

import { Table } from '@/components/admin/Table';
import { headerItemActivity } from '@/components/resource/table-admin';

import { useDeleteOneActivityAdmin,useGetAllActivityAdmin } from '@/controller/activity/use-activity';
import { TableContext, TokenContext } from '@/helpers/hooks/use-context';
import useDebounce from '@/helpers/hooks/use-debounce';
import { pagination } from '@/helpers/interface/pagination.interface';
import { formatDate } from '@/helpers/utils/common';
const Layout = dynamic(
  () => import('@/components/admin/Layout'),
  { ssr: false }
);

const Index = () => {
  const {pageState, limitState, searchState} = useContext(TableContext);
  const {token, setToken} = useContext(TokenContext);
  const router = useRouter();
  const mutation = useDeleteOneActivityAdmin();
  async function handleAdd() {
    return router.push('/admin/activity/tambah');
  }
  async function handleEdit(id: string) {
    return router.push(`/admin/activity/edit/${id}`);
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
  const result = useGetAllActivityAdmin(
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
          title='Activity'
          header={headerItemActivity}
          result={result}
          id='id_activity'
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
      <p class="w-full font-[900] sm:w-4/12">Title</p> 
      <p class="w-full sm:w-8/12">${data['title']}</p>
    </div>
    <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 text-left w-full">
      <p class="w-full font-[900] sm:w-4/12">admin</p>
      <p class="w-full sm:w-8/12">${data['admin_id']}</p>
    </div>
    <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 text-left w-full">
      <p class="w-full font-[900] sm:w-4/12">category activity</p>
      <p class="w-full sm:w-8/12">${data['category_activity_id']}</p>
    </div>
    <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 text-left w-full">
      <p class="w-full font-[900] sm:w-4/12">created date</p>
      <p class="w-full sm:w-8/12">${formatDate(data['created_date'])}</p>
    </div>
    <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 text-left w-full">
      <p class="w-full font-[900] sm:w-4/12">image</p>
      <div class="w-full sm:w-8/12">
        ${data['image'].split(',').map(value =>`<img src="${value}" height="200" width="200" alt="" />`)}
      </div>
    </div>
    <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 text-left w-full">
      <p class="w-full font-[900] sm:w-4/12">video</p>
      <a href="${data['video']}" class="w-full sm:w-8/12 hover:text-blue-500 hover:underline hover:underline-offset-4 hover:decoration-blue-500">${data['video']}</a>
    </div>
    <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 text-left w-full">
      <p class="w-full font-[900] sm:w-4/12">updated by</p>
      <p class="w-full sm:w-8/12">${data['updated_by']}</p>
    </div>
    <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 text-left w-full">
      <p class="w-full font-[900] sm:w-4/12">updated_date</p>
      <p class="w-full sm:w-8/12">${formatDate(data['updated_date'])}</p>
    </div>
  </div>`
}

export default Index;

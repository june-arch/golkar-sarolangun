import { UseMutationResult } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Swal from 'sweetalert2';

import { Table } from '@/components/admin/Table';
import { headerItemNews } from '@/components/resource/table-admin';

import { useDeleteOneNewsAdmin,useGetAllNewsAllAdmin } from '@/controller/news/use-news';
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
  const mutation = useDeleteOneNewsAdmin();
  async function handleAdd() {
    return router.push('/admin/news/tambah');
  }
  async function handleEdit(id: string) {
    return router.push(`/admin/news/edit/${id}`);
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
  const result = useGetAllNewsAllAdmin(
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
          title='News'
          header={headerItemNews}
          result={result}
          id='id_news'
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
    <div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full">
      <p class="w-full font-[900] sm:w-4/12">admin</p>
      <p class="w-full sm:w-8/12">${data['admin'].fullname}</p>
    </div>
    <div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full">
      <p class="w-full font-[900] sm:w-4/12">category news</p>
      <p class="w-full sm:w-8/12">${data['category_news'].name}</p>
    </div>
    <div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full">
      <p class="w-full font-[900] sm:w-4/12">created date</p>
      <p class="w-full sm:w-8/12">${formatDate(data['created_date'])}</p>
    </div>
    <div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full">
      <p class="w-full font-[900] sm:w-4/12">image</p>
      <div class="w-full sm:w-8/12">${data['image'].split(',').map(
        (value) => `<img src="${value}" height="200" width="200" alt="" />`)}
      </div>
    </div>
    <div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full">
      <p class="w-full font-[900] sm:w-4/12">content</p>
      <div class="w-full sm:w-8/12">${data['content']}</div>
    </div>
    <div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full">
      <p class="w-full font-[900] sm:w-4/12">author</p>
      <p class="w-full sm:w-8/12">${data['author']}</p>
    </div>
    <div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full">
      <p class="w-full font-[900] sm:w-4/12">updated by</p>
      <p class="w-full sm:w-8/12">${data['updated_by']}</p>
    </div>
    <div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full">
      <p class="w-full font-[900] sm:w-4/12">updated_date</p>
      <p class="w-full sm:w-8/12">${formatDate(data['updated_date'])}</p>
    </div>
  </div>`
}

export default Index;

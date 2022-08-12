import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { Layout } from '@/components/admin/layout/Main';
import { Table } from '@/components/admin/Table';

import useDebounce from '@/helpers/hooks/use-debounce';
import { pagination } from '@/helpers/interface/pagination.interface';
import { useAppSelector } from '@/helpers/redux/hook';
import { selectToken } from '@/helpers/redux/slice/auth-admin.slice';
import { headerItemNews } from '@/helpers/resource/table-admin';
import { formatDate } from '@/helpers/utils/common';
import { deleteNews, useGetNewss } from '@/service/admin/news';

const Index = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState('');
  const router = useRouter();

  const token = useAppSelector(selectToken);
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
        const result = await deleteNews(id, token);
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
        `<div class="px-2 py-6 flex flex-col items-start space-y-2"><div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 text-left w-full"><p class="w-full font-[900] sm:w-4/12">Title</p> <p class="w-full sm:w-8/12">${data['title']}</p></div>` +
        `<div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full"><p class="w-full font-[900] sm:w-4/12">admin</p><p class="w-full sm:w-8/12">${data['admin_id']}</p></div>` +
        `<div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full"><p class="w-full font-[900] sm:w-4/12">category news</p><p class="w-full sm:w-8/12">${data['category_news_id']}</p></div>` +
        `<div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full"><p class="w-full font-[900] sm:w-4/12">created date</p><p class="w-full sm:w-8/12">${formatDate(
          data['created_date']
        )}</p></div>` +
        `<div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full"><p class="w-full font-[900] sm:w-4/12">image</p><div class="w-full sm:w-8/12">${data[
          'image'
        ]
          .split(',')
          .map(
            (value) =>
              `<img src="${
                process.env.DOMAIN_API +
                '/api/v1?file=' +
                value +
                '&bucket=images/news'
              }" height="200" width="200" alt="" />`
          )}</div></div>` +
        `<div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full"><p class="w-full font-[900] sm:w-4/12">content</p><div class="w-full sm:w-8/12">${data['content']}</div></div>` +
        `<div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full"><p class="w-full font-[900] sm:w-4/12">author</p><p class="w-full sm:w-8/12">${data['author']}</p></div>` +
        `<div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full"><p class="w-full font-[900] sm:w-4/12">updated by</p><p class="w-full sm:w-8/12">${data['updated_by']}</p></div>` +
        `<div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full"><p class="w-full font-[900] sm:w-4/12">updated_date</p><p class="w-full sm:w-8/12">${formatDate(
          data['updated_date']
        )}</p></div></div>`,
    });
  }
  const debouncedSearch = useDebounce(searchKeyword, 1000);
  const result = useGetNewss(
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

export default Index;

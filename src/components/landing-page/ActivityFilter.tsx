import { MoonLoader } from 'react-spinners';

import Activity from './Activity';
import Pagination from '../admin/Pagination';

const ActivityFilterComponent = ({ result, props }) => {
  const { setPage, page, limit } = props;
  const { data, isLoading, isError } = result;
  if (isLoading) {
    return (
      <div className='flex justify-center'>
        <MoonLoader />
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <Pagination setPage={setPage} />
      </div>
    );
  }
  const { data: items, meta } = data;
  return (
    <div className='px-6'>
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4'>
        {items && items.map((value, i) => <Activity key={i} payload={value} />)}
      </div>
      <Pagination page={page} limit={limit} setPage={setPage} meta={meta} />
    </div>
  );
};

export default ActivityFilterComponent;

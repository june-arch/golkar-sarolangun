import { Data } from '@/components/resource/weekly-data-admin';
type Props = {
  items: Data;
};
export const Cards = ({ items }: Props) => {
  const { title, description, smallIcon, bigIcon, amount } = items || {};
  return (
    <div className='flex items-center justify-around rounded bg-gray-100 p-5'>
      <div className='flex flex-col items-center space-y-3'>
        <h1 className='text-xl'>{title}</h1>
        <h3 className='text-xl md:text-2xl'>{amount}</h3>
        <div className='flex items-center space-x-2 text-green-600 '>
          <span></span>
          {smallIcon}
          <p>{description}</p>
        </div>
      </div>
      <div>
        {' '}
        <span className='text-9xl'>{bigIcon}</span>
      </div>
    </div>
  );
};

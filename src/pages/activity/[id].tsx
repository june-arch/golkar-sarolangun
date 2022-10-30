import { ClockIcon } from '@heroicons/react/outline';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import Footer from '@/components/landing-page/Footer';
import Layout from '@/components/landing-page/Layout';
import Navbar from '@/components/landing-page/Navbar';

import { getOneActivity } from '@/controller/activity/activity.service';
import { useGetOneActivity } from '@/controller/activity/use-activity';
import { dayOfWeekAsString, formatDate } from '@/helpers/utils/common';

const ActivityPage = ({ activity, days }) => {
  const router = useRouter();
  const id = router.isReady && router.query.id;
  const {data} = useGetOneActivity({id}, activity)
  const handleActivityPage = () => {
    return router.push('/activity');
  };
  return (
    <Layout>
      <main>
        <div className='sticky top-0 z-50 bg-primary'>
          <Navbar />
        </div>
        <div className='mx-auto space-y-2 p-6 text-justify'>
          <div className='line text-[18px] font-[700] uppercase leading-[1.2] text-black'>
            {data.title}
          </div>
          <div className='flex flex-row items-center space-x-3 text-[12px] font-[300] capitalize'>
            <span className='pr-1'>
              <ClockIcon className='h-4 w-4 text-primary' />
            </span>
            {days}, {formatDate(data.created_date).replace('at', '|')}
          </div>
          <div>
            {data.image.split(',').map((value, i) => (
              <Image
                key={i}
                src={value}
                alt='detail-activity-1'
                height='60'
                width='400'
              />
            ))}
          </div>
        </div>

        <div className='flex flex-col items-center space-y-8 p-6'>
          <button
            onClick={handleActivityPage}
            className=' w-[180px] rounded-md bg-primary px-4 py-2 text-[14px] font-[500] text-white'
          >
            Lihat Lebih Banyak
          </button>
        </div>
        <Footer />
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context
) => {
  const i = context.params.id;
  const id = Array.isArray(i) ? i[0] : i;
  const activity = await getOneActivity(id);
  if (!activity.success) {
    activity.data = {
      title: 'judul activity',
      created_date: new Date(),
      category: 'category',
      video: '',
      image: '',
    };
  }
  const days = dayOfWeekAsString(new Date(activity.data.created_date).getDay());
  return {
    props: {
      activity: activity.data,
      days
    },
  };
};

export default ActivityPage;

import { ReactElement } from 'react';
import { AiOutlineArrowUp, AiOutlineBarChart } from 'react-icons/ai';
import { FcComboChart, FcDoughnutChart, FcPieChart } from 'react-icons/fc';
export type Data = {
  title: string;
  amount: string;
  description: string;
  smallIcon: ReactElement;
  bigIcon: ReactElement;
};
export const weeklyData: Data[] = [
  {
    title: 'Sales',
    amount: '$ 3,200',
    description: '10% last week',
    smallIcon: <AiOutlineArrowUp />,
    bigIcon: <AiOutlineBarChart className='h-28 w-28 text-red-400' />,
  },
  {
    title: 'Users',
    amount: '310',
    description: '12% this week',
    smallIcon: <AiOutlineArrowUp />,
    bigIcon: <FcPieChart className='h-28 w-28 text-green-600' />,
  },
  {
    title: 'Analytics',
    amount: '450',
    description: '23% trending week',
    smallIcon: <AiOutlineArrowUp />,
    bigIcon: <FcComboChart className='h-28 w-28 text-yellow-800' />,
  },
  {
    title: 'Oders',
    amount: '210',
    description: '21% this week',
    smallIcon: <AiOutlineArrowUp />,
    bigIcon: <FcDoughnutChart className='h-28 w-28 text-yellow-800' />,
  },
];

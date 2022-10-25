import React from 'react';

import { paddingDefault } from '@/pages';

const Footer = () => {
  return (
    <footer className='bg-primary'>
       <div className={`px-8 text-md sm:h-[64px] flex justify-center items-center ${paddingDefault}`}>
          © 2022 • Partai Golkar Sarolangun, All right reserved
       </div>
    </footer>
  );
};

export default Footer;

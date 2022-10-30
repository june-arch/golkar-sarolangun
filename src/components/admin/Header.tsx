import { Menu } from '@headlessui/react';
import { MenuIcon, UserIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import { HeaderRight } from '@/components/resource/header-right';

import { OpenContext, TokenContext } from '@/helpers/hooks/use-context';

const Header = () => {
  const router = useRouter();
  const {token, setToken} = useContext(TokenContext);  
  const {open, setOpen} = useContext(OpenContext);
  const handleLogout = (e, path: string) => {
    localStorage.removeItem('token-auth');
    return router.push(path);
  };
  const menuIsLogin = () => {
    const layout = (
      <Menu>
        <Menu.Button className='flex space-x-3 rounded-md border-2 border-gray-50 px-10 py-2  text-gray-50'>
          <UserIcon className='h-5 w-5 ' />
          <span>Account</span>
        </Menu.Button>
        <Menu.Items
          as='div'
          className='absolute top-full flex w-full flex-col space-y-2 bg-gray-600 '
        >
          {HeaderRight.map(({ title, icon, link }, index) => (
            <Menu.Item key={index}>
              <a
                onClick={(e) => handleLogout(e, link)}
                className='flex space-x-3 p-4 text-gray-50 hover:bg-gray-500'
              >
                <span>{icon}</span>
                <span>{title}</span>
              </a>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    );
    return layout;
  };

  const menuIsLogout = () => {
    const layout = (
      <Link href='/admin/auth/login' className='flex space-x-3 rounded-md border-2 border-gray-50 px-10 py-2  text-gray-50'>
        <UserIcon className='h-5 w-5 ' />
        <span>Login</span>
      </Link>
    );
    return layout;
  };

  return (
    <div className='flex flex-col items-center justify-around space-y-5  bg-gray-600 p-10 md:flex-row md:space-y-0'>
      <div className='flex items-center justify-center space-x-3'>
        <button onClick={() => setOpen(!open)}>
          <MenuIcon className='h-8 w-8 text-gray-50' />
        </button>
        <Link href='/admin'>
          <span className='text-3xl text-yellow-500'>GOLKAR SAROLANGUN</span>
        </Link>
      </div>
      <div className='relative'>{token ? menuIsLogin() : menuIsLogout()}</div>
    </div>
  );
};
export default Header;
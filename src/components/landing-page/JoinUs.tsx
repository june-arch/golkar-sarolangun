import { VideoItem } from '@/helpers/interface/types'
import { getMemberByNik } from '@/service/landing-page/member'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { RiYoutubeFill } from 'react-icons/ri'
import Swal from 'sweetalert2'

type Props = {
  description: string
  'image-kita-satu': string,
  video: VideoItem[]
}

const JoinUs = (navItem: Props) => {
  const [message, setMessage] = useState('');
  const handleChange = event => {
    setMessage(event.target.value);
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const result = await getMemberByNik({ nik:message });
    if(result.code != 200){
      const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
      })

      Toast.fire({
          icon: 'error',
          title: `Error : ( ${result.info.message} )`,
          color: 'red',
      })
    }
    if(result.data && result.code == 200){
      let colorText = 'text-grey-500';
      if(result.data.status == 'Pending') colorText = 'text-grey-500';
      if(result.data.status == 'Approved') colorText = 'text-green-500';
      if(result.data.status == 'Rejected') colorText = 'text-red-500';
      Swal.fire({
        showCloseButton: true,
        showConfirmButton: false,
        color: 'grey',
        width: '80%',
        html: `<div class="px-2 py-6 flex flex-col items-start space-y-2">
          <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 text-left w-full">
            <p class="w-full text-black font-[900] sm:w-4/12">${message}</p> 
            <p class="w-full sm:w-8/12 ${colorText}">${result.data.status}</p>
        </div>`,
      })  
    }
  }
  return (
    <section className="flex flex-col">
      <div className="flex flex-col text-center w-2/3 py-5 space-y-2">
        <div className="flex flex-col uppercase sm:block -space-y-2">
          <span className={`font-[900] text-[45px] text-white`}>Golkar</span>
          <span className={`font-[600] text-[12px] text-secondary`}>Kabupaten Sarolangun</span>
        </div>
        <div className="flex flex-col space-y-3 items-center">
          <Link href="/pendaftaran-anggota">
            <a className="">
              <button className={`uppercase bg-secondary text-[9px] text-white font-[600] py-2 px-3 rounded-md`}>
                Bergabung Menjadi Anggota
              </button>
            </a>
          </Link>
          <div className="flex w-[176px] flex-row justify-around">
              <input
                type="search"
                className="form-control m-0 block w-[180px] h-[34px] min-w-0 flex-auto rounded-l-md border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-1 text-[11px] font-normal text-gray-700 transition ease-in-out focus:border-primary focus:bg-white focus:text-gray-700 focus:outline-none"
                placeholder="Cari Nomor KTP"
                onChange={handleChange}
                value={message}
                autoComplete="off"
              />
              <button
                className="flex items-center input-group-text whitespace-nowrap rounded-r-md p-[10px] font-normal text-secondary bg-primary"
                id="basic-addon2"
                onClick={handleClick}
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="search"
                  className="w-[11px] h-[11px]"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                  ></path>
                </svg>
              </button>
            </div>
        </div>
      </div>
      <div className="flex flex-col items-center py-2 bg-white">
        <div className="flex w-72 justify-center z-10">
          <div className="w-[171px] h-[44px]">
            <Image
              src={navItem['image-kita-satu']}
              alt="kita-satu"
              height="130px"
              width="500px"
              layout="responsive"
              objectFit="contain"
            />
          </div>
        </div>
        <div className="flex py-5">
          <Link className="cursor-pointer" href={'https://youtu.be/yNDwBNLTbjk'}>
            <a className="relative w-[165px] h-[94px] m-1">
              <Image
                src={`/images/hymne.png`}
                alt={`hymne`}
                layout="fill"
                />
                <RiYoutubeFill className="absolute bottom-1/2 left-[70px] w-[24px] h-[17px]" color='red'/>
            </a>
          </Link>
          <Link className="cursor-pointer" href={'https://youtu.be/k3U2fnTuPWs'}>
            <a className="relative w-[171px] h-[94px] m-1">
              <Image
                src={`/images/mars.png`}
                alt={`mars`}
                layout="fill"       
                />
              <RiYoutubeFill className="absolute bottom-1/2 left-[76px] w-[24px] h-[17px]" color='red'/>
            </a>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default JoinUs

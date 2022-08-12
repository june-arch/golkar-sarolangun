import React from 'react';

import css from '@/styles/styles.module.css';

import { WhatsappSVG } from './Icons';

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  styles?: React.CSSProperties;
}

export default function FloatingWhatsApp({
  phoneNumber = '6281379693637',
  styles = {},
}: FloatingWhatsAppProps) {
  const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    window.open(
      `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=Hello, Mohon Izin Untuk Bertanya`
    );
  };
  return (
    <div
      className={css.whatsappButton}
      onClick={(event) => handleOpen(event)}
      style={styles}
      aria-hidden='true'
    >
      <WhatsappSVG />
    </div>
  );
}

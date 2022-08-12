import Image from 'next/image';

import styles from '@/styles/Youtube.module.css';

export default function Youtube({ data }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <ul className={styles.grid}>
          {data.items.map(({ id, snippet }) => {
            const { title, thumbnails, resourceId } = snippet;
            const { medium } = thumbnails;
            return (
              <li key={id} className={styles.card}>
                <a
                  href={`https://www.youtube.com/watch?v=${resourceId.videoId}`}
                >
                  <p>
                    <Image
                      width={medium.width}
                      height={medium.height}
                      src={medium.url}
                      alt=''
                    />
                  </p>
                  <h3>{title}</h3>
                </a>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

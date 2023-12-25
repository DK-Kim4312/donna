// components/TopNavbar.js
import React from 'react';
import styles from '../styles/TopNavBar.module.css';
import profile from '../public/profile.png';
import Image from 'next/image';
import Link from 'next/link';


const TopNavbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Donna.AI
      </div>
      <div className={styles.profile}>
        <Image
          priority
          src={profile}
          className={styles.borderCircle}
          height={30}
          width={30}
          alt="pic"
        />
      </div>
    </div>
  );
};

export default TopNavbar;
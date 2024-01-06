import AuthView from '../../components/AuthView';
import React from 'react';
import styles from '../../styles/Login.module.css';
import { DonnaIcon } from '../../styles/DonnaIcon';
import '../../styles/NoBodyMargin.scss';


export default async function ResetPassword() {
  return (
    <div className={styles.background}>
      <div className={styles.sidebar}>
        <div className={styles['logo-title']}>
          <div className={styles['logo']}>
            <DonnaIcon />
          </div>
          <div className={styles['sidebar-title']}>Donna AI</div>
        </div>

        <div className={styles['sidebar-subtitle']}>Focus On YOU</div>
      </div>
      <div className={styles.loginform}>
      <AuthView className ='ml-[10%] mr-[10%]' view='reset_password'/>
      </div>
    </div>
  );
}

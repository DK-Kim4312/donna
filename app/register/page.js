import AuthView from '../../components/AuthView';
import React from 'react';
import styles from '../../styles/Register.module.css';
import { DonnaIcon } from '../../styles/DonnaIcon';
import '../../styles/NoBodyMargin.scss';


export default async function Register() {
  return (
    <div className={styles.background}>
      <div className={styles.sidebar}>
        <div className={styles['logo-title']}>
          <div className={styles['logo']}>
            <DonnaIcon />
          </div>
          <div className={styles['sidebar-title']}>Donna AI</div>
        </div>
      </div>

      <div className={styles.loginform}>
        <div className={styles.logincontents}>
          <AuthView view="sign_up" />
        </div>
      </div>

    </div >

  );
}

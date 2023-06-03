import React from 'react';
import styles from '../../styles/Sidebar.module.css';
import { Image } from 'antd';

const LandingPage = () => {
    return (
        <div className={styles.landing}>
            <h1 style={{ fontSize: '50px', color: 'grey', paddingLeft:'60px' }}>Welcome to Chattify</h1>
            <div className={styles.landingPicture}></div>
            <p style={{ fontSize: '25px', paddingLeft:'60px' }}>Click, Delivered.</p>
        </div>
    )
}

export default LandingPage
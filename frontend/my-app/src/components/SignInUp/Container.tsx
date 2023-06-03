import React from 'react';
import styles from '../../styles/SignInUp.module.css';
import { Tabs } from 'antd';
import Login from './Login';
import Register from './Register';
const { TabPane } = Tabs;


const Container = () => {
    return (
        <div className={styles.signInUp}>
            <div className={styles.container}>
                <div className={styles.image}>
                    <h1>Chattify</h1>
                </div>
                <Tabs className={styles.tabs} defaultActiveKey='1' centered>
                    <TabPane tab="Login" key="1">
                        <Login />
                    </TabPane>
                    <TabPane tab="Register" key="2">
                        <Register />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default Container
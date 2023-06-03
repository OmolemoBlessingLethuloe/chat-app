import { Button, Checkbox, Form, Input, message } from 'antd';
import React, { FC, useEffect } from 'react';
import styles from '../../styles/SignInUp.module.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { NextRouter, useRouter } from 'next/router';
import { useParticipants } from '../../providers/participants';
import { LoginDto } from '../../providers/participants/context';



const Login: FC = () => {
    const router: NextRouter = useRouter();

    const { login, loginDetails, errorMessage, updateStatus } = useParticipants();

    useEffect(() => {
        console.log('login details', loginDetails)
        if (loginDetails != null || loginDetails != undefined) {
            sessionStorage.setItem('participant', JSON.stringify({
                phoneNumber: loginDetails?.phoneNumber
            }))
            router.push('/dashboard');
        } else if (errorMessage) {
            message.error(errorMessage, 10);
        }
    }, [loginDetails, errorMessage, router])


    const onFinish = (values: LoginDto) => {
        if (login) {
            login(values);
        }
    }
    return (
        <Form
            name="normal_login"
            className={styles.loginForm}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="PhoneNumber"
                rules={[
                    {
                        required: true,
                        message: 'Please input your phone number!',
                    },
                ]}
            >
                <Input className={styles.input} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Phone Number" />
            </Form.Item>
            <Form.Item
                name="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    className={styles.input}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
                    LOGIN
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Login
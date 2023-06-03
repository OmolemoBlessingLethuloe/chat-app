import { Button, Form, Input, Select } from 'antd';
import React, { FC, useState } from 'react';
import styles from '../../styles/SignInUp.module.css';
import { ArrowRightOutlined } from '@ant-design/icons';
import { ParticipantDto } from '../../providers/participants/context';
import RegisterModal from './RegisterModal';


const Register: FC = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [formData, setFormData] = useState<ParticipantDto>({
        firstName: '',
        lastName: '',
        age: 0,
        gender: '',
        emailAddress: '',
        phoneNumber: '',
        username: '',
        aboutMe: '',
        status: true,
        avatarURL: '',
        password: '',
        avatarFilename: ''
    });
    const [confirmPassword, setConfirmPassword] = useState<string>('');


    return (
        <Form
            name="normal_login"
            className={styles.loginForm}
            initialValues={{
                remember: true,
            }}
        >
            <Form.Item
                name="firstName"
                rules={[
                    {
                        required: true,
                        message: 'Please input your first name!',
                    },
                ]}
            >
                <Input className={styles.input} placeholder="First Name" onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
            </Form.Item>
            <Form.Item
                name="lastName"
                rules={[
                    {
                        required: true,
                        message: 'Please input your last name!',
                    },
                ]}
            >
                <Input className={styles.input} placeholder="Last Name" onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
            </Form.Item>
            <Form.Item
                label="Age"
                rules={[
                    {
                        required: true,
                        message: 'Please input your age!',
                    },
                ]}
            >
                <Input className={styles.input} style={{ width: '20%' }} type={'number'} onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })} />
            </Form.Item>
            <Form.Item label="Gender" >
                <Select style={{boxShadow:'rgba(0, 0, 0, 0.074) 0px 20px 25px -5px, rgba(0, 0, 0, 0) 0px 10px 10px -5px'}} onChange={(e) => setFormData({ ...formData, gender: e })}>
                    <Select.Option value={1}>Female</Select.Option>
                    <Select.Option value={2}>Male</Select.Option>
                    <Select.Option value={3}>Other</Select.Option>
                    <Select.Option value={4}>Rather Not Say</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your email address!',
                    },
                ]}
            >
                <Input className={styles.input} placeholder="Email Address" onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })} />
            </Form.Item>
            <Form.Item
                name="phoneNumber"
                rules={[
                    {
                        required: true,
                        message: 'Please input your phone number!',
                    },
                ]}
            >
                <Input className={styles.input} placeholder="Phone Number" onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    className={styles.input}
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </Form.Item>
            <Form.Item
                name="confirmPassword"
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your Password!',
                    },
                ]}
            >
                <Input
                    className={styles.input}
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" className={styles.loginFormButton} onClick={() => setVisible(true)}>
                    REGISTER
                    <ArrowRightOutlined />
                </Button>
                {visible && <RegisterModal confirmPassword={confirmPassword} formData={formData} setFormData={setFormData} visible={visible} setVisible={setVisible} />}
            </Form.Item>
        </Form>
    )
}

export default Register
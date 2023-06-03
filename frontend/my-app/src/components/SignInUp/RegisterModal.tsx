import { Avatar, Form, Input, message, Modal, Upload } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { FC, useEffect, useState } from 'react';
import { useParticipants } from '../../providers/participants';
import { ParticipantDto } from '../../providers/participants/context';
import styles from '../../styles/SignInUp.module.css';
import { NextRouter, useRouter } from "next/router";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

type Props = {
  confirmPassword: string;
  formData: ParticipantDto;
  setFormData: React.Dispatch<React.SetStateAction<ParticipantDto>>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const RegisterModal: FC<Props> = ({ confirmPassword, formData, setFormData, visible, setVisible }) => {
  const { createParticipant, participantDetails, errorMessage } = useParticipants();
  const router: NextRouter = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as RcFile, url => {
        setLoading(false);
        setImageUrl(url);
        setFormData({ ...formData, avatar: info.file.originFileObj })
      });
    }
  };




  useEffect(() => {
    if (participantDetails != null) {
      sessionStorage.setItem('participant', JSON.stringify({
        phoneNumber: participantDetails?.phoneNumber
      }))
      router.push('/dashboard')
    } else if (errorMessage) {
      message.error(errorMessage, 10);
    }
  }, [participantDetails, errorMessage, router]);




  const signUp = (data: any) => {
    if (data.password != confirmPassword) {
      message.error("Passwords do not match");
    } else {
      if (createParticipant) {
        const formData = new FormData();

        formData.append("username", data.username);
        formData.append("phoneNumber", data.phoneNumber);
        formData.append("aboutMe", data.aboutMe);
        formData.append("status", data.status);
        formData.append("age", data.age);
        formData.append("avatarURL", data.avatarURL);
        formData.append("emailAddress", data.emailAddress);
        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);
        formData.append("gender", data.gender);
        formData.append("password", data.password);
        formData.append("status", data.status);
        formData.append("avatar", data.avatar);
        console.log(Object.fromEntries(formData));
        createParticipant(formData);
      }
    }
  };

  const avatars: string[] = [
    "https://joeschmoe.io/api/v1/jess",
    "https://joeschmoe.io/api/v1/jon",
    "https://joeschmoe.io/api/v1/jaqueline",
    "https://joeschmoe.io/api/v1/jed",
    "https://joeschmoe.io/api/v1/jenni",
  ];

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );


  return (
    <Modal
      className={styles.modal}
      title="Complete Registration"
      centered
      visible={visible}
      onOk={() => signUp(formData)}
      onCancel={() => setVisible(false)}
      width={1000}
    >
      <p>Pick A Username</p>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input
          className={styles.input}
          placeholder="Username"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
      </Form.Item>
      <p>Tell us more about yourself..</p>
      <TextArea
        className={styles.input}
        showCount
        maxLength={100}
        onChange={(e) => setFormData({ ...formData, aboutMe: e.target.value })}
      />
      <br />
      <p>Pick an Avatar:</p>
      <div className={styles.avatars}>
        {avatars.map((avatar) => (
          <div
            className={styles.singleAvatar}
            key={avatar}
            onClick={(e) => {
              const target = e.target as HTMLElement;
              target.style.border = "1px solid rgb(3, 3, 73)";
              setFormData({ ...formData, avatarURL: target.getAttribute("src") });
            }}
          >
            <Avatar src={avatar} size={100} />
          </div>
        ))}
        <div>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </div>
      </div>

    </Modal>
  )
}

export default RegisterModal
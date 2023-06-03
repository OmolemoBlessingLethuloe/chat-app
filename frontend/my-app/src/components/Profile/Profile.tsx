import React, { FC, useEffect, useState } from 'react';
import styles from '../../styles/Sidebar.module.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useParticipants } from '../../providers/participants';
import { Avatar, Button, Input, Upload } from 'antd';
import EditIcon from '@mui/icons-material/Edit';
import { UpdateAboutMeDto, UpdateUsernameDto } from '../../providers/participants/context';
import { NextRouter, useRouter } from 'next/router';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';

type Props = {
    setShowProfile: React.Dispatch<React.SetStateAction<boolean>>,
}


const Profile: FC<Props> = ({ setShowProfile }) => {
    const router: NextRouter = useRouter();
    const { updateAvatar, newAvatar, currentUser, setUpdateAboutMe, setUpdateUsername, downloaded, updateUsername, updateAboutMe } = useParticipants();
    const [aboutMe, setAboutMe] = useState<UpdateAboutMeDto>();
    const [username, setUsername] = useState<UpdateUsernameDto>();


    useEffect(() => {
        if (updateUsername != null || updateAboutMe) {
            router.reload()
        }
    }, [updateAboutMe, updateUsername])


    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };

    const handleUpdateAvatar = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj as RcFile, url => {
                console.log(currentUser)
                console.log(info.file.originFileObj);
                const formData = new FormData();

                formData.append("avatar", info.file.originFileObj);
                console.log('new avatar', Object.fromEntries(formData));

                updateAvatar(currentUser.phoneNumber, formData);
            });
        }
    }

    useEffect(() => {
        if (newAvatar != null) {
            console.log('new avatar', newAvatar)
            router.reload();
        }
    }, [newAvatar])


    return (
        <>
            <div className={styles.newConvoHead}>
                <ArrowLeftOutlined onClick={() => {
                    setUpdateAboutMe(currentUser.phoneNumber, aboutMe);
                    setUpdateUsername(currentUser.phoneNumber, username);
                    setShowProfile(false)
                }}
                />
                <p>Profile</p>
            </div>
            <div className={styles.profile}>
                <div className={styles.changeProfilePic}>
                    <Avatar src={downloaded ? downloaded : currentUser.avatarURL} size={250} />
                    <Button><Upload onChange={handleUpdateAvatar}>Change Profile Picture</Upload></Button>
                </div>
                <div className={styles.changeProfileName}>
                    <p>Your name</p>
                    <Input onChange={(e) => setUsername({ ...username, username: e.target.value || e.target.defaultValue })} className={styles.changeProfileInput} defaultValue={currentUser.username} suffix={<EditIcon />} />
                </div>
                <p>This is the name that will be visible to your chattify contacts.</p>
                <div className={styles.changeProfileName}>
                    <p>About</p>
                    <Input onChange={(e) => setAboutMe({ ...aboutMe, aboutMe: e.target.value || e.target.defaultValue })} className={styles.changeProfileInput} defaultValue={currentUser.aboutMe} suffix={<EditIcon />} />
                </div>
            </div>
        </>
    )
}

export default Profile
import { Avatar, Button, Dropdown, Input, Menu, Upload } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import styles from '../../styles/Sidebar.module.css';
import ChatIcon from '@mui/icons-material/Chat';
import { MoreOutlined, SearchOutlined } from '@ant-design/icons';
import { useParticipants } from '../../providers/participants';
import { ChangeBackgroundDto } from '../../providers/participants/context';
import NewConversation from '../NewConversation/NewConversation';
import Conversations from '../Conversations/Conversations';
import Profile from '../Profile/Profile';
import { useConversations } from '../../providers/conversations';
import Archived from '../Archived/Archived';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import { NextRouter, useRouter } from 'next/router';



interface IUserInfo {
    avatar: string,
    name: string,
    phoneNumber: string,
}


const Sidebar: FC = () => {
    const router: NextRouter = useRouter();
    const { updateStatus, getAllParticipants, updatedStatus, allParticipantsDetails, setCurrentUser, chatBackground, currentUser, download, downloaded, changeBackground } = useParticipants();
    const { setIsArchived, isArchived } = useConversations();
    const [startConvo, setStartConvo] = useState<boolean>(false);
    const [showProfile, setShowProfile] = useState<boolean>(false);
    const [showArchived, setShowArchivedChats] = useState<boolean>(false);
    const [background, setBackground] = useState<ChangeBackgroundDto>()
    const [userInfo, setUserInfo] = useState<IUserInfo>({
        avatar: '',
        name: '',
        phoneNumber: ''
    })

    useEffect(() => {
        if (isArchived != null) {
            console.log('I am archived', isArchived);
            // router.reload();
        }
    }, [isArchived])


    useEffect(() => {
        if (allParticipantsDetails != null) {
            var user = allParticipantsDetails.filter(participant => participant.phoneNumber == JSON.parse(sessionStorage.getItem("participant")!).phoneNumber)[0];
            console.log('user', user)
            if (setCurrentUser) setCurrentUser(user)
        } else {
            if (getAllParticipants) {
                getAllParticipants();
            }
        }
    }, [allParticipantsDetails, currentUser])


    useEffect(() => {
        if (currentUser != null) {
            console.log('current user', currentUser)
            if (currentUser.avatarURL == null) {
                download(currentUser.phoneNumber);
            }
            setUserInfo({ ...userInfo, avatar: currentUser.avatarURL, name: currentUser.username, phoneNumber: currentUser.phoneNumber })
        }
    }, [currentUser])

    useEffect(() => {
        if (downloaded != null) {
            console.log('DOWNLOADED', downloaded)
        }
    }, [downloaded])

    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };




    const handleChatBackground = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj as RcFile, url => {
                console.log(currentUser)
                console.log(info.file.originFileObj);
                const formData = new FormData();

                formData.append("chatBackground", info.file.originFileObj);
                console.log('change background', Object.fromEntries(formData));

                changeBackground(currentUser.phoneNumber, formData);
            });
        }
    }

    useEffect(() => {
        if (chatBackground != null) {
            console.log('chat background', chatBackground)
            router.reload();
        }
    }, [chatBackground])


    useEffect(() => {
        if (updatedStatus != null) {
            console.log(updatedStatus)
        }
    }, [updatedStatus])

    const menu = (
        <Menu>
            <Menu.Item>
                <Upload style={{ padding: '10px' }}
                    onChange={handleChatBackground}
                >Update Chat Background</Upload>
            </Menu.Item>
            <Menu.Item>
                <p onClick={() => setShowProfile(true)}>View Profile</p>
            </Menu.Item>
            <Menu.Item onClick={() => {
                setShowArchivedChats(true)
                setIsArchived(true)
            }}>
                <p>View Archived Conversations</p>
            </Menu.Item>
            <Menu.Item>
                <p onClick={() => router.push('/')}>Logout</p>
            </Menu.Item>
        </Menu>
    );

    const DropdownMenu = () => (
        <Dropdown key="more" overlay={menu} placement="bottomRight">
            <Button
                type="text"
                icon={
                    <MoreOutlined
                        style={{
                            fontSize: 20,
                        }}
                    />
                }
            />
        </Dropdown>
    )

    const onSearch = (value: string) => {
        console.log('sidebar search', value)
    }

    return (
        <>
            {showArchived ? <Archived showArchived={showArchived} setShowArchivedChats={setShowArchivedChats} /> :
                <div>
                    {showProfile ? <Profile setShowProfile={setShowProfile} /> :
                        <div>
                            {startConvo ? <NewConversation setStartConvo={setStartConvo} /> :
                                <div>
                                    <div className={styles.dashHead}>
                                        <div
                                            onClick={() => setShowProfile(true)}>
                                            <Avatar size={55} src={downloaded ? downloaded : userInfo.avatar} />
                                        </div>
                                        <ChatIcon onClick={() => setStartConvo(true)} />
                                        <DropdownMenu />
                                    </div>
                                    <div className={styles.dashSearch}>
                                        <SearchOutlined />
                                        <Input placeholder="Search a chat" onChange={(e) => onSearch(e.target.value)} />
                                    </div>
                                    <Conversations />
                                </div>
                            }
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default Sidebar
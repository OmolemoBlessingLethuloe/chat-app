import { Avatar, Button, Dropdown, Menu, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { useConversations } from '../../providers/conversations';
import styles from '../../styles/Sidebar.module.css';
import { SearchOutlined, MoreOutlined } from '@ant-design/icons';
import { useParticipants } from '../../providers/participants';
import ContactProfile from '../ContactProfile/ContactProfile';
import GroupProfile from '../GroupProfile/GroupProfile';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { NextRouter, useRouter } from 'next/router';
const { confirm } = Modal;


const ChatHeader = () => {
    const router: NextRouter = useRouter();
    const { selectedConversation, setGroupProfile, deleteConversation, archiveConversation, isArchived } = useConversations();
    const { currentUser, setContactProfile } = useParticipants();
    const [showContact, setShowContact] = useState<boolean>(false);
    const [showGroup, setShowGroup] = useState<boolean>(false);

    useEffect(() => {
        if (selectedConversation != null) {
            console.log('selected conversation', selectedConversation)
        }
    }, [selectedConversation])

    const handleDelete = () => {
        confirm({
            title: 'You are about to permantly delete your conversation with:',
            icon: <ExclamationCircleOutlined />,
            content: `${selectedConversation.conversationType == 2 ? selectedConversation.groupName : selectedConversation.participantsOfConversation[0].phoneNumber == currentUser.phoneNumber ? selectedConversation.participantsOfConversation[1].participantName : selectedConversation.participantsOfConversation[0].participantName}`,
            onOk() {
                deleteConversation(selectedConversation.conversationId);
                router.reload();
            },
            onCancel() {
            },
        });
    }

    const handleArchive = () => {
        archiveConversation(selectedConversation.conversationId, isArchived ? { archived: false } : { archived: true });

        setTimeout(() => {
            router.reload();
        },1000)
    }

    const menu = (
        <Menu>
            <Menu.Item onClick={handleArchive}>
                {isArchived ? <p> Unarchive Conversation </p> : <p>Archive Conversation</p>}
            </Menu.Item>
            <Menu.Item onClick={handleDelete}>
                <p>Delete Conversation</p>
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


    return (
        <div className={styles.chatHeader}>
            {selectedConversation &&
                <>
                    <div onClick={() => {
                        if (selectedConversation.conversationType == 1) {
                            setContactProfile(selectedConversation.participantsOfConversation[0].phoneNumber == currentUser.phoneNumber ? selectedConversation.participantsOfConversation[1] : selectedConversation.participantsOfConversation[0]);
                            setShowContact(true);
                        } else {
                            setGroupProfile(selectedConversation);
                            setShowGroup(true);
                        }
                    }}>
                        <Avatar src={selectedConversation.conversationType == 1 ? selectedConversation.participantsOfConversation[0].phoneNumber == currentUser.phoneNumber ? selectedConversation.participantsOfConversation[1].avatarURL : selectedConversation.participantsOfConversation[0].avatarURL : selectedConversation.groupAvatarURL} size={55} style={{ border: '1px solid rgba(0, 0, 0, 0.04)' }} />
                    </div>
                    <div style={{ fontSize: '18px' }}>{selectedConversation.conversationType == 2 ? selectedConversation.groupName : selectedConversation.participantsOfConversation[0].phoneNumber == currentUser.phoneNumber ? selectedConversation.participantsOfConversation[1].participantName : selectedConversation.participantsOfConversation[0].participantName}</div>
                    <div className={styles.chatHeaderIcons}>
                        <SearchOutlined />
                        <DropdownMenu />
                    </div>
                    {showContact && <ContactProfile showContact={showContact} setShowContact={setShowContact} />}
                    {showGroup && <GroupProfile showGroup={showGroup} setShowGroup={setShowGroup} />}
                </>
            }
        </div>

    )
}

export default ChatHeader
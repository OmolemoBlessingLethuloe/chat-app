import { Avatar, Button, Input, Modal } from 'antd';
import React, { FC, useEffect } from 'react';
import { useConversations } from '../../providers/conversations';
import { useParticipants } from '../../providers/participants';
import styles from '../../styles/Sidebar.module.css';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import DeleteIcon from '@mui/icons-material/Delete';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { NextRouter, useRouter } from 'next/router';

const { confirm } = Modal;


type Props = {
    setShowContact: React.Dispatch<React.SetStateAction<boolean>>,
    showContact: boolean,
}

const ContactProfile: FC<Props> = ({ setShowContact, showContact }) => {
    const router: NextRouter = useRouter();
    const { contactProfile } = useParticipants();
    const { deleteConversation, deletedConversation, selectedConversation } = useConversations();

    useEffect(() => {
        if (contactProfile != null) {
            console.log('contact profile', contactProfile)
        }
    }, [contactProfile])



    const handleDelete = () => {
        confirm({
            title: 'You are about to permantly delete your conversation with:',
            icon: <ExclamationCircleOutlined />,
            content: `${contactProfile.participantName}`,
            onOk() {
                deleteConversation(selectedConversation.conversationId);
                router.reload();
            },
            onCancel() {
            },
        });
    }


    return (
        <Modal
            className={styles.contactProfileModal}
            centered
            visible={showContact}
            onCancel={() => setShowContact(false)}
            cancelButtonProps={{ ghost: true }}
            width={600}
        >
            <div className={styles.contactProfile}>
                <Avatar src={contactProfile.avatarURL} size={400} />
                <h1>{contactProfile.participantName}</h1>
                <h3>{contactProfile.phoneNumber}</h3>
            </div>
            <div className={styles.contactProfileAbout}>
                <p>About</p>
                <h4>{contactProfile.aboutMe}</h4>
            </div>
            <div className={styles.contactProfileIcons}>
                <h4 onClick={handleDelete}><DeleteIcon />Delete chat</h4>
            </div>
        </Modal>
    )
}

export default ContactProfile
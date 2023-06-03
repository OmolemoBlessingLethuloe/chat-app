import { Avatar, Input, List, Modal } from 'antd';
import React, { FC, useEffect, useState } from 'react'
import { useConversations } from '../../providers/conversations';
import { useParticipants } from '../../providers/participants';
import styles from '../../styles/Sidebar.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ChangeGroupAboutDto } from '../../providers/conversations/context';
import { NextRouter, useRouter } from 'next/router';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;


type Props = {
    setShowGroup: React.Dispatch<React.SetStateAction<boolean>>,
    showGroup: boolean,
}


const GroupProfile: FC<Props> = ({ setShowGroup, showGroup }) => {
    const router: NextRouter = useRouter();
    const { downloaded } = useParticipants();
    const { groupProfile, setUpdateGroupAbout, deleteConversation, updateGroupAbout } = useConversations();
    const { currentUser } = useParticipants();
    const [groupAbout, setGroupAbout] = useState<ChangeGroupAboutDto>();


    const handleDelete = () => {
        confirm({
            title: 'You are about to permantly delete this group conversation for all participants',
            icon: <ExclamationCircleOutlined />,
            content: `${groupProfile.groupName}`,
            onOk() {
                deleteConversation(groupProfile.conversationId);
                router.reload();
            },
            onCancel() {
            },
        });
    }

    useEffect(() => {
        if (updateGroupAbout != null) {
            router.reload()
        }
    }, [updateGroupAbout])


    useEffect(() => {
        if (groupProfile != null) {
            console.log('group profile', groupProfile)
        }
    }, [groupProfile])


    return (
        <Modal
            className={styles.contactProfileModal}
            centered
            visible={showGroup}
            onCancel={() => {
                setUpdateGroupAbout(groupProfile.conversationId, groupAbout);
                setShowGroup(false)
            }}
            cancelButtonProps={{ ghost: true }}
            width={600}
        >
            <div className={styles.contactProfile}>
                <Avatar src={groupProfile.groupAvatarURL} size={250} />
                <h1>{groupProfile.groupName}</h1>
                <h3>Group | {groupProfile.participantsOfConversation.length} participants</h3>
            </div>
            <div className={styles.contactProfileAbout}>
                <p>About</p>
                <Input onChange={(e) => setGroupAbout({ ...groupAbout, about: e.target.value || e.target.defaultValue })} className={styles.groupProfileInput} defaultValue={groupProfile.about} suffix={<EditIcon />} />
            </div>
            <div className={styles.participantSearch}>
                <p>{groupProfile.participantsOfConversation.length} participants</p>
                <List
                    className={styles.groupList}
                    itemLayout="horizontal"
                    dataSource={groupProfile.participantsOfConversation}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={item.phoneNumber == currentUser.phoneNumber ? downloaded : item.avatarURL} />}
                                title={item.phoneNumber == currentUser.phoneNumber ? "You" : item.participantName}
                                description={item.phoneNumber == currentUser.phoneNumber ? "" : item.aboutMe}
                            />
                        </List.Item>
                    )}
                />
            </div>
            <div className={styles.contactProfileIcons}>
                <h4 onClick={handleDelete}><DeleteIcon />Delete chat</h4>
            </div>
        </Modal>
    )
}

export default GroupProfile
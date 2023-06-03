import { Avatar, Input, message } from 'antd';
import styles from '../../styles/Sidebar.module.css';
import React, { FC, useEffect, useState } from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { ConversationDto } from '../../providers/conversations/context';
import { useConversations } from '../../providers/conversations';
import { NextRouter, useRouter } from 'next/router';

type Props = {
    setopenGroupInfo: React.Dispatch<React.SetStateAction<boolean>>,
}

const GroupInfo: FC<Props> = ({ setopenGroupInfo }) => {
    const router: NextRouter = useRouter();
    const { createConversation, conversationDetails, errorMessage } = useConversations();
    const [convoData, setConvoData] = useState<ConversationDto>({
        conversationType: 2,
        groupName: '',
        groupAvatarURL: '',
        about: '',
        archived: false,
        participants: []
    });

    const avatars: string[] = [
        "https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/3228812/pexels-photo-3228812.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/69773/uss-nimitz-basketball-silhouettes-sea-69773.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/461049/pexels-photo-461049.jpeg?auto=compress&cs=tinysrgb&w=600"
    ];

    const handleClick = () => {
        convoData.participants = JSON.parse(sessionStorage.getItem('selectedPartipants')!);
        if (createConversation) createConversation(convoData)
    }


    useEffect(() => {
        if (conversationDetails != null) {
            router.reload();
        } else if (errorMessage) {
            message.error(errorMessage, 10);
        }
    }, [conversationDetails, errorMessage])


    return (
        <>
            <div className={styles.newConvoHead}>
                <ArrowLeftOutlined onClick={() => setopenGroupInfo(false)} />
                <p>New Group</p>
            </div>
            <p className={styles.selectIconP}>Select Group Icon</p>
            <div className={styles.avatars}>
                {avatars.map((avatar) => (
                    <div
                        className={styles.singleAvatar}
                        key={avatar}
                        onClick={(e) => {
                            const target = e.target as HTMLElement;
                            target.style.border = "5px solid rgb(3, 147, 163)";
                            setConvoData({ ...convoData, groupAvatarURL: target.getAttribute("src") });
                        }}>
                        <Avatar src={avatar} size={100} />
                    </div>
                ))}
            </div>
            <div className={styles.groupDetails}>
                <Input placeholder="Enter Group Name" onChange={(e) => setConvoData({ ...convoData, groupName: e.target.value })} /><br /><br /><br /><br />
                <TextArea placeholder="Enter Group Description" onChange={(e) => setConvoData({ ...convoData, about: e.target.value })} />
            </div>
            <div className={styles.newGroupNext}>
                <ArrowRightOutlined onClick={handleClick} />
            </div>
        </>
    )
}

export default GroupInfo
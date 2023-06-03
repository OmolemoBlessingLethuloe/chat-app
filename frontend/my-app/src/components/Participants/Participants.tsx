import { Avatar, List, message, Modal } from 'antd';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useParticipants } from '../../providers/participants';
import { ParticipantDto } from '../../providers/participants/context';
import styles from '../../styles/Sidebar.module.css';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ConversationDto } from '../../providers/conversations/context';
import { useConversations } from '../../providers/conversations';
import { NextRouter, useRouter } from 'next/router';
const { confirm } = Modal;


const Participants = () => {
    const router: NextRouter = useRouter();
    const { getAllParticipants, allParticipantsDetails, download, downloaded } = useParticipants();
    const [data, setData] = useState<ParticipantDto[]>([]);
    const [image, setImage] = useState<any>({})
    const [convoData, setConvoData] = useState<ConversationDto>({
        conversationType: 1,
        groupName: '',
        groupAvatarURL: '',
        about: '',
        archived: false,
        participants: [],
        avatarFilename: ''
    });
    const { createConversation, conversationDetails, errorMessage } = useConversations();
    var testing: ParticipantDto[];

    useEffect(() => {
        if (conversationDetails != null) {
            router.reload();
        } else if (errorMessage) {
            message.error(errorMessage, 10);
        }
    }, [conversationDetails, errorMessage])



    useEffect(() => {
        if (allParticipantsDetails != null) {
            testing = allParticipantsDetails.filter(participant => participant.phoneNumber !== JSON.parse(sessionStorage.getItem("participant")!).phoneNumber)
            testing.forEach(participant => {
                if (participant.avatarFilename != null) {
                    fetch(
                        `https://localhost:44311/api/services/app/Participant/DownloadAvatar?phoneNumber=${participant.phoneNumber}`,
                        {
                            method: "POST",
                            cache: "no-cache",
                        }
                    )
                        .then((response) => response.blob()).then(imageBlob => {
                            participant.avatarURL = URL.createObjectURL(imageBlob);
                        })
                }
            })
            setData(testing)
            sessionStorage.setItem('participants', JSON.stringify(allParticipantsDetails.filter(participant => participant.phoneNumber !== JSON.parse(sessionStorage.getItem("participant")!).phoneNumber)));
            sessionStorage.setItem('selectedPartipants', JSON.stringify([JSON.parse(sessionStorage.getItem("participant")!).phoneNumber]));
        } else {
            if (getAllParticipants) {
                getAllParticipants();
            }
        }
    }, [allParticipantsDetails])

    const setSelected = (phoneNumber: string) => {
        const setSelected = JSON.parse(sessionStorage.getItem('selectedPartipants')!);
        var testing = data.filter(participant => participant.phoneNumber == phoneNumber)
        if (!setSelected.includes(phoneNumber)) {
            setSelected.push(phoneNumber);
            console.log('selectedParticipants', setSelected)
            sessionStorage.setItem('selectedPartipants', JSON.stringify(setSelected));
        }

        if (JSON.parse(sessionStorage.getItem("group")!) == false) {
            confirm({
                title: 'You are about to start a conversation with:',
                icon: <ExclamationCircleOutlined />,
                content: `${testing[0].username}`,
                onOk() {
                    convoData.participants = JSON.parse(sessionStorage.getItem('selectedPartipants')!);
                    console.log('convo data', convoData)
                    if (createConversation) createConversation(convoData)
                },
                onCancel() {
                    const setSelected = JSON.parse(sessionStorage.getItem('selectedPartipants')!);
                    setSelected.pop();
                    console.log('selected Participants', setSelected)
                    sessionStorage.setItem('selectedPartipants', JSON.stringify(setSelected));
                },
            });
        }
    }

    return (
        <List
            className={styles.particiantsList}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
                <div id={item.phoneNumber} className="test" key={item.id}
                    onClick={(event: any) => {
                        event.preventDefault();
                        event.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.04)'
                        setSelected(item.phoneNumber)
                    }}
                >
                    <List.Item className="list-item" >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatarURL} size={55} style={{ border: '1px solid rgba(0, 0, 0, 0.04)' }} />}
                            title={item.username}
                            description={item.aboutMe}
                        />
                    </List.Item>
                </div>
            )}
        />
    )
}

export default Participants
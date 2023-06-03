import { Avatar, List } from 'antd';
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import { useSocket } from '../../hocs/useSocket';
import { useConversations } from '../../providers/conversations';
import { ConversationParticipantDto } from '../../providers/conversations/context';
import { useMessages } from '../../providers/messages';
import { useParticipants } from '../../providers/participants';
import styles from '../../styles/Sidebar.module.css';




const Conversations = () => {
    const { getAllConversations, allConversationDetails, setSelectedConversation } = useConversations();
    const { getAllMessages, AllMessages, setSelectedChat,MessageDetails } = useMessages();
    const { getByPhoneNumber, participantByPhoneNumber } = useParticipants();
    const socket=useSocket();
    const [data, setData] = useState<ConversationParticipantDto[]>([]);
    const [newData, setNewData] = useState<ConversationParticipantDto[]>([]);
    const { currentUser } = useParticipants();
    var testing: ConversationParticipantDto[];

    useEffect(() => {
        if (allConversationDetails?.length) {
            testing = allConversationDetails.filter(convo => convo.archived == false && convo.participantsOfConversation.find(user => user.phoneNumber == JSON.parse(sessionStorage.getItem("participant")!).phoneNumber))
            testing.forEach(conversation => {
                conversation.participantsOfConversation.forEach(p => {
                    if (p.avatarFilename != null) {
                        fetch(
                            `https://localhost:44311/api/services/app/Participant/DownloadAvatar?phoneNumber=${p.phoneNumber}`,
                            {
                                method: "POST",
                                cache: "no-cache",
                            }
                        )
                            .then((response) => response.blob()).then(imageBlob => {
                                p.avatarURL = URL.createObjectURL(imageBlob);
                            })
                    }
                })
            })
            setData(testing)
        } else {
            if (getAllConversations) {
                getAllConversations();
            }
        }
    }, [allConversationDetails])

    useEffect(() => {
      
         getAllMessages()
       
    }, [MessageDetails])


    useEffect(() => {
        if (data.length && AllMessages) {
            data.forEach(conversation => {
                var testing = AllMessages.filter(n => n.conversationId == conversation.conversationId)[0];
                var msg = testing.messages[testing.messages.length - 1];
                if (msg != null) {
                    data.forEach(d => {
                        if (conversation.conversationId == d.conversationId) {
                            d.last = msg.text ? msg.text : `Attachment`
                            d.time = msg.time
                        }
                    })
                }
            })
            setNewData(data)
    
        }
    }, [data,AllMessages])


    

    return (
        <List
            className={styles.particiantsList}
            itemLayout="horizontal"
            dataSource={newData}
            renderItem={item => (
                <div id={item.conversationId} className="test"
                    onClick={(event: any) => {
                        event.preventDefault();
                        event.currentTarget.style.cursor = 'pointer';
                        sessionStorage.setItem('conversation', JSON.stringify({
                            id: item.conversationId
                        }))
                        document.querySelectorAll('.test').forEach(convo => {
                            if (convo.classList.contains('selectedConvo')) {
                                convo.classList.remove('selectedConvo');
                            }
                        })
                        if (event.currentTarget.id === JSON.parse(sessionStorage.getItem('conversation')!).id) {
                            event.currentTarget.classList.add('selectedConvo');
                        }
                        sessionStorage.setItem('testing', JSON.stringify({
                            item
                        }))

                        if (setSelectedConversation) setSelectedConversation(item)

                        AllMessages?.forEach(message => {
                            if (message.conversationId == item.conversationId) {
                                if (setSelectedChat) setSelectedChat(message);
                            }
                        })
                    }}
                >
                    {currentUser &&
                        <List.Item className="list-item">
                            <List.Item.Meta
                                description={<><p>{item.last}</p><span>{item.time}</span></>}
                                avatar={<Avatar src={item.conversationType == 1 ? item.participantsOfConversation[0].phoneNumber == currentUser.phoneNumber ? item.participantsOfConversation[1].avatarURL : item.participantsOfConversation[0].avatarURL : item.groupAvatarURL} size={55} style={{ border: '1px solid rgba(0, 0, 0, 0.04)' }} />}
                                title={item.conversationType == 2 ? item.groupName : item.participantsOfConversation[0].phoneNumber == currentUser.phoneNumber ? item.participantsOfConversation[1].participantName : item.participantsOfConversation[0].participantName}
                            />
                        </List.Item>
                    }
                </div>
            )}
        />
    )
}

export default Conversations
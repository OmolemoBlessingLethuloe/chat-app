import { Image } from 'antd';
import React, { useEffect } from 'react';
import { useMessages } from '../../providers/messages';
import { useParticipants } from '../../providers/participants';
import styles from '../../styles/Sidebar.module.css';


const Chats = () => {
    const { selectedChat, MessageDetails, AllMessages, setSelectedChat } = useMessages();
    const { currentUser } = useParticipants();

    useEffect(() => {
        var chats = document.getElementById("chat") as HTMLDivElement;
        console.log(currentUser)
        if (currentUser?.chatbackgroundPath != null) {
            fetch(
                `https://localhost:44311/api/services/app/Participant/DownloadChatBackground?phoneNumber=${currentUser.phoneNumber}`,
                {
                    method: "POST",
                    cache: "no-cache",
                }
            )
                .then((response) => response.blob()).then(imageBlob => {
                    var imageObjectURL = URL.createObjectURL(imageBlob);
                    chats.style.backgroundImage = `url(${imageObjectURL})`;
                    chats.style.backgroundRepeat = 'no-repeat';
                    chats.style.backgroundSize = 'cover';

                })
        }

        chats.scrollTop = chats.scrollHeight;
        if (selectedChat != null) {
            console.log('selected chat', selectedChat)
            selectedChat.messages.forEach(message => {
                if (message.mediaPath != null) {
                    fetch(
                        `https://localhost:44311/api/services/app/Message/Download?id=${message.messageId}`,
                        {
                            method: "POST",
                            cache: "no-cache",
                        }
                    )
                        .then((response) => response.blob()).then(imageBlob => {
                            message.mediaPath = URL.createObjectURL(imageBlob);
                        })
                }
            })
        }

    }, [selectedChat])



    useEffect(() => {
        if (MessageDetails?.id) {
            AllMessages?.forEach(message => {
                if (message.conversationId == MessageDetails?.conversationId) {

                    if (setSelectedChat) setSelectedChat(message);
                }
            })
        }
    }, [MessageDetails, AllMessages])


    return (
        <div className={styles.chats} id="chat">
            {selectedChat?.messages.map((message, index) => {
                return (
                    <div
                        key={index}
                        className={`${styles.alignMessage} ${message.participantId == currentUser.id
                            ? styles.alignMe
                            : styles.alignThem
                            }`}
                    >
                        <div
                            className={`${styles.styleMessage} ${message.participantId == currentUser.id
                                ? styles.styleMe
                                : styles.styleThem
                                }`}
                        >
                            {message.mediaPath && <div className={styles.media} >
                                <Image src={message.mediaPath} alt={message.mediaPath} />
                            </div>
                            }
                            {selectedChat.conversationType == 2 &&
                                <div
                                    className={`${styles.senderStyle} ${message.participantId == currentUser.id ? styles.meAsSender : ""
                                        }`}
                                >
                                    {message.participantId == currentUser.id
                                        ? ""
                                        : message.senderName}
                                </div>
                            }

                            {message.text}
                            <p>{message.time}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default Chats
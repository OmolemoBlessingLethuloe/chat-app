import { Input, Upload } from 'antd'
import { PaperClipOutlined, SmileOutlined } from '@ant-design/icons';
import React, { FC, useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import styles from '../../styles/Sidebar.module.css';
import { useMessages } from '../../providers/messages';
import { MessageDto } from '../../providers/messages/context';
import { useParticipants } from '../../providers/participants';
import { RcFile, UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';


type Props = {
    socket: any,
    setNewMessage: (val: boolean) => void,
    isNewMessage?: boolean;
}

const MessageBar: FC<Props> = ({ socket, setNewMessage, isNewMessage }) => {
    const [message, setMessage] = useState<MessageDto>({
        text: '',
    })
    const { createMessage, getAllMessages, AllMessages, MessageDetails, selectedChat } = useMessages();
    const [imageName, setImageName] = useState<string>();
    const { currentUser } = useParticipants();
    const [textField, setTextField] = useState<HTMLInputElement>();


    useEffect(() => {
        if (selectedChat != null) {
            console.log(selectedChat, 'Selected message bar')
        }
    }, [selectedChat])


    useEffect(() => {
        setTextField(document.getElementById('txtMessage') as HTMLInputElement)
    }, [])

    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };

    const handleChange = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj as RcFile, url => {
                setImageName(info.file.name)
                setMessage({ ...message, media: info.file.originFileObj })
            });
        }
    };

    useEffect(() => {
        if (MessageDetails != null) {
            console.log('message sent', MessageDetails);
            console.log('textField', textField)
            textField.value = '';

            // router.reload();
        }
    }, [MessageDetails])

    useEffect(() => {
        if (currentUser != null) {
            console.log('current user', currentUser)
        }
    }, [currentUser])


    const handleSubmit = async () => {
        const formData = new FormData();

        formData.append("conversationId", JSON.parse(sessionStorage.getItem('conversation')!).id);
        formData.append("participantId", currentUser.id);
        formData.append("text", textField.value);
        formData.append("media", message.media);
        console.log(Object.fromEntries(formData));
        createMessage(formData)

        formData.append("time", new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes())

        await socket.emit("send_message", Object.fromEntries(formData))
    };


    useEffect(() => {
        socket.on("receive_message", (data: any) => {
            setNewMessage(!isNewMessage);
            let alreadyExist = selectedChat.messages?.find(msg => {
                return (msg?.text + msg?.time === data?.text + data?.time)
            })
            if (selectedChat != null && !alreadyExist) {
                selectedChat.messages.push({
                    messageId: '',
                    participantId: data.participantId,
                    senderName: currentUser.username,
                    text: data.text,
                    mediaPath: null,
                    recipients: [],
                    time: data.time
                })
                getAllMessages()
                console.log(AllMessages, 'drftgyhuiojfgxdgfchjkfxdvfbcghilo;jhgcfbcghj');
            }



        });

    }, [socket]);



    function loadAllEmoji() {
        var emoji = '';
        for (var i = 128512; i <= 128700; i++) {
            emoji += `<a href="#" style="font-size: 22px;">&#${i};</a>`;
        }

        document.getElementById('smiley').innerHTML = emoji;
    }

    const handleClick = () => {
        document.getElementById('smiley').style.display = 'block';
        loadAllEmoji();
        document.querySelectorAll('a').forEach(a => a.addEventListener('click', getEmoji))

    }


    const getEmoji = (e: any) => {
        textField.value += e.currentTarget.innerHTML;
    }


    return (
        <>
            <div id="smiley" style={{ display: 'none' }}>

            </div>
            <div className={styles.messageBar}>

                <SmileOutlined onClick={handleClick} />
                <Upload
                    onChange={handleChange}
                ><PaperClipOutlined /></Upload>
                <Input id='txtMessage' placeholder="Start typing..." onChange={(e) => {
                    document.getElementById('smiley').style.display = 'none'
                }}
                />
                <SendIcon onClick={handleSubmit} />
            </div>
        </>
    )
}

export default MessageBar
import React, { FC, useEffect, useState } from 'react';
import styles from '../../styles/Sidebar.module.css';
import { ArrowLeftOutlined, SearchOutlined } from '@ant-design/icons';
import { Avatar, Input } from 'antd';
import GroupIcon from '@mui/icons-material/Group';
import Participants from '../Participants/Participants';
import NewGroup from '../NewGroup/NewGroup';
import { useParticipants } from '../../providers/participants';

type Props = {
    setStartConvo: React.Dispatch<React.SetStateAction<boolean>>,
}

const NewConversation: FC<Props> = ({ setStartConvo }) => {
    const [openNewGroup, setOpenNewGroup] = useState<boolean>(false);
    const { searchByNameOrNumber, allParticipantsDetails } = useParticipants();

    useEffect(() => {
        sessionStorage.setItem('group', 'false');
    }, [openNewGroup])

    const onSearch = (value: string) => {
        searchByNameOrNumber(value)
    }


    useEffect(() => {
        if (allParticipantsDetails != null) {
            console.log('participants', allParticipantsDetails)
        }
    }, [allParticipantsDetails]);


    return (
        <>
            {openNewGroup ? <NewGroup setOpenNewGroup={setOpenNewGroup} /> :
                <div className={styles.newConvo}>
                    <div className={styles.newConvoHead}>
                        <ArrowLeftOutlined onClick={() => setStartConvo(false)} />
                        <p>New Chat</p>
                    </div>
                    <div className={styles.newConvoSearch}>
                        <SearchOutlined />
                        <Input placeholder="Search a chat" onChange={(e) => onSearch(e.target.value)} />
                    </div>
                    <div className={styles.newGroup} onClick={() => setOpenNewGroup(true)}>
                        <Avatar size={50} style={{ backgroundColor: 'rgb(3, 147, 163)' }} icon={<GroupIcon />} />
                        <p>New Group</p>
                    </div>
                    <div className={styles.participantDetails}>
                        <Participants />
                    </div>
                </div>
            }
        </>
    )
}

export default NewConversation
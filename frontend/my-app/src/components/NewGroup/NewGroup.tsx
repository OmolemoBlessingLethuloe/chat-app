import React, { FC, useEffect, useState } from 'react';
import styles from '../../styles/Sidebar.module.css';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import Participants from '../Participants/Participants';
import GroupInfo from '../GroupInfo/GroupInfo';
import { useParticipants } from '../../providers/participants';

type Props = {
    setOpenNewGroup: React.Dispatch<React.SetStateAction<boolean>>,
}

const NewGroup: FC<Props> = ({ setOpenNewGroup }) => {
    const [openGroupInfo, setopenGroupInfo] = useState<boolean>(false);
    const { searchByNameOrNumber, allParticipantsDetails } = useParticipants();


    useEffect(() => {
        sessionStorage.setItem('group', 'true');
    }, [])


    const onSearch = (value: string) => {
        searchByNameOrNumber(value)
    }


    useEffect(() => {
        if (allParticipantsDetails != null) {
            console.log('participant details', allParticipantsDetails)
        }
    }, [allParticipantsDetails]);

    return (
        <>
            {openGroupInfo ? <GroupInfo setopenGroupInfo={setopenGroupInfo} /> : <div className={styles.newGroupModal}>
                <div className={styles.newConvoHead}>
                    <ArrowLeftOutlined onClick={() => setOpenNewGroup(false)} />
                    <p>Add Group Participants</p>
                </div>
                <div className={styles.newGroupParticipants}>
                    <Input className={styles.typeContact} placeholder="Type contact name" onChange={(e) => onSearch(e.target.value)} />
                </div>
                <div className={styles.participantDetails}>
                    <Participants />
                </div>
                <div className={styles.newGroupNext}>
                    <ArrowRightOutlined onClick={() => setopenGroupInfo(true)} />
                </div>

            </div>
            }
        </>
    )
}

export default NewGroup
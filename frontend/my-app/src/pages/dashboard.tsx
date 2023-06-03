import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import ChatHeader from '../components/ChatHeader/ChatHeader';
import Chats from '../components/Chats/Chats';
import MessageBar from '../components/MessageBar/MessageBar';
import Sidebar from '../components/Sidebar/Sidebar';
import { useConversations } from '../providers/conversations';
import { useMessages } from '../providers/messages';
import { useParticipants } from '../providers/participants';
import LandingPage from '../components/LandingPage/LandingPage';
import { useSocket } from '../hocs/useSocket';



const { Header, Content, Footer, Sider } = Layout;


const Dashboard: FC = () => {
  const { currentUser } = useParticipants();
  const { selectedChat } = useMessages();
  const socket = useSocket();
  const [isNewMessage, setNewMessage] = useState<boolean>(false);
  if (currentUser !== null && selectedChat !== null) {
    socket.emit("join_room", selectedChat?.conversationId);
  }
  useEffect(() => {
    console.log('new message alert')
  }, [isNewMessage])

  return (
    <Layout>
      <Sider><Sidebar /></Sider>
      {selectedChat ?
        <Layout>
          <Header><ChatHeader /></Header>
          <Content><Chats /></Content>
          <MessageBar socket={socket} setNewMessage={setNewMessage} isNewMessage={isNewMessage} />
        </Layout>
        :
        <Layout>
          <Content><LandingPage /></Content>
        </Layout>}
    </Layout>
  )
}

export default Dashboard;
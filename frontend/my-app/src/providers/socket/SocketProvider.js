import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useMessages } from '../messages'
import { useParticipants } from '../participants'

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export const SocketProvider= ({ children }) => {
  const [socket, setSocket] = useState();
  const { selectedConversation } = useMessages();
  // const [id, setId] = useState();
  var id;


  // console.log('-------------------------------------------------',selectedConversation);
  // useEffect(() => {
  //   if (allParticipantsDetails != null) {
  //     console.log('gvscjhbskefbkesbjkfbes,jcjkbzjkbckbsbfksb,jdjscjkbskjbfkjbskjbjksbkjbf')
  //     setId(
  //       allParticipantsDetails.filter(
  //         (participant) =>
  //           participant.phoneNumber ==
  //           JSON.parse(sessionStorage.getItem("participant")).phoneNumber
  //       )[0].id
  //     );
  //   } else {
  //     if (getAllParticipants) {
  //       getAllParticipants();
  //     }
  //   }
  // }, [allParticipantsDetails]);
  if (selectedConversation != null){
    id =selectedConversation?.conversationId;
  }

  useEffect(() => {
    console.log(id,'=------------------')
    const newSocket = io('http://localhost:5000',
      {
        query: { id }
      }
    )
    newSocket.on('connect', () => {
      console.log(`You are connected with id: ${newSocket.id}`)
    })
    setSocket(newSocket)

    return () => newSocket.close()
  }, [id])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}
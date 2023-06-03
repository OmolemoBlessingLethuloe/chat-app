import React, { useReducer, useContext, PropsWithChildren, useEffect, useCallback } from 'react';
import { MessageReducer } from './reducer';
import { MessageActionsContext, MessageContext, INITIAL_STATE, MessageDto, ConversationMessagesDto } from './context';
import { createMessageRequestAction, errorRequestAction, getAllMessagesRequestAction, getSelectedConversationRequestAction } from './action';

const MessageProvider: React.FC<PropsWithChildren<any>> = ({children}) => {
    const [state, dispatch] = useReducer(MessageReducer, INITIAL_STATE);

    const setSelectedChat = (payload:ConversationMessagesDto) => {
        dispatch(getSelectedConversationRequestAction(payload))
    }

    const getAllMessages = async() => {
        await fetch('https://localhost:44311/api/services/app/Message/GetConversationMessages', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        }
        ).then(res => {
            res.json().then(info => {
                dispatch(getAllMessagesRequestAction(info.result));
            })
        })
    }


    const createMessage = async (payload: any) => {
        await fetch('https://localhost:44311/api/services/app/Message/Create', {
            method: "POST",
            cache: "no-cache",
            body: payload
        }).then(res => {
            // console.log(socket.emit('send-message',(payload)))
            // socket.emit('send-message',(payload));
            res.json().then(info => {
                if (info.success) {
                    dispatch(createMessageRequestAction(info?.result)) 
                } else if (info.error) {
                    dispatch(errorRequestAction(info.error.message));
                }
            })
        })
    }

    // useEffect(() => {
    //     if (socket == null) return
    
    //     console.log(socket.on('receive-message', addMessageToConversation))
    //     socket.on('receive-message', addMessageToConversation)
    
    //     return () => socket.off('receive-message')
    //   }, [socket, addMessageToConversation])


    return (
        <MessageContext.Provider value={state}>
            <MessageActionsContext.Provider value={{ getAllMessages, createMessage, setSelectedChat}}>
                {children}
            </MessageActionsContext.Provider>
        </MessageContext.Provider>
    )
}

function useMessageState() {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error('useAuthState must be used within an AuthProvider');
    }
    return context;
}

function useMessageActions() {
    const context = useContext(MessageActionsContext);
    if (context === undefined) {
        throw new Error('useAuthActions must be used within a AuthProvider');
    }
    return context;
}

function useMessages() {
    return {
        ...useMessageState(),
        ...useMessageActions()
    }
}

export { MessageProvider, useMessages };
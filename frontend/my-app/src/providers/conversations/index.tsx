import React, { useReducer, useContext, PropsWithChildren } from 'react';
import { ConversationReducer } from './reducer';
import { ArchiveDto, ChangeGroupAboutDto, ConversationActionsContext, ConversationContext, ConversationParticipantDto, INITIAL_STATE } from './context';
import { getConversationsRequestAction, createConversationRequestAction, errorRequest, getSelectedConversationRequestAction, setGroupProfileRequestAction, setUpdateGroupAboutRequestAction, deleteConversationRequestAction, searchByNameRequestAction, archiveConversationRequestAction, setIsArchivedRequestAction } from './action';

const ConversationProvider: React.FC<PropsWithChildren<any>> = ({ children }) => {
    const [state, dispatch] = useReducer(ConversationReducer, INITIAL_STATE);


    const setSelectedConversation = (payload: ConversationParticipantDto) => {
        dispatch(getSelectedConversationRequestAction(payload))
    }


    const setGroupProfile = (payload: ConversationParticipantDto) => {
        dispatch(setGroupProfileRequestAction(payload))
    }

    const setIsArchived = (payload: boolean) => {
        dispatch(setIsArchivedRequestAction(payload))
    }

    const deleteConversation = async (id:string) => {
            await fetch(`https://localhost:44311/api/services/app/Conversation/Delete?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                }
            }).then(res => {
                res.json().then(data => {
                    dispatch(deleteConversationRequestAction(data))
                })
            })
    }


    const searchByName = async (term: string) => {
        await fetch(`https://localhost:44311/api/services/app/Conversation/GetBySearch?term=${term}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        }
        ).then(res => {
            res.json().then(info => {
                dispatch(searchByNameRequestAction(info.result));
            })
        })
    }

    const createConversation = async (payload: any) => {
        await fetch('https://localhost:44311/api/services/app/Conversation/Create', {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then(res => {
            res.json().then(info => {
                if (info.success) {
                    dispatch(createConversationRequestAction(payload))
                } else if (info.error) {
                    dispatch(errorRequest(info.error.message));
                }
            })
        })
    }

    const getAllConversations = async () => {
        await fetch('https://localhost:44311/api/services/app/Conversation/GetAllConversations', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        }
        ).then(res => {
            res.json().then(info => {
                dispatch(getConversationsRequestAction(info.result));
            })
        })
    }


    const setUpdateGroupAbout = async (conversationId: string, payload: ChangeGroupAboutDto) => {
        await fetch(`https://localhost:44311/api/services/app/Conversation/UpdateAboutMe?conversationId=${conversationId}`, {
            method: 'PUT',
            cache: "no-cache",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(res => {
            res.json().then(info => {
                if (info.success) {
                    dispatch(setUpdateGroupAboutRequestAction(payload)) 
                } else if (info.error) {
                    dispatch(errorRequest(info.error.message));
                }
            })
        })
    }

    const archiveConversation = async (conversationId: string, payload: ArchiveDto) => {
        await fetch(`https://localhost:44311/api/services/app/Conversation/UpdateArchive?conversationId=${conversationId}`, {
            method: 'PUT',
            cache: "no-cache",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(res => {
            res.json().then(info => {
                if (info.success) {
                    dispatch(archiveConversationRequestAction(info.result))
                } else if (info.error) {
                    dispatch(errorRequest(info.error.message));
                }
            })
        })
    }

    return (
        <ConversationContext.Provider value={state}>
            <ConversationActionsContext.Provider value={{ setIsArchived, archiveConversation, searchByName, deleteConversation, setUpdateGroupAbout, setSelectedConversation, createConversation, getAllConversations, setGroupProfile }}>
                {children}
            </ConversationActionsContext.Provider>
        </ConversationContext.Provider>
    )
}

function useConversationState() {
    const context = useContext(ConversationContext);
    if (!context) {
        throw new Error('useAuthState must be used within an AuthProvider');
    }
    return context;
}

function useConversationActions() {
    const context = useContext(ConversationActionsContext);
    if (context === undefined) {
        throw new Error('useAuthActions must be used within a AuthProvider');
    }
    return context;
}

function useConversations() {
    return {
        ...useConversationState(),
        ...useConversationActions()
    }
}

export { ConversationProvider, useConversations };
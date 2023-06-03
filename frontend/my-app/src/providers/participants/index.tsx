import React, { useReducer, useContext, PropsWithChildren, useState } from 'react';
import { ParticipantReducer } from './reducer';
import { ParticipantActionsContext, ParticipantContext, INITIAL_STATE, IParticipantStateContext, ParticipantDto, LoginDto, ContactProfileDto, UpdateAboutMeDto, UpdateUsernameDto, UpdateFileDto, StatusDto } from './context';
import { changeBackgroundRequestAction, createParticipantRequestAction, downloadRequestAction, errorRequest, getByPhoneNumberRequestAction, getParticipantsRequestAction, loginRequestAction, searchByNameOrNumberRequestAction, setContactProfileRequestAction, setCurrentUserRequestAction, updateAboutMeRequestAction, updateAvatarRequestAction, updateUsernameRequestAction } from './action';

const ParticipantProvider: React.FC<PropsWithChildren<any>> = ({ children }) => {
    const [state, dispatch] = useReducer(ParticipantReducer, INITIAL_STATE);

    const setCurrentUser = (payload: ParticipantDto) => {
        dispatch(setCurrentUserRequestAction(payload))
    }

    const setContactProfile = (payload: ContactProfileDto) => {
        dispatch(setContactProfileRequestAction(payload))
    }

    const login = async (payload: LoginDto) => {
        await fetch('https://localhost:44311/api/services/app/Participant/Login', {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }).then(res => {
            res.json().then(info => {
                if (info.success) {
                    dispatch(loginRequestAction(info.result));
                } else if (info.error) {
                    dispatch(errorRequest(info.error.message))
                }
            })
        })
    }

    const download = async (phoneNumber: string) => {
        await fetch(
            `https://localhost:44311/api/services/app/Participant/DownloadAvatar?phoneNumber=${phoneNumber}`,
            {
                method: "POST",
                cache: "no-cache",
            }
        )
            .then((response) => response.blob()).then(imageBlob => {
                var imageObjectURL = URL.createObjectURL(imageBlob);
                dispatch(downloadRequestAction(imageObjectURL))
                // var anchor = document.createElement('div');
                // anchor.className = 'testingBlob'
                // anchor.style.backgroundImage = `url(${imageObjectURL})`
                // document.querySelector('body').appendChild(anchor);
            });
    };


    const createParticipant = async (payload: any) => {
        await fetch('https://localhost:44311/api/services/app/Participant/Create', {
            method: "POST",
            body: payload
        }).then(res => {
            res.json().then(async info => {
                if (info.success) {
                    dispatch(createParticipantRequestAction(info.result));
                } else if (info.error) {
                    dispatch(errorRequest(info.error.message));
                }
            })
        })
    }

    const changeBackground = async (phoneNumber: string, payload: any) => {
        await fetch(`https://localhost:44311/api/services/app/Participant/ChangeBackground?phoneNumber=${phoneNumber}`, {
            method: "POST",
            body: payload
        }).then(res => {
            res.json().then(async info => {
                if (info.success) {
                    dispatch(changeBackgroundRequestAction(info.result));
                } else if (info.error) {
                    dispatch(errorRequest(info.error.message));
                }
            })
        })
    }

    const getAllParticipants = async () => {
        await fetch('https://localhost:44311/api/services/app/Participant/GetAll', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        }
        ).then(res => {
            res.json().then(info => {
                dispatch(getParticipantsRequestAction(info.result));
            })
        })
    }

    const getByPhoneNumber = async (phoneNumber: string) => {
        await fetch(`https://localhost:44311/api/services/app/Participant/GetParticipants?phoneNumber=${phoneNumber}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        }
        ).then(res => {
            res.json().then(info => {
                dispatch(getByPhoneNumberRequestAction(info.result));
            })
        })
    }

    const searchByNameOrNumber = async (term: string) => {
        await fetch(`https://localhost:44311/api/services/app/Participant/GetBySearch?term=${term}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        }
        ).then(res => {
            res.json().then(info => {
                dispatch(searchByNameOrNumberRequestAction(info.result));
            })
        })
    }

    const setUpdateAboutMe = async (phoneNumber: string, payload: UpdateAboutMeDto) => {
        await fetch(`https://localhost:44311/api/services/app/Participant/UpdateAboutMe?phoneNumber=${phoneNumber}`, {
            method: 'PUT',
            cache: "no-cache",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(res => {
            res.json().then(info => {
                if (info.success) {
                    { dispatch(updateAboutMeRequestAction(payload)) }
                } else if (info.error) {
                    dispatch(errorRequest(info.error.message));
                }
            })
        })
    }


    const updateAvatar = async (phoneNumber: string, payload: any) => {
        await fetch(`https://localhost:44311/api/services/app/Participant/UpdateAvatar?phoneNumber=${phoneNumber}`, {
            method: 'PUT',
            cache: "no-cache",
            body: payload
        }).then(res => {
            res.json().then(async info => {
                if (info.success) {
                    dispatch(updateAvatarRequestAction(info.result));
                } else if (info.error) {
                    dispatch(errorRequest(info.error.message));
                }
            })
        })
    }


    const setUpdateUsername = async (phoneNumber: string, payload: UpdateUsernameDto) => {
        await fetch(`https://localhost:44311/api/services/app/Participant/UpdateUsername?phoneNumber=${phoneNumber}`, {
            method: 'PUT',
            cache: "no-cache",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(res => {
            res.json().then(info => {
                if (info.success) {
                    { dispatch(updateUsernameRequestAction(payload)) }
                } else if (info.error) {
                    dispatch(errorRequest(info.error.message));
                }
            })
        })
    }

    return (
        <ParticipantContext.Provider value={state}>
            <ParticipantActionsContext.Provider value={{ updateAvatar, changeBackground, searchByNameOrNumber, download, login, createParticipant, getAllParticipants, getByPhoneNumber, setCurrentUser, setContactProfile, setUpdateAboutMe, setUpdateUsername }}>
                {children}
            </ParticipantActionsContext.Provider>
        </ParticipantContext.Provider>
    )
}

function useParticipantState() {
    const context = useContext(ParticipantContext);
    if (!context) {
        throw new Error('useAuthState must be used within an AuthProvider');
    }
    return context;
}

function useParticipantActions() {
    const context = useContext(ParticipantActionsContext);
    if (context === undefined) {
        throw new Error('useAuthActions must be used within a AuthProvider');
    }
    return context;
}

function useParticipants() {
    return {
        ...useParticipantState(),
        ...useParticipantActions()
    }
}

export { ParticipantProvider, useParticipants };
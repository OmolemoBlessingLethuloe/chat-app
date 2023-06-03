import { createAction } from 'redux-actions';
import { ChangeBackgroundDto, ContactProfileDto, IParticipantStateContext, LoginDto, ParticipantDto, StatusDto, UpdateAboutMeDto, UpdateUsernameDto } from './context';

export enum ParticipantsActionEnums {
    getParticipantsRequest= 'GET_PARTICIPANTS',
    createParticipantRequest= 'CREATE_PARTICIPANT',
    getByPhoneNumberRequest = 'GET_BY_PHONE_NUMBER',
    setSelectedParticipantsRequest = 'SET_SELECTED_PARTICIPANTS',
    loginRequest= 'LOGIN',
    errorRequest= 'ERROR',
    setCurrentUserRequest = 'SET_CURRENT_USER',
    setContactProfileRequest = 'SET_CONTACT_PROFILE',
    updateAboutMeRequest = 'UPDATE_ABOUT_ME',
    updateUsernameRequest = 'UPDATE_USERNAME_REQUEST',
    downloadRequest = 'DOWNLOAD_REQUEST',
    searchByNameOrNumberRequest = 'SEARCH_BY_NAME_OR_NUMBER',
    changeBackgroundRequest = 'CHANGE_BACKGROUND',
    updateAvatarRequest = 'UPDATE_AVATAR'
}

export const createParticipantRequestAction = createAction<IParticipantStateContext, any>(ParticipantsActionEnums.createParticipantRequest, (participantDetails)=> ({participantDetails}));
export const getParticipantsRequestAction = createAction<IParticipantStateContext, ParticipantDto[]>(ParticipantsActionEnums.getParticipantsRequest, (allParticipantsDetails) => ({allParticipantsDetails}));
export const getByPhoneNumberRequestAction = createAction<IParticipantStateContext, ParticipantDto>(ParticipantsActionEnums.getByPhoneNumberRequest, (participantByPhoneNumber) => ({participantByPhoneNumber}));
export const loginRequestAction = createAction<IParticipantStateContext,LoginDto>(ParticipantsActionEnums.loginRequest, (loginDetails) => ({loginDetails}));
export const errorRequest = createAction<IParticipantStateContext, string>(ParticipantsActionEnums.errorRequest, (errorMessage) => ({errorMessage}));
export const setCurrentUserRequestAction = createAction<IParticipantStateContext, ParticipantDto>(ParticipantsActionEnums.setCurrentUserRequest, (currentUser) => ({currentUser}));
export const setContactProfileRequestAction = createAction<IParticipantStateContext, ContactProfileDto>(ParticipantsActionEnums.setContactProfileRequest, (contactProfile) => ({contactProfile}));
export const updateAboutMeRequestAction = createAction<IParticipantStateContext, UpdateAboutMeDto>(ParticipantsActionEnums.setContactProfileRequest, (updateAboutMe) => ({updateAboutMe}));
export const updateUsernameRequestAction = createAction<IParticipantStateContext, UpdateUsernameDto>(ParticipantsActionEnums.setContactProfileRequest, (updateUsername) => ({updateUsername}));
export const downloadRequestAction = createAction<IParticipantStateContext, string>(ParticipantsActionEnums.downloadRequest, (downloaded) => ({downloaded}));
export const searchByNameOrNumberRequestAction = createAction<IParticipantStateContext, ParticipantDto[]>(ParticipantsActionEnums.searchByNameOrNumberRequest, (allParticipantsDetails) => ({allParticipantsDetails}));
export const changeBackgroundRequestAction = createAction<IParticipantStateContext, ChangeBackgroundDto>(ParticipantsActionEnums.changeBackgroundRequest, (chatBackground) => ({chatBackground}));
export const updateAvatarRequestAction = createAction<IParticipantStateContext, ParticipantDto>(ParticipantsActionEnums.updateAvatarRequest, (newAvatar) => ({newAvatar}));









import { createAction } from 'redux-actions';
import { ChangeGroupAboutDto, ConversationDto, ConversationParticipantDto, IConversationStateContext } from './context';

export enum ConversationsActionEnums {
    getConversationsRequest= 'GET_CONVERSATIONS',
    createConversationRequest= 'CREATE_CONVERSATION',
    errorRequest= 'ERROR',
    getSelectedConversationRequest = 'SELECTED_CONVERSATION',
    setGroupProfileRequest = 'SET_GROUP_PROFILE',
    setUpdateGroupAboutRequest = 'UPDATE_GROUP_ABOUT',
    deleteConversationRequest = 'DELETE_CONVERSATION',
    archiveConversationRequest = 'ARCHIVE_CONVERSATION',
    searchByNameRequest = 'SEARCH_BY_NAME',
    setIsArchivedRequest = 'SET_IS_ARCHIVED',
}

export const getConversationsRequestAction = createAction<IConversationStateContext, ConversationParticipantDto[]>(ConversationsActionEnums.getConversationsRequest, (allConversationDetails) => ({allConversationDetails}));
export const searchByNameRequestAction = createAction<IConversationStateContext, ConversationParticipantDto[]>(ConversationsActionEnums.searchByNameRequest, (allConversationDetails) => ({allConversationDetails}));
export const createConversationRequestAction = createAction<IConversationStateContext, ConversationDto>(ConversationsActionEnums.createConversationRequest, (conversationDetails) => ({conversationDetails}));
export const errorRequest = createAction<IConversationStateContext, string>(ConversationsActionEnums.errorRequest, (errorMessage) => ({errorMessage}));
export const getSelectedConversationRequestAction = createAction<IConversationStateContext, ConversationParticipantDto>(ConversationsActionEnums.getSelectedConversationRequest, (selectedConversation) => ({selectedConversation}));
export const setGroupProfileRequestAction = createAction<IConversationStateContext, ConversationParticipantDto>(ConversationsActionEnums.setGroupProfileRequest, (groupProfile) => ({groupProfile}));
export const setUpdateGroupAboutRequestAction = createAction<IConversationStateContext, ChangeGroupAboutDto>(ConversationsActionEnums.setUpdateGroupAboutRequest, (updateGroupAbout) => ({updateGroupAbout}));
export const deleteConversationRequestAction = createAction<IConversationStateContext, ConversationDto>(ConversationsActionEnums.deleteConversationRequest, (deletedConversation) => ({deletedConversation}));
export const archiveConversationRequestAction = createAction<IConversationStateContext, ConversationDto>(ConversationsActionEnums.archiveConversationRequest, (archivedConversation) => ({archivedConversation}));
export const setIsArchivedRequestAction = createAction<IConversationStateContext, boolean>(ConversationsActionEnums.archiveConversationRequest, (isArchived) => ({isArchived}));






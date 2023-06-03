import { createAction } from 'redux-actions';
import { ConversationMessagesDto, IMessageStateContext, MessageDto } from './context';

export enum MessagesActionEnum {
    createMessageRequest = 'CREATE_MESSAGE',
    getAllMessagesRequest = 'GET_ALL_MESSAGES',
    errorRequest= 'ERROR',
    getSelectedConversationRequest = 'SELECTED_CONVERSATION'
}

export const createMessageRequestAction = createAction<IMessageStateContext, MessageDto>(MessagesActionEnum.createMessageRequest, (MessageDetails) => ({MessageDetails}));
export const getAllMessagesRequestAction = createAction<IMessageStateContext, ConversationMessagesDto[]>(MessagesActionEnum.getAllMessagesRequest, (AllMessages) => ({AllMessages}));
export const errorRequestAction = createAction<IMessageStateContext, string>(MessagesActionEnum.getAllMessagesRequest, (ErrorMessage) => ({ErrorMessage}));
export const getSelectedConversationRequestAction = createAction<IMessageStateContext, ConversationMessagesDto>(MessagesActionEnum.getAllMessagesRequest, (selectedChat) => ({selectedChat}));



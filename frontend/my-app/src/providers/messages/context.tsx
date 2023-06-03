import { RcFile } from "antd/lib/upload";
import { createContext } from "react";

export interface MessageDto {
    id?: string;
    conversationId?: string,
    participantId?: string,
    text?: string,
    mediaPath?: string,
    media?: RcFile
}

export interface ConversationMessagesDto {
    conversationId: string,
    conversationType: number,
    messages: MessagesHistoryDto[]
}

export interface MessagesHistoryDto {
    messageId: string,
    participantId: string,
    senderName: string,
    text: string,
    mediaPath: string,
    time: string,
    recipients: RecipientDto[]
}

export interface RecipientDto {
    recipientName: string,
    phoneNumber: string
}

export interface IMessageStateContext {
    readonly MessageDetails?: MessageDto;
    readonly AllMessages?: ConversationMessagesDto[];
    readonly ErrorMessage?: string;
    readonly selectedChat?: ConversationMessagesDto
}

export const INITIAL_STATE: IMessageStateContext = {};

export interface IMessageActionsContext {
    createMessage?: (payload: any) => void;
    getAllMessages?: () => void;
    setSelectedChat?: (payload: ConversationMessagesDto) => void;
}

const MessageContext = createContext<IMessageStateContext>(INITIAL_STATE);

const MessageActionsContext = createContext<IMessageActionsContext>({});

export {MessageContext, MessageActionsContext};
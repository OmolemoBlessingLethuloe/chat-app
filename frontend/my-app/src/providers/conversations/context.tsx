import { RcFile } from "antd/lib/upload";
import { createContext } from "react";

export interface ConversationDto {
    conversationType: number,
    groupName: string,
    groupAvatarURL: string | null,
    archived: boolean,
    about: string,
    participants: string[],
    avatarFilename?: string | null, 
    avatar?: RcFile
}

export interface ParticipantsOfConversationDto {
    participantName: string,
    phoneNumber: string,
    avatarURL: string,
    avatarFilename: string,
    aboutMe: string
}

export interface ConversationParticipantDto {
    conversationId: string,
    conversationType: number,
    groupName: string,
    groupAvatarURL: string,
    last: string,
    time: string,
    archived: boolean,
    about: string,
    participantsOfConversation: ParticipantsOfConversationDto[]
}

export interface ChangeGroupAboutDto {
    about: string,
}

export interface ArchiveDto {
    archived: boolean,
}

export interface IConversationStateContext {
    readonly conversationDetails?: ConversationDto;
    readonly allConversationDetails?: ConversationParticipantDto[];
    readonly errorMessage?: string;
    readonly selectedConversation?: ConversationParticipantDto;
    readonly groupProfile?: ConversationParticipantDto;
    readonly updateGroupAbout?: ChangeGroupAboutDto;
    readonly deletedConversation?: ConversationDto;
    readonly archivedConversation?: ConversationDto;
    readonly isArchived?: boolean;
}

export const INITIAL_STATE: IConversationStateContext = {};

export interface IConversationActionsContext {
    createConversation?:(payload:any) => void;
    getAllConversations?:() => void;
    setSelectedConversation?: (payload: ConversationParticipantDto) => void;
    setGroupProfile?: (payload: ConversationParticipantDto) => void;
    setUpdateGroupAbout?: (conversationId: string, payload: ChangeGroupAboutDto) => void;
    deleteConversation?: (id: string) => void;
    searchByName?:(term:string) => void;
    archiveConversation?: (conversationId: string, payload:ArchiveDto) => void;
    setIsArchived?: (payload: boolean) => void;
}

const ConversationContext = createContext<IConversationStateContext>(INITIAL_STATE);
const ConversationActionsContext = createContext<IConversationActionsContext>({});

export {ConversationContext, ConversationActionsContext};


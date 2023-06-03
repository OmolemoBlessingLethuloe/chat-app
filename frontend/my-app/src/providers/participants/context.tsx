import { RcFile } from "antd/lib/upload";
import { createContext } from "react";

export interface ParticipantDto {
  id?: string;
  username: string;
  phoneNumber: string;
  aboutMe: string;
  status: boolean;
  age: number;
  avatarURL: string | null;
  emailAddress: string;
  firstName: string;
  lastName: string;
  gender: string;
  password: string;
  avatarFilename?: string | null;
  avatar?: RcFile;
  chatbackgroundPath?: string;
  chatbackground?: RcFile;
}

export interface ContactProfileDto {
  participantName: string;
  phoneNumber: string;
  avatarURL: string;
  aboutMe: string;
}

export interface UpdateUsernameDto {
  username: string;
}

export interface UpdateFileDto {
  avatar?: RcFile;
}

export interface UpdateAboutMeDto {
  aboutMe: string;
}

export interface LoginDto {
  phoneNumber: string;
  password: string;
}

export interface StatusDto {
  status: boolean;
}

export interface ChangeBackgroundDto {
  chatBackground?: RcFile;
  chatBackgroundPath?: string;
}

export interface IParticipantStateContext {
  readonly participantDetails?: ParticipantDto;
  readonly loginDetails?: LoginDto;
  readonly allParticipantsDetails?: ParticipantDto[];
  readonly participantByPhoneNumber?: ParticipantDto;
  readonly errorMessage?: string;
  readonly currentUser?: ParticipantDto;
  readonly contactProfile?: ContactProfileDto;
  readonly updateAboutMe?: UpdateAboutMeDto;
  readonly updateUsername?: UpdateUsernameDto;
  readonly downloaded?: string;
  readonly chatBackground?: any;
  readonly updatedStatus?: ParticipantDto;
  readonly newAvatar?: ParticipantDto;
}

export const INITIAL_STATE: IParticipantStateContext = {};

export interface IParticipantActionsContext {
  login?: (payload: LoginDto) => void;
  createParticipant?: (payload: any) => void;
  getAllParticipants?: () => void;
  getByPhoneNumber?: (phoneNumber: string) => void;
  setCurrentUser?: (payload: ParticipantDto) => void;
  setContactProfile?: (payload: ContactProfileDto) => void;
  setUpdateAboutMe?: (phoneNumber: string, payload: UpdateAboutMeDto) => void;
  setUpdateUsername?: (phoneNumber: string, payload: UpdateUsernameDto) => void;
  download?: (phoneNumber: string) => void;
  searchByNameOrNumber?: (term: string) => void;
  changeBackground?: (phoneNumber: string, payload: any) => void;
  updateStatus?: (phoneNumber: string, payload: StatusDto) => void;
  updateAvatar?: (phoneNumber: string, payload: any) => void;
}

const ParticipantContext =
  createContext<IParticipantStateContext>(INITIAL_STATE);

const ParticipantActionsContext = createContext<IParticipantActionsContext>({});

export { ParticipantContext, ParticipantActionsContext };

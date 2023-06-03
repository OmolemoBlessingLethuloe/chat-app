import { ParticipantsActionEnums } from "./action";
import { IParticipantStateContext } from './context';

export function ParticipantReducer(incomingState: IParticipantStateContext, action: ReduxActions.Action<IParticipantStateContext>): IParticipantStateContext{
    const { type, payload } = action;

    switch (type) {
        case ParticipantsActionEnums.createParticipantRequest:
        case ParticipantsActionEnums.getParticipantsRequest:
        case ParticipantsActionEnums.getByPhoneNumberRequest:
        case ParticipantsActionEnums.loginRequest:
        case ParticipantsActionEnums.errorRequest:
        case ParticipantsActionEnums.setCurrentUserRequest:
        case ParticipantsActionEnums.setContactProfileRequest:
        case ParticipantsActionEnums.updateAboutMeRequest:
        case ParticipantsActionEnums.updateUsernameRequest:
        case ParticipantsActionEnums.downloadRequest:
        case ParticipantsActionEnums.searchByNameOrNumberRequest:
        case ParticipantsActionEnums.changeBackgroundRequest:
        case ParticipantsActionEnums.updateAvatarRequest:
            return {...incomingState,... payload };
        default:
            return incomingState;
    }
}
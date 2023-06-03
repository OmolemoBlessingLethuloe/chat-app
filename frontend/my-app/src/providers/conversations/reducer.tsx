import { ConversationsActionEnums } from './action';
import { IConversationStateContext } from './context';

export function ConversationReducer(incomingState: IConversationStateContext, action: ReduxActions.Action<IConversationStateContext>): IConversationStateContext{
    const { type, payload } = action;

    switch (type) {
        case ConversationsActionEnums.getConversationsRequest:
        case ConversationsActionEnums.createConversationRequest:
        case ConversationsActionEnums.errorRequest:
        case ConversationsActionEnums.getSelectedConversationRequest:
        case ConversationsActionEnums.setGroupProfileRequest:
        case ConversationsActionEnums.setUpdateGroupAboutRequest:
        case ConversationsActionEnums.deleteConversationRequest:
        case ConversationsActionEnums.searchByNameRequest:
        case ConversationsActionEnums.archiveConversationRequest:
            return {...incomingState, ...payload}
        case ConversationsActionEnums.setIsArchivedRequest:
            debugger;
            return {...incomingState, ...payload}
        default:
            return incomingState;
    }
}
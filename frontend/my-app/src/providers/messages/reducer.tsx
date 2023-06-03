import { MessagesActionEnum } from "./action";
import { IMessageStateContext } from './context';

export function MessageReducer(incomingState: IMessageStateContext, action: ReduxActions.Action<IMessageStateContext>): IMessageStateContext{
    const { type, payload } = action;

    switch (type) {
        case MessagesActionEnum.createMessageRequest:
            const {mediaPath,participantId,text,id}=payload?.MessageDetails;
            return {...incomingState,AllMessages:
                incomingState?.AllMessages
                .map(
                    msg=>{
                       if (msg.conversationId===payload.MessageDetails?.conversationId){
                           
                           return {...msg,messages:[...msg?.messages,{
                            messageId:id,
                            participantId,
                            senderName:'',
                            text,
                            mediaPath,
                            recipients:[],
                            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                           }]}
                       }
                       return msg
    }) ,...payload};
        case MessagesActionEnum.getAllMessagesRequest:
        case MessagesActionEnum.errorRequest:
        case MessagesActionEnum.getSelectedConversationRequest:
            // debugger;
            return {...incomingState,... payload };
        default:
            return incomingState;
    }
}
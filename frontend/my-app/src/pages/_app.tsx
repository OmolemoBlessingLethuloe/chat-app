import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ParticipantProvider } from '../providers/participants'
import { ConversationProvider } from '../providers/conversations'
import { MessageProvider } from '../providers/messages'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ParticipantProvider>
      <ConversationProvider>
          <MessageProvider>
              <Component {...pageProps} />
          </MessageProvider>
      </ConversationProvider>
    </ParticipantProvider>
  )
}

export default MyApp

import { MutableRefObject, useCallback, useEffect, useRef } from 'react'

type ChannelConstructor = {
  channelName: keyof typeof channelNames
  handleMessage?: (event: MessageEvent) => void
  handleMessageError?: (event: MessageEvent) => void
}

const channelNames = {
  basket: 'basket-broadcast-channel',
  session: 'session-broadcast-channel',
  auth: 'auth-broadcast-channel',
}

/**
 * React hook to create and manage a Broadcast Channel across multiple browser windows.
 *
 * @param channelName Static name of channel used across the browser windows.
 * @param handleMessage Callback to handle the event generated when `message` is received.
 * @param handleMessageError [optional] Callback to handle the event generated when `error` is received.
 * @returns A function to send/post message on the channel and channelRef itself.
 * @example
 * ```tsx
 * import useBroadcastChannel from '@apps-qcommerce/core/hook/useBroadcastChannel';
 *
 * function App () {
 *   const {channelRef, broadcastMessage} = useBroadcastChannel('userId', (event) => alert(event.data));
 *   return ( <button onClick={() => broadcastMessage('ABC123')}> Send UserId </button> );
 * }
 * ```
 * ---
 * Works in browser that support Broadcast Channel API natively. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API#browser_compatibility).
 */

/** Hook to subscribe/unsubscribe from channel events. */
const useChannelEventListener = function <K extends keyof BroadcastChannelEventMap>(
  channelRef: MutableRefObject<BroadcastChannel | null>,
  event: K,
  handler?: (event: BroadcastChannelEventMap[K]) => void,
): void {
  useEffect(() => {
    const channel = channelRef.current
    if (channel && handler) {
      channel.addEventListener(event, handler)
      return () => channel.removeEventListener(event, handler)
    }
  }, [channelRef, event, handler])
}

const useBroadcastChannel = function <T>({ channelName, handleMessage, handleMessageError }: ChannelConstructor): {
  channelRef: MutableRefObject<BroadcastChannel | null>
  broadcastMessage: (data: T) => void
} {
  const channelRef = useRef(
    typeof window !== 'undefined' && 'BroadcastChannel' in window
      ? new BroadcastChannel(channelNames[channelName])
      : null,
  )

  useChannelEventListener(channelRef, 'message', handleMessage)
  useChannelEventListener(channelRef, 'messageerror', handleMessageError)

  const broadcastMessage = useCallback(
    (data: T) => {
      channelRef?.current?.postMessage(data)
    },
    [channelRef],
  )
  return { channelRef, broadcastMessage }
}

export { channelNames, useBroadcastChannel }

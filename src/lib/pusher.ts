import PusherServer from 'pusher'
import Pusher from 'pusher-js'

Pusher.logToConsole = true

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_APP_SECRET!,
  cluster: process.env.PUSHER_APP_CLUSTER!,
})


export const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY || "", {
    cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER as string,
  });
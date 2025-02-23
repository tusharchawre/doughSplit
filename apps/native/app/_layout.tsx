import { Stack } from "expo-router";

import "@/global.css"
import { SessionProvider } from "@/context/ctx";

export default function RootLayout() {
  return (
    <SessionProvider>
    <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown: false}} />
    </Stack>
    </SessionProvider>
  )
}

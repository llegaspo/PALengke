import { Stack } from 'expo-router';

export default function RootLayout(){
  return(
  <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4D0045', // Changed to purple
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: () => null, // Remove back button
      }}>
    </Stack>
  )
}

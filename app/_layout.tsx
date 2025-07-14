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
      }}>
      <Stack.Screen 
        name='index' 
        options={{
          title: 'palengke' // Changed from default 'index'
        }}
      />
      <Stack.Screen 
        name='language/index' 
        options={{
          title: 'palengke'
        }}
      />
      <Stack.Screen 
        name='onboarding/index' 
        options={{
          title: 'palengke'
        }}
      />
      <Stack.Screen 
        name='existing-storeoptions/index' 
        options={{
          title: 'palengke'
        }}
      />
      <Stack.Screen 
        name='existing-inventory/index' 
        options={{
          title: 'palengke'
        }}
      />
    </Stack>
  )
}
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
      <Stack.Screen
        name='index'
        options={{
          title: 'palengke',
          headerShown: true,
          headerLeft: () => null
        }}
      />
      <Stack.Screen
        name='main/index'
        options={{
          title: 'palengke',
          headerShown: true,
          headerLeft: () => null
        }}
      />
      <Stack.Screen
        name='language/index'
        options={{
          title: 'palengke',
          headerShown: true,
          headerLeft: () => null
        }}
      />
      <Stack.Screen
        name='onboarding/index'
        options={{
          title: 'palengke',
          headerShown: true,
          headerLeft: () => null
        }}
      />
      <Stack.Screen
        name='existing-storeoptions/index'
        options={{
          title: 'palengke',
          headerShown: true,
          headerLeft: () => null
        }}
      />
      <Stack.Screen
        name='existing-inventory/index'
        options={{
          title: 'palengke',
          headerShown: true,
          headerLeft: () => null
        }}
      />
      <Stack.Screen
        name='home/index'
        options={{
          title: 'palengke',
          headerShown: true,
          headerLeft: () => null
        }}
      />
      <Stack.Screen
        name='shop/index'
        options={{
          title: 'palengke',
          headerShown: true,
          headerLeft: () => null
        }}
      />
      <Stack.Screen
        name='chat/index'
        options={{
          title: 'palengke',
          headerShown: true,
          headerLeft: () => null
        }}
      />
      <Stack.Screen
        name='wallet/index'
        options={{
          title: 'palengke',
          headerShown: true,
          headerLeft: () => null
        }}
      />
      <Stack.Screen
        name='share/index'
        options={{
          title: 'palengke',
          headerShown: true,
          headerLeft: () => null
        }}
      />
    </Stack>
  )
}

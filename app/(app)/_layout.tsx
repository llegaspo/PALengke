import { Stack } from 'expo-router';

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#4D0045' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerLeft: () => null, // Disable back button
      }}
    >
      <Stack.Screen name="home/index" options={{ title: 'Home' }} />
      <Stack.Screen name="chat/index" options={{ title: 'Chat' }} />
      <Stack.Screen name="shop/index" options={{ title: 'Shop' }} />
      <Stack.Screen name="wallet/index" options={{ title: 'Wallet' }} />
      <Stack.Screen name="share/index" options={{ title: 'Share' }} />
      <Stack.Screen name="resources/index" options={{ title: 'Resources' }} />
    </Stack>
  );
}


import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#4D0045' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Palengke' }} />
      <Stack.Screen name="language/index" options={{ title: 'Language' }} />
      <Stack.Screen name="onboarding/index" options={{ title: 'Onboarding' }} />
      <Stack.Screen name="existing-storeoptions/index" options={{ title: 'Store Options' }} />
      <Stack.Screen name="existing-inventory/index" options={{ title: 'Inventory' }} />
      <Stack.Screen name="main/index" options={{ title: 'Main' }} />
    </Stack>
  );
}


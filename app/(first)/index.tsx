
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function FirstIndex() {
  useEffect(() => {
    // Redirect to language selection
    router.replace('/(first)/language');
  }, []);

  return null;
}


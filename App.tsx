import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { doc, onSnapshot } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { Ripples } from './src/Ripples';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrpSsdSIMvQZ4JbZiBWQjqKI843JEm59Y",
  authDomain: "detox-hang-repro.firebaseapp.com",
  projectId: "detox-hang-repro",
  storageBucket: "detox-hang-repro.appspot.com",
  messagingSenderId: "655777952191",
  appId: "1:655777952191:web:b0e5efed1b9f17eb99f10a"
};

const firebase_app = initializeApp(firebaseConfig);
const firestore = initializeFirestore(firebase_app, { experimentalForceLongPolling: true });

export default function App() {
  const [message, setMessage] = useState<string>("default message");

  /* useEffect(() => {
   *   const messageRef = doc(firestore, 'Message', 'hello');
   *   const unsubscribe = onSnapshot(messageRef, (snapshot) => {
   *     const m = snapshot.get('message');
   *     if (m) {
   *       setMessage(m);
   *     }
   *   });
   *   return () => unsubscribe();
   * }, []); */
  useEffect(() => {
    setTimeout(() => {
      setMessage('Hello Detox');
    }, 5000);
  })
  return (

    <View style={styles.container} testID='homeView'>
      <Text>A simple app for detox repro: </Text>
      <Text testID="Message">{message}</Text>
      <Ripples
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 1,
          elevation: 1,
          alignSelf: 'center',
        }}
        width={120}
        height={120}
        num={2}
        cycle={5000}
        maxRadius={60}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

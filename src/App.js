import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { useAuthState } 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDV8EIxZT83Bi_jtCDXEc9MOpBZWvfwrQw",
  authDomain: "live-chat-1ba24.firebaseapp.com",
  projectId: "live-chat-1ba24",
  storageBucket: "live-chat-1ba24.appspot.com",
  messagingSenderId: "118764391609",
  appId: "1:118764391609:web:675939bb3f4f4806b99f68",
  measurementId: "G-J5KNPBT0XP"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

function App() {
  return (
    <div className="App">
      <header className="App-header">

      </header>
    </div>
  );
}

export default App;

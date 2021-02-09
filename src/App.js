import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { useAuthState } 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function App() {
  return (
    <div className="App">
      <header className="App-header">

      </header>
    </div>
  );
}

export default App;

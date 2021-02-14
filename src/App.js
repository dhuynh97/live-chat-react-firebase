import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';
import GoogleButton from 'react-google-button';

import { useAuthState } from 'react-firebase-hooks/auth';
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

//Initialize Firebase App only if it has not already been initialized.
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
firebase.analytics();

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>Daniel's Hangout 💬</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <GoogleButton className="sign-in" onClick={signInWithGoogle}>Sign in with Google</GoogleButton>
      <p className="button-text">Hey there, glad to see you here.</p>
      <p className="button-text">Sign in and come drop a message!</p>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (

     <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>

  )
}

function ChatRoom() {

  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(1000);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL, email} = auth.currentUser;


    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      email
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Message..." />

      <button type="submit" disabled={!formValue}>Send</button>

    </form>
  </>)
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  
  const name = auth.currentUser.displayName;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  const messageUserClass = uid === auth.currentUser.uid ? 'sentUser' : 'receivedUser';

  return (<>
    <div className={`userName ${messageUserClass}`}> <usernameText>{name}</usernameText> </div>
    <div className={`message ${messageClass}`}>
      
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt="" />
      <p>{text}</p>

    </div>
  </>)
}

    export default App;

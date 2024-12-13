import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { auth } from './firebase/services';
import './App.css';
import Login from './components/Login';
import Feed from './components/Feed';
import Shareposts from './components/Shareposts';
import CreatePost from './components/CreatePost';
import Profile from './components/Profile';
import Editprofile from './components/Editprofile';
import PostImage from './components/PostImage';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/shareposts" element={<Shareposts />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/editprofile" element={<Editprofile />} />
          <Route path="/postimage" element={<PostImage />} />
        </Routes>
      )}
    </div>
  );
}

export default App;

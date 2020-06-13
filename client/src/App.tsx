import React, { useState, useEffect } from 'react';

import Home from './views/home';
import { setAccessToken } from './accessToken';

interface AppProps {
  isLoggedIn: boolean;
}

const App: React.FC<AppProps> = ({ isLoggedIn }) => {
  const [loading, setLoading] = useState(true);
  // attempt to regularly refresh the token so they dont get kicked out
  useEffect(() => {
    fetch('http://localhost:4000/refresh_token', {
      method: 'POST',
      credentials: 'include',
    }).then(async (data) => {
      const { accessToken } = await data.json();
      setAccessToken(accessToken);
      console.log('parsed:', accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>loading...</div>;
  return <Home />;
};

export default App;

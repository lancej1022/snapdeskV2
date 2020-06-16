import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { useLogoutMutation } from '../../generated/apolloComponents';
import { setAccessToken } from '../../lib/accessToken';

const SideBarContainer = styled.section`
  background-color: ${({ theme }) => theme.colorDark};
  padding: 2rem;
  color: white;

  h2 {
    color: ${({ theme }) => theme.colorLight};
    font-size: 3.5rem;
  }
`;

const SideBar: React.FC = () => {
  const [logout, { client }] = useLogoutMutation();
  const router = useRouter();

  // clears our refresh token
  const handleLogout = async () => {
    await logout();
    setAccessToken('');
    // because the client can theoretically be undefined, we tell TS to assume its g2g
    await client!.resetStore();
    router.push('/');
  };

  return (
    <SideBarContainer>
      <h2>SnapDesk</h2>
      {/* Show some profile stuff here */}
      <button onClick={handleLogout}>logout</button>
    </SideBarContainer>
  );
};

export default SideBar;

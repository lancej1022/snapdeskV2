import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { useLogoutMutation } from '../../generated/apolloComponents';
import { setAccessToken } from '../../lib/accessToken';
import Button from '../button';

const SideBarContainer = styled.section`
  background-color: ${({ theme }) => theme.colorDark};
  padding: 2rem;
  color: white;
  text-align: center;

  h2,
  h3 {
    color: ${({ theme }) => theme.colorLight};
    font-size: 3.5rem;
  }
`;

const RankingContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;

  p {
    color: ${({ theme }) => theme.textWhite};
  }
`;

const SideBar: React.FC = () => {
  const [logout, { client }] = useLogoutMutation();
  const router = useRouter();

  // clears our  token
  const handleLogout = async () => {
    await logout();
    // because the client can theoretically be undefined, we tell TS to assume its g2g
    await client!.resetStore();
    // this should work but if we start seeing graphql errors then its probably executing on the server side
    // and so we should use our 'redirect' util in order to redirect -- redirect(ctx, '/')
    router.push('/');
    setAccessToken('');
  };

  return (
    <SideBarContainer>
      <h2>SnapDesk</h2>
      {/* Show some profile stuff here */}
      <Button onClick={handleLogout}>logout</Button>
      <h3>Active Tickets</h3>
      <h4>12</h4>
      <h3>LeaderBoard</h3>
      <RankingContainer>
        <p>Ranking</p>
        <p>Mentor Name</p>
        <p>Snaps Earned</p>
      </RankingContainer>
    </SideBarContainer>
  );
};

export default SideBar;

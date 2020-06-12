import React from 'react';
import styled from 'styled-components';
import { useLogoutMutation } from '../../generated/graphql';
import { setAccessToken } from '../../accessToken';
import { RouteComponentProps, withRouter } from 'react-router';

const SideBarContainer = styled.section`
  background-color: ${({ theme }) => theme.colorDark};
  padding: 2rem;
  color: white;

  h2 {
    color: ${({ theme }) => theme.colorLight};
    font-size: 3.5rem;
  }
`;

const SideBar: React.FC<RouteComponentProps> = ({ history }) => {
  const [logout, { client }] = useLogoutMutation();

  // clears our refresh token
  const handleLogout = async () => {
    await logout();
    setAccessToken('');
    // because the client can theoretically be undefined, we tell TS to assume its g2g
    await client!.resetStore();
    history.push('/');
  };

  return (
    <SideBarContainer>
      <h2>SnapDesk</h2>
      {/* Show some profile stuff here */}
      <button onClick={handleLogout}>logout</button>
    </SideBarContainer>
  );
};

export default withRouter(SideBar);

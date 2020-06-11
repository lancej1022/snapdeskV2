import React from 'react';
import styled from 'styled-components';

const SideBarContainer = styled.section`
  background-color: ${({ theme }) => theme.colorDark};
  padding: 2rem;
  color: white;

  h2 {
    color: ${({ theme }) => theme.colorLight};
    font-size: 3.5rem;
  }
`;

const SideBar = () => {
  return (
    <SideBarContainer>
      <h2>SnapDesk</h2>
      {/* Show some profile stuff here */}
    </SideBarContainer>
  );
};

export default SideBar;

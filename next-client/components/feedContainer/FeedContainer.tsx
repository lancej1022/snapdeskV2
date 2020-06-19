import React, { useState } from 'react';
import styled from 'styled-components';

import TicketCreator from '../ticketCreator';
import Ticket from '../ticket';

const Feed = styled.section`
  height: 100%;
  padding: 2rem 3rem;
`;

const FeedGrid = styled.div`
  display: grid;
`;

const FeedContainer = () => {
  const hardCoded = [
    {
      user: 'Dan Abramov',
      message: 'Redux is dead',
      topic: 'React',
      snaps: 2,
    },
    {
      user: 'me',
      message: 'how to center div',
      topic: 'CSS',
      snaps: 5,
    },
    {
      user: 'Kent Dodds',
      message: 'testing is da best',
      topic: 'Javascript',
      snaps: 3,
    },
  ];

  const tickets = hardCoded.map((item) => {
    return (
      <Ticket
        user={item.user}
        message={item.message}
        topic={item.topic}
        snaps={item.snaps}
      />
    );
  });

  return (
    <Feed>
      <FeedGrid>{tickets}</FeedGrid>
      <TicketCreator />
    </Feed>
  );
};

export default FeedContainer;

import React, { useState, SyntheticEvent } from 'react';
import styled from 'styled-components';

import Snap from '../snap';
import SvgButton from '../svgButton';

/**
 * Styled Components
 */
const Container = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: ${({ theme }) => theme.lightBg};
  border: 1px solid #dfe1e5;
  border-radius: 0.5rem;

  hr {
    margin: 1rem 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const TextArea = styled.textarea`
  height: 10rem;
  width: 100%;
  padding: 0 0.5rem;
  margin-bottom: 1rem;
  font-size: 1.6rem;
  line-height: 1.5;
  background-color: #fff;
  border: 1px solid #dfe1e5;
  border-radius: 0.5rem;
  overflow: auto;
  resize: none;
`;

const SnapsTopics = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;

    .snap-rating {
      stroke-width: 0.4rem;
    }

    .fill {
      fill: ${({ theme }) => theme.colorPrimary};
      stroke: ${({ theme }) => theme.colorPrimary};
    }

    .empty {
      fill: #f8f9fa;
      stroke: ${({ theme }) => theme.colorPrimary};
    }
  }
`;

const Select = styled.select`
  background-color: #fff;
  width: auto;
  height: 3rem;
  border: 1px solid #dfe1e5;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  height: 4rem;
`;

/**
 * React Component
 */
const TicketCreator = () => {
  const [message, setMessage] = useState('');
  const [snaps, setSnaps] = useState(1);
  const [topic, setTopic] = useState('');

  const handleChange = ({ target }: any) => {
    console.log(target.name);
    if (target.name === 'topic') setTopic(target.value);
    if (target.name === 'message') setMessage(target.value);
    if (target.name === 'snap') console.log('lol');
  };

  const snapButtons = [];
  for (let i = 1; i <= 5; i += 1) {
    let idStyle = 'empty';
    if (i <= snaps) idStyle = 'fill';
    snapButtons.push(
      <Snap key={'snap' + i} index={i} idStyle={idStyle} updateRating={setSnaps} />
    );
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log({ message, topic, snaps });
    // handle validation
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextArea
          required
          name="message"
          placeholder="What do you need help with?"
          onChange={handleChange}
        />
        <SnapsTopics>
          <div>{snapButtons}</div>
          <Select name="topic" required onChange={handleChange}>
            <option value="select" disabled>
              Select topic...
            </option>
            <option value="Javascript">Javascript</option>
            <option value="React">React</option>
            <option value="CSS">CSS</option>
            <option value="GIT/Github">GIT/Github</option>
            <option value="Server">Server Side</option>
            <option value="Databases">Databases</option>
            <option value="API">API</option>
            <option value="MicroServices">MicroServices</option>
            <option value="Other">Other</option>
          </Select>
        </SnapsTopics>
        <hr />
        <SvgButton>
          <button type="submit">
            <svg
              id="i-send"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              width="20"
              height="20"
              fill="none"
              stroke="currentcolor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M2 16 L30 2 16 30 12 20 Z M30 2 L12 20" />
            </svg>
            <span>Post</span>
          </button>
        </SvgButton>
      </form>
    </Container>
  );
};

export default TicketCreator;

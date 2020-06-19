import React from 'react';
import styled from 'styled-components';
import PlainSnap from '../snap/PlainSnap';
import SvgButton from '../svgButton';

const TicketWrapper = styled.article`
  width: 70%;
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #dfe1e5;
  border-radius: 1rem;

  hr {
    margin: 1rem 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  p {
    margin: 0;
  }
`;

const ReqInfo = styled.div`
  background-color: ${({ theme }) => theme.lightBg};
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 1rem;

  span {
    font-size: 1.4rem;
    color: #212529;
  }
`;

const SnapTopic = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0;

  div {
    display: flex;
  }

  p {
    color: ${({ theme }) => theme.textWhite};
    background: ${({ theme }) => theme.colorPrimary};
    padding: 0 1rem;
    line-height: 2;

    border-radius: 0.5rem;
  }

  svg {
    vertical-align: middle;
  }
`;

interface Props {
  user: string;
  message: string;
  topic: string;
  snaps: number;
}

const Ticket: React.FC<Props> = ({ user, message, topic, snaps }) => {
  const snapIcons = [];
  for (let i = 1; i <= snaps; i += 1) {
    snapIcons.push(<PlainSnap styleName="fill" />);
  }

  return (
    <TicketWrapper>
      <ReqInfo>
        <span>request from {user}</span>
        <p>{message}</p>
      </ReqInfo>
      <SnapTopic>
        <div>{snapIcons}</div>
        {/* <PlainSnap styleName="fill" /> */}
        <p>{topic}</p>
      </SnapTopic>
      <hr />
      <SvgButton>
        <button
          // onClick={() => deleteTicket(messageId)}
          type="button"
        >
          <svg
            id="i-trash"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="20"
            height="20"
            fill="none"
            stroke="currentcolor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path d="M28 6 L6 6 8 30 24 30 26 6 4 6 M16 12 L16 24 M21 12 L20 24 M11 12 L12 24 M12 6 L13 2 19 2 20 6" />
          </svg>
          <span>Delete</span>
        </button>
      </SvgButton>
    </TicketWrapper>
  );
};

export default Ticket;

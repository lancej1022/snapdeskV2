import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    cursor: pointer;
    font-size: 1.6rem;
    text-align: center;
    vertical-align: middle;
    background: transparent;
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;

    transition: all 0.5s;

    svg {
      vertical-align: middle;
    }

    span {
      padding-left: 0.5rem;
    }

    &:hover {
      border-color: ${({ theme }) => theme.colorPrimary};
      transform: translateY(-0.3rem);

      svg {
        stroke: ${({ theme }) => theme.colorPrimary};
      }

      span {
        color: ${({ theme }) => theme.colorPrimary};
      }
    }
  }
`;

export default ButtonContainer;

import styled from 'styled-components';

interface Buttonprops {
  readonly logoUrl?: string;
  readonly buttonColor?: any;
  readonly textColor?: any;
  readonly border?: string;
}

const Button = styled.button<Buttonprops>`
  padding: 1rem;
  margin: 1rem 0;
  width: 100%;
  background: ${({ buttonColor }) => (buttonColor ? buttonColor : 'fff')};
  color: ${({ textColor }) => (textColor ? textColor : 'fff')};
  font-size: 1.6rem;
  border: ${({ border }) => (border !== 'false' ? '1px solid #d0d0d3' : '')};

  div {
    display: inline-block;
    padding-left: 3rem;
    background-image: ${({ logoUrl }) => `url(${logoUrl})`};
    background-repeat: no-repeat;
    background-position: left center;
    background-size: contain;
  }
`;

export default Button;

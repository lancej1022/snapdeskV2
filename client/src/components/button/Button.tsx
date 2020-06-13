import styled from 'styled-components';

interface Buttonprops {
  readonly logoUrl?: string;
  readonly buttonColor?: any;
  readonly textColor?: any;
  readonly border?: string;
}

const Button = styled.button<Buttonprops>`
  cursor: pointer;
  padding: 1rem;
  margin: 1rem 0;
  width: 100%;
  /* accepts a custom background as a prop, otherwise it defaults to a white background */
  background: ${({ buttonColor }) => (buttonColor ? buttonColor : '#fff')};
  /* accepts a custom text color, otherwise defaults to deep black */
  color: ${({ textColor }) => (textColor ? textColor : '#000000')};
  font-size: 1.6rem;
  /* has default border unlesss otherwise specified */
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

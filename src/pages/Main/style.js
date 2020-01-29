import styled, {css, keyframes} from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`

const rotate = keyframes`
  from{
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const SubmitButton = styled.button.attrs(props =>({
  type: 'submit',
  disable: props.loading,
}))`
  background: #F14F16;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  &[disable] {
    cursor: not-allowed;
    opacity: 0.6;
  }
  ${props => props.loading && css`
    svg {
      animation: ${rotate} 2s linear infinite;
    }
  `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 2px solid #eee;
    }

    a {
    color: #F14F16;
    text-decoration: none;
    }
  }




`;

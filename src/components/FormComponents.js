
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: ${(props) => props.alignSelf || 'initial'};
  padding: 0px 25px;
  min-height: 100vh;
`;

const Form = styled.form`
  width: 380px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;

  margin-bottom: 32px;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const Input = styled.input`
  all: unset;
  box-sizing: border-box;
  font-family: 'Lexend Deca', sans-serif;

  width: 100%;

  color: #000;
  background: #FFFFFF;
  padding: 21px;
  border: 1px solid rgba(120, 177, 89, 0.25);
  border-radius: 12px;
  box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);

  ::placeholder {
    color: #9C9C9C;
    font-family: 'Lexend Deca', sans-serif;
  }
`;

const Button = styled.button`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;

  width: 100%;

  font-style: normal;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  
  color: #FFFFFF;
  
  text-align: center;

  padding: 21px;
  
  background: #5D9040;
  border-radius: 12px;

  max-width: ${(props) => props.maxWidth || 'initial'};
`;

const StyledLink = styled(Link)`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;

  color: #FFF;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
`;

export {
  Container,
  Form,
  Input,
  Button,
  StyledLink
};

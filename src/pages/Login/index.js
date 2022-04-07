import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Container, Form, Input, StyledLink } from '../../components/FormComponents';
import useAuth from '../../hooks/useAuth';
import api from '../../services/api';


function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { login } = useAuth();
  const navigation = useNavigate();

  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const user = { ...formData };

    try {
      const { data } = await api.login(user);
      login(data);
      navigation('/');
    } catch (error) {
      console.log(error);
      alert("Email ou senha incorretos");
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="E-mail"
          type="email"
          onChange={(e) => handleChange(e)}
          name="email"
          value={formData.email}
          required
        />
        <Input
          placeholder="Senha"
          type="password"
          onChange={(e) => handleChange(e)}
          name="password"
          value={formData.password}
          required
        />
        <Button type="submit">Entrar</Button>
      </Form>
      <StyledLink to="/sign-up">Primeira vez? Cadastre-se!</StyledLink>
    </Container>
  );
}

export default Login;
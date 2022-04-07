import React, { useEffect, useState } from 'react';
import { ReactComponent as DeleteIcon } from '../../assets/DeleteIcon.svg';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { Button, Input } from '../../components/FormComponents';
import useAuth from '../../hooks/useAuth';
import api from '../../services/api';
import { Container, DeleteButton, Flex, Span, StyledLink, Title, Url, UrlLink } from './style';

function Home() {
  const [user, setUser] = useState(null);
  const [reload, setReload] = useState(true);
  const { auth } = useAuth();
  const [link, setLink] = useState('');

  async function handleShortenButtonClick() {
    if (!auth) {
      alert("Apenas usuarios logados podem encurtar links!");
      return;
    }

    try {
      await api.shortenLink(auth, link);
      setReload(true);
    } catch (error) {
      console.log(error);
      alert("Erro, recarregue a página em alguns segundos");
    }
  }

  useEffect(() => {
    if (!reload) return;

    async function loadPage() {
      setReload(false);
      if (!auth) {
        return;
      }
  
      try {
        const { data } = await api.getUser(auth);
        console.log(data);
        setUser(data);
      } catch (error) {
        console.log(error);
        alert("Erro, recarregue a página em alguns segundos");
        setUser({});
      }
    }

    loadPage();
  }, [auth, reload])

  if (auth && !user) {
    return <h2>Carregando...</h2>
  }

  return (
    <Container padding="60px 70px 0px 70px">
      <Flex 
        direction="row" 
        justifyContent="space-between" 
        alignItems="center" 
        alignSelf="flex-end"
        gap="22px"
      >
        <StyledLink to="/login" active="true">Entrar</StyledLink>
        <StyledLink to="/sign-up">Cadastrar-se</StyledLink>
      </Flex>
      <Title>
        Shortly
        <Logo/>
      </Title>
      <Flex direction="column" alignItems="center" width="1018px">
        <Flex justifyContent="space-between" width="100%" gap="70px">
          <Input value={link} onChange={e => setLink(e.target.value)} placeholder='Links que cabem no bolso' />  
          <Button onClick={handleShortenButtonClick} maxWidth="182px">Encurtar Link</Button>
        </Flex>
        {user && <Urls token={auth} urls={user.shortenedUrls} />}
      </Flex>
    </Container>
  );
}

function Urls({ token, urls }) {
  async function handleDelete(id) {
    try {
      await api.deleteLink(token, id)
    } catch (error) {
      console.log(error);
      alert("Erro, recarregue a página em alguns segundos");
    }
  }

  return (
    <Flex width="100%" margin="58px 0px 0px 0px" direction="column" gap="40px">
      {urls.map(url => (
        <Url key={url.id}>
          <Flex justifyContent="space-between" alignItems="center" gap="75px">
            <UrlLink color="#FFF" fontWeight="400">{url.url}</UrlLink>
            <UrlLink color="#FFF" fontWeight="400">{url.shortUrl}</UrlLink>
            <Span color="#FFF" fontWeight="400">Quantidade de visitantes: {url.visitCount}</Span>
          </Flex>
          <DeleteButton onClick={() => handleDelete(url.id)}>
            <DeleteIcon />
          </DeleteButton>
        </Url>
      ))}
    </Flex>
  )
}

export default Home;
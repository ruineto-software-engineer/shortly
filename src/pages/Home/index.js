import React, { useEffect, useState } from 'react';
import { ReactComponent as DeleteIcon } from '../../assets/DeleteIcon.svg';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { Button, Input } from '../../components/FormComponents';
import useAuth from '../../hooks/useAuth';
import api from '../../services/api';
import TrophyIcon from "../../assets/TrophyIcon.svg";
import {
  Container,
  DeleteButton,
  Flex,
  Span,
  StyledLink,
  Logout,
  Title,
  Url,
  UrlLink,
  ContainerRanking,
  ContentRanking,
  TitleRanking,
  ContainerUsers
} from './style';

function Home() {
  const [user, setUser] = useState(null);
  const [reload, setReload] = useState(true);
  const [shortenUrls, setShortenUrls] = useState(null);
  const [ranking, setRanking] = useState(null);
  const [link, setLink] = useState('');
  const { auth } = useAuth();

  useEffect(() => {
    if (!reload) return;

    loadPage();

    // eslint-disable-next-line
  }, [auth, reload]);

  async function handleShortenButtonClick() {
    if (!auth) {
      alert("Apenas usuarios logados podem encurtar links!");
      return;
    }

    if (!link) {
      alert("O campo de link está vazio, preencha e tente novamente!");
      return;
    }

    try {
      await api.shortenLink(auth, link);

      setReload(true);
      setLink('');
    } catch (error) {
      console.log(error);
      alert("Erro, não foi possível enviar o link!");
    }
  }

  async function loadPage() {
    setReload(false);

    try {
      if (auth) {
        const promiseUser = await api.getUser(auth);
        const promiseShortenUrls = await api.shortenUrls(promiseUser.data.id);

        setUser(promiseUser.data);
        setShortenUrls(promiseShortenUrls.data);
      } else {
        const promiseAllUrls = await api.getAllUrls();

        setShortenUrls(promiseAllUrls.data);
      }

      const promiseRanking = await api.getRanking();

      setRanking(promiseRanking.data);
    } catch (error) {
      console.log(error);
      alert("Erro, recarregue a página e tente novamente!");
      setUser({});
    }
  }

  function handleLogout() {
    localStorage.removeItem('auth');
    window.location.reload(true);
  }

  if (auth && !user) {
    return <h2>Carregando...</h2>
  }

  return (
    <Container padding="60px 70px 0px 70px">
      <Flex>
        {!auth ?
          <>
            <StyledLink to="/login" active="true">Entrar</StyledLink>
            <StyledLink to="/sign-up">Cadastrar-se</StyledLink>
          </>
          :
          <Logout onClick={() => handleLogout()}>
            Sair
          </Logout>
        }
      </Flex>

      <Title>
        Shortly
        <Logo />
      </Title>

      <Flex direction="column" alignItems="center" width="1018px">
        <Flex justifyContent="space-between" width="100%" gap="70px">
          <Input value={link} onChange={e => setLink(e.target.value)} placeholder='Links que cabem no bolso' />
          <Button onClick={handleShortenButtonClick} maxWidth="182px">Encurtar Link</Button>
        </Flex>

        <Urls
          token={auth}
          urls={shortenUrls?.shortenedUrls ? shortenUrls?.shortenedUrls : shortenUrls}
          setReload={setReload}
          user={user}
        />
      </Flex>

      <ContainerRanking>
        <ContentRanking>
          <TitleRanking>
            <img alt='TrophyIcon.svg' src={TrophyIcon} />
            Ranking
          </TitleRanking>

          <ContainerUsers>
            {ranking?.map((user) => {
              return (
                <li key={user.id}>{`${user.name} - ${user.linksCount} ${user.linksCount > 1 ? "links" : "link"} - ${user.visitCount} ${user.visitCount > 1 ? "visualizações" : "visualização"}`}</li>
              );
            })}
          </ContainerUsers>
        </ContentRanking>
      </ContainerRanking>
    </Container>
  );
}

function Urls({ token, urls, setReload, user }) {
  async function handleDelete(id) {
    try {
      await api.deleteLink(token, id);

      setReload(true);
    } catch (error) {
      console.log(error);
      alert("Erro, não foi possível deletar o link!");
    }
  }

  async function handleUrl(shortUrl) {
    try {
      const promiseUrl = await api.getUrl(shortUrl);

      window.open(promiseUrl.data, '_blank');

      setReload(true);
    } catch (error) {
      console.log(error);
      alert("Erro, não foi possível redirecionar ao link original!");
    }
  }

  return (
    <Flex width="100%" margin="58px 0px 0px 0px" direction="column" gap="40px">
      {urls?.map(url => (
        <Url key={url.id}>
          <Flex justifyContent="space-between" alignItems="center" gap="75px">
            <UrlLink
              color="#FFF"
              fontWeight="400"
              onClick={() => window.open(url.url, '_blank')}
            >
              {url.url}
            </UrlLink>
            <UrlLink
              color="#FFF"
              fontWeight="400"
              cursor="pointer"
              onClick={() => handleUrl(url.shortUrl)}
            >
              {`https://www.shortly.com.br/${url.shortUrl}`}
            </UrlLink>
            <Span color="#FFF" fontWeight="400">Quantidade de visitantes: {url.visitCount}</Span>
          </Flex>

          {user &&
            <DeleteButton onClick={() => handleDelete(url.id)}>
              <DeleteIcon />
            </DeleteButton>
          }
        </Url>
      ))}
    </Flex>
  );
}

export default Home;
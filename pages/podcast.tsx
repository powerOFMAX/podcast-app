import styled from 'styled-components';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ReactNode } from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-fetch';
import Layout from '@components/Layout';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.id;
  const fetchClip = await fetch(`https://api.audioboom.com/audio_clips/${id}.mp3`)
    .then((response) => response.json())
    .catch((err) => console.error(err));

  const clip = fetchClip.body.audio_clip;

  return {
    props: {
      clip
    }
  };
};

const Podcast: InferGetServerSidePropsType<typeof getServerSideProps> = ({ clip }): ReactNode => {
  return (
    <Layout title={clip.title}>
      <Modal>
        <div className="clip">
          <Nav>
            <Link href={`/channel?id=${clip.channel.id}`}>
              <a className="close">&lt; Go Back</a>
            </Link>
          </Nav>

          <Picture>
            <div
              style={{
                backgroundImage: `url(${clip.urls.image || clip.channel.urls.logo_image.original})`
              }}
            />
          </Picture>

          <Player className="player">
            <h3>{clip.title}</h3>
            <h6>{clip.channel.title}</h6>
            <Audio controls autoPlay={true}>
              <track default kind="captions" src="" />
              <source src={clip.urls.high_mp3} type="audio/mpeg" />
            </Audio>
          </Player>
        </div>
      </Modal>
    </Layout>
  );
};

const Nav = styled.nav`
  background: none;
  a {
    display: inline-block;
    padding: 15px;
    color: white;
    cursor: pointer;
    text-decoration: none;
  }
`;

const Audio = styled.audio`
  margin-top: 2em;
  width: 100%;
`;

const Player = styled.div`
  padding: 30px;
  background: rgba(0, 0, 0, 0.3);
  text-align: center;
  h3 {
    margin: 0;
  }
  h6 {
    margin: 0;
    margin-top: 1em;
  }
`;

const Picture = styled.picture`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1;
  flex-direction: column;
  width: auto;
  padding: 10%;
  div {
    width: 100%;
    height: 100%;
    background-position: 50% 50%;
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  .clip {
    display: flex;
    height: 100%;
    flex-direction: column;
    background: #707070;
    color: white;
  }
`;

export default Podcast;

/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { ReactElement, ReactEventHandler } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

type SinglePodcast = {
  title: string;
  channel: {
    title: string;
    id: number;
    urls: {
      logo_image?: {
        original?: string;
      };
    };
  };
  urls: {
    image?: string;
    high_mp3: string;
  };
};

const PodcastPlayer = ({
  clip,
  onClose
}: {
  clip: SinglePodcast;
  onClose?: ReactEventHandler;
}): ReactElement => {
  return (
    <Modal>
      <div className="clip">
        <Nav>
          {onClose ? (
            <a onClick={onClose}>&lt; Go Back</a>
          ) : (
            <Link href={`/channel?id=${clip.channel.id}`}>
              <a className="close">&lt; Go Back</a>
            </Link>
          )}
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

export default PodcastPlayer;

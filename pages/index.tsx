import styled from 'styled-components';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ReactNode } from 'react';

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://api.audioboom.com/channels/recommended')
    .then((response) => response.json())
    .catch((err) => console.error(err));
  const { body: channels } = await res;

  return {
    props: {
      channels
    }
  };
};

export default function Home({
  channels
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactNode {
  return (
    <>
      <Header>Podcasts</Header>
      <Channels>
        {channels.map((channel) => (
          <Channel key={channel.id}>
            <img src={channel.urls.logo_image.original} alt="logo-original" />
            <h2>{channel.title}</h2>
          </Channel>
        ))}
      </Channels>
      <style jsx global>{`
        body {
          margin: 0;
          font-family: system-ui;
          background: white;
        }
      `}</style>
    </>
  );
}

const Header = styled.header`
  color: #fff;
  background: #707070;
  padding: 15px;
  text-align: center;
`;

const Channels = styled.div`
  display: grid;
  grid-gap: 15px;
  padding: 15px;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
`;
const Channel = styled.a`
  display: block;
  margin-bottom: 0.5em;
  color: #333;
  text-decoration: none;
  img {
    border-radius: 3px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
    width: 100%;
  }
  h2 {
    padding: 5px;
    font-size: 0.9em;
    font-weight: 600;
    margin: 0;
    text-align: center;
  }
`;

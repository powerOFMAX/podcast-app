import { ReactNode } from 'react';
import styled from 'styled-components';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import fetch from 'isomorphic-fetch';
import Layout from '@components/Layout';
import ChannelGrid from '@components/ChannelGrid';
import PodcastList from '@components/PodcastList';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const idChannel = query.id;
  const [reqChannel, reqSeries, reqAudios] = await Promise.all([
    fetch(`https://api.audioboom.com/channels/${idChannel}`).then((response) => response.json()),
    fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`).then((response) =>
      response.json()
    ),
    fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`).then((response) =>
      response.json()
    )
  ]).catch((err) => console.error(err));

  const channel = reqChannel.body.channel;
  const audioClips = reqAudios.body.audio_clips;
  const series = reqSeries.body.channels;

  return {
    props: {
      channel,
      audioClips,
      series
    }
  };
};

const ChannelComponent: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  channel,
  audioClips,
  series
}): ReactNode => {
  return (
    <Layout title={channel.title}>
      <Banner style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />
      <Title>{channel.title}</Title>

      {series.length > 0 && (
        <div>
          <H2>Series</H2>
          <ChannelGrid channels={series} />
        </div>
      )}

      <H2>Latest podcasts</H2>
      <PodcastList podcasts={audioClips} />
    </Layout>
  );
};

const H2 = styled.h2`
  padding: 5px;
  font-size: 0.9em;
  font-weight: 600;
  margin: 0;
  text-align: center;
`;

const Title = styled.h1`
  font-weight: 600;
  padding: 15px;
  text-align: center;
`;

const Banner = styled.div`
  width: 100%;
  padding-bottom: 25%;
  background-position: 50% 50%;
  background-size: cover;
  background-color: #aaa;
`;

export default ChannelComponent;

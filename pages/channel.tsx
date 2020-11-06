/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useState } from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';
import Layout from '@components/Layout';
import ChannelGrid from '@components/ChannelGrid';
import PodcastPlayer from '@components/PodcastPlayer';
import PodcastListWithClick from '@components/PodcastListWithClick';
import Error from './_error';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

export const getServerSideProps = async ({
  query,
  res
}: GetServerSidePropsContext): Promise<{ props: TChannel }> => {
  const idChannel = query.id;

  try {
    const [reqChannel, reqSeries, reqAudios] = await Promise.all([
      fetch(`https://api.audioboom.com/channels/${idChannel}`).then((response) => response.json()),
      fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`).then((response) =>
        response.json()
      ),
      fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`).then((response) =>
        response.json()
      )
    ]);

    if (reqChannel.status >= 400) {
      res.statusCode = reqChannel.status;
      return {
        props: {
          channel: null,
          audioClips: null,
          series: null,
          statusCode: reqChannel.status
        }
      };
    }

    const channel = reqChannel.body.channel;
    const audioClips = reqAudios.body.audio_clips;
    const series = reqSeries.body.channels;

    return {
      props: {
        channel,
        audioClips,
        series,
        statusCode: 200
      }
    };
  } catch (e) {
    return { props: { channel: null, audioClips: null, series: null, statusCode: 503 } };
  }
};

const ChannelComponent = ({
  channel,
  audioClips,
  series,
  statusCode
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement => {
  if (statusCode !== 200) {
    return <Error statusCode={statusCode} />;
  }

  const [podcast, setPodcast] = useState(null);

  const openPodcast = (event, podcast) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      (event.nativeEvent && event.nativeEvent.which === 2)
    ) {
      // If is doing Ctrl+Click or Cmd+Click we keep the user clicking
      return;
    }
    event.preventDefault();
    setPodcast(podcast);
  };

  const closePodcast = (event) => {
    event.preventDefault();
    setPodcast(null);
  };

  return (
    <Layout title={channel.title}>
      {podcast && <PodcastPlayer clip={podcast} onClose={(e) => closePodcast(e)} />}

      <Banner style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />
      <Title>{channel.title}</Title>

      {series.length > 0 && (
        <div>
          <H2>Series</H2>
          <ChannelGrid channels={series} />
        </div>
      )}

      <H2>Latest podcasts</H2>
      <PodcastListWithClick podcasts={audioClips} onClickPodcast={openPodcast} />
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

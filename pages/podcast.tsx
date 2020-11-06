import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { ReactNode } from 'react';
import fetch from 'isomorphic-fetch';
import Layout from '@components/Layout';
import PodcastPlayer from '@components/PodcastPlayer';
import Error from './_error';

export const getServerSideProps = async ({
  query
}: GetServerSidePropsContext): Promise<{
  props: { clip: SinglePodcast; statusCode: number | null };
}> => {
  const id = query.id;
  try {
    const fetchClip = await fetch(
      `https://api.audioboom.com/audio_clips/${id}.mp3`
    ).then((response) => response.json());

    const clip = fetchClip.body.audio_clip;

    return {
      props: {
        clip,
        statusCode: 200
      }
    };
  } catch (e) {
    return { props: { clip: null, statusCode: 503 } };
  }
};

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

export default function Podcast({
  clip,
  statusCode
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactNode {
  if (statusCode !== 200) {
    return <Error statusCode={statusCode} />;
  }

  return (
    <Layout title={clip.title}>
      <PodcastPlayer clip={clip} />
    </Layout>
  );
}

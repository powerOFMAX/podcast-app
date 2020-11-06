import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { ReactNode } from 'react';
import fetch from 'isomorphic-fetch';
import Layout from '@components/Layout';
import ChannelGrid from '@components/ChannelGrid';
import Error from './_error';

export const getServerSideProps = async ({ res }: GetServerSidePropsContext): Promise<unknown> => {
  try {
    const res = await fetch('https://api.audioboom.com/channels/recommended').then((response) =>
      response.json()
    );
    const { body: channels } = await res;
    return {
      props: {
        channels,
        statusCode: 200
      }
    };
  } catch (e) {
    res.statusCode = 503;
    return { channels: null, statusCode: 503 };
  }
};

export default function Home({
  channels,
  statusCode
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactNode {
  if (statusCode !== 200) {
    return <Error statusCode={statusCode} />;
  }

  return (
    <Layout title="Podcasts">
      <ChannelGrid channels={channels} />
    </Layout>
  );
}

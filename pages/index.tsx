import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ReactNode } from 'react';
import fetch from 'isomorphic-fetch';
import Layout from '@components/Layout';
import ChannelGrid from '@components/ChannelGrid';

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
    <Layout title="Podcasts">
      <ChannelGrid channels={channels} />
    </Layout>
  );
}

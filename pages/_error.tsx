import Layout from '@components/Layout';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';
import { ReactElement } from 'react';

type Status = {
  statusCode?: unknown;
};

export const getStaticProps = async ({
  res,
  params
}: GetServerSidePropsContext): Promise<{ props: Status }> => {
  const statusCode = res ? res.statusCode : params ? params.statusCode : null;
  return { props: { statusCode } };
};

export const Error = ({ statusCode }: Status): ReactElement => {
  return (
    <Layout title="Oh no :(">
      {statusCode === 404 ? (
        <div className="message">
          <h1>This page does not exists :(</h1>
          <p>
            <Link href="/">
              <a>Go back to the Home</a>
            </Link>
          </p>
        </div>
      ) : (
        <div className="message">
          <h1>Ooops! :(</h1>
          <p>Please try again in a few seconds</p>
        </div>
      )}
      <style jsx>{`
        .message {
          padding: 100px 30px;
          text-align: center;
        }
        h1 {
          margin-bottom: 2em;
        }
        a {
          color: #8756ca;
        }
      `}</style>
    </Layout>
  );
};

export default Error;

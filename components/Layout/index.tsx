import { ReactElement, ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Layout = ({ children, title }: { children: ReactNode; title: string }): ReactElement => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width" />
      </Head>

      <header>
        <Link href="/">
          <a>Podcasts</a>
        </Link>
      </header>

      {children}

      <style jsx>{`
        header {
          color: #fff;
          background: #707070;
          padding: 15px;
          text-align: center;
        }
        header a {
          color: #fff;
          text-decoration: none;
        }
      `}</style>

      <style jsx global>{`
        body {
          margin: 0;
          font-family: system-ui;
          background: white;
        }
      `}</style>
    </div>
  );
};

export default Layout;

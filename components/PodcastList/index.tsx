import Link from 'next/link';
import { ReactElement } from 'react';
import styled from 'styled-components';

type Podcast = {
  id: number;
  title: string;
  duration: number;
};

const PodcastList = ({ podcasts }: { podcasts: Array<Podcast> }): ReactElement => {
  return (
    <div>
      {podcasts.map((podcast) => (
        <Link href={`/podcast?id=${podcast.id}`} key={podcast.id}>
          <Podcast>
            <h3>{podcast.title}</h3>
            <div className="meta">{Math.ceil(podcast.duration / 60)} minutes</div>
          </Podcast>
        </Link>
      ))}
    </div>
  );
};

const Podcast = styled.a`
  display: block;
  text-decoration: none;
  color: #333;
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  &:hover {
    color: #000;
  }
  h3 {
    margin: 0;
  }
  .meta {
    color: #666;
    margin-top: 0.5em;
    font-size: 0.8em;
  }
`;

export default PodcastList;

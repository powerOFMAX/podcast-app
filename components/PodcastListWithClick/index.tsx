import { ReactElement } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const PodcastListWithClick = ({
  podcasts,
  onClickPodcast
}: {
  podcasts: Array<Podcast>;
  onClickPodcast: (event, podcast) => void;
}): ReactElement => {
  return (
    <div>
      {podcasts.map((podcast) => (
        <Link href={`/podcast?id=${podcast.id}`} key={podcast.id}>
          <Podcast onClick={(event) => onClickPodcast(event, podcast)}>
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

export default PodcastListWithClick;

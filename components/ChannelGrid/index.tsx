import { ReactElement } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const ChannelGrid = ({ channels }: { channels: Array<TChannels> }): ReactElement => {
  return (
    <Channels>
      {channels.map((channel) => (
        <Link href={`/channel?id=${channel.id}`} key={channel.id}>
          <Channel>
            <img src={channel.urls.logo_image.original} alt="" />
            <H2>{channel.title}</H2>
          </Channel>
        </Link>
      ))}
    </Channels>
  );
};

const H2 = styled.h2`
  padding: 5px;
  font-size: 0.9em;
  font-weight: 600;
  margin: 0;
  text-align: center;
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
`;

const Channels = styled.div`
  display: grid;
  grid-gap: 15px;
  padding: 15px;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
`;

export default ChannelGrid;

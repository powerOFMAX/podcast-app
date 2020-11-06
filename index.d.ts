type TChannel = {
  channel: {
    title: string | null;
    urls: TURLobject;
  } | null;
  audioClips: Array<Podcast> | null;
  series: Array<TChannels> | null;
  statusCode: number | null;
};

type TChannels = {
  id: number;
  title: string;
  urls: TURLobject;
};

type TURLobject = {
  logo_image?: {
    original: string;
  };
  banner_image?: {
    original: string;
  };
};

type Podcast = {
  id: number;
  title: string;
  duration: number;
};

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const YoutubeVid = () => {
  const [videos, setVideos] = useState([]);
  const { title } = useParams();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const resp = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCdxwP0kYFci3-8ZsivHTmzIf35kmYXmt0&part=snippet&type=video&q=${title}&maxResults=4`
        );
        console.log(resp);
        setVideos(resp.data.items);
      } catch (err) {
        console.error("Error fetching videos", err);
      }
    };

    fetchVideos();
  }, [title]);

  return (
    <div>
      <h1>{`Youtube Help for ${title}`}</h1>
      <div>
        {videos.map((video) => (
          <div key={video.id.videoId}>
            <h3>{video.snippet.title}</h3>
            <img
              src={video.snippet.thumbnails.default.url}
              alt={video.snippet.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default YoutubeVid;

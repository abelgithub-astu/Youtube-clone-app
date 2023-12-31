import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetails = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetching = async (id) => {
      await fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
        .then((data) => setVideoDetail(data.items[0]))
        .catch((error) => {
          console.error("Error fetching data from the first URL:", error);
        });

      await fetchFromAPI(
        `search?part=snippet&relatedToVideoId=${id}&type=video`
      )
        .then((data) => setVideos(data.items))
        .catch((error) => {
          console.error("Error fetching data from the first URL:", error);
        });
    };
    fetching(id);
    if (videoDetail) {
      console.log("videoDetail");
    }
    if (videos) {
      console.log("videos");
    }
  }, [id]);
  console.log("id", id);
  /* const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail; */

  /* if (!videoDetail?.snippet || !videoDetail || !videos) return "Loading..."; */

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              className="react-player"
              controls
              url={`https://www.youtube.com/watch?v=${id}`}
            />
            <Typography color={"#fff"} variant="h5" p={2} fontWeight={"bold"}>
              {"" /* title */}
            </Typography>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${/* channelId */ ""} `}>
                <Typography
                  variant={{ sm: "subtitle1", md: "h6", color: "#fff" }}
                >
                  {"" /* channelTitle */}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction={"row"} gap={"20px"} alignItems={"center"}>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {/*  {parseInt(viewCount).toLocaleString()} */} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {/* {parseInt(likeCount).toLocaleString()} */} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          {/* <Videos videos={videos} direction="column" /> */}
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetails;

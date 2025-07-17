import { useState } from "react";
import { Text, Box, Slider, TextInput } from "@mantine/core";

export default function UploadType({ label }) {
  const [zoom, setZoom] = useState(50);
  const [url, setURL] = useState("https://en.wikipedia.org/wiki/Main_Page");

  return (
    <>
      <Text>{label}</Text>
      <Slider
        color="blue"
        value={zoom}
        onChange={setZoom}
        marks={[
          { value: 20, label: "20%" },
          { value: 50, label: "50%" },
          { value: 80, label: "80%" },
        ]}
      />
      <Text>{JSON.stringify(url)}</Text>
      <TextInput my="xl" onChange={(e) => setURL(e.currentTarget.value)} />
      <Box>
        <iframe
          src={url}
          frameborder="0"
          style={{ width: "100%", aspectRatio: "1/1", zoom: zoom / 100 }}
        />
      </Box>
    </>
  );
}

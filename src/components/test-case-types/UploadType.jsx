import { useState } from "react";
import { Text, Box, Slider, TextInput, SimpleGrid } from "@mantine/core";

export default function UploadType({ label }) {
  const [zoom, setZoom] = useState(50);
  const [url, setURL] = useState("en.wikipedia.org/wiki/Main_Page");

  return (
    <>
      <SimpleGrid cols={{ base: 1, xs: 2 }}>
        <TextInput
          label="Input URL"
          onChange={(e) => setURL(e.currentTarget.value)}
        />
        <TextInput label="Upload screenshot" />
      </SimpleGrid>

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

      <Box>
        <iframe
          src={`https://${url}`}
          frameborder="0"
          style={{ width: "100%", aspectRatio: "1/1", zoom: zoom / 100 }}
        />
      </Box>
    </>
  );
}

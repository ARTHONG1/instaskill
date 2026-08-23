import React from "react";
import { Composition } from "remotion";
import { ClassddokShorts } from "./ShortsVideo";

export const RemotionRoot: React.FC = () => {
  // 7 scenes * 3.5 seconds = 24.5 seconds @ 30 FPS = 735 frames
  return (
    <Composition
      id="ClassddokShorts"
      component={ClassddokShorts}
      durationInFrames={735}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};

import Hls from 'hls.js';
import React, { useEffect, useRef } from 'react';
import { cn } from '../lib/utils';

interface HlsVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  saturate?: boolean;
  className?: string;
}

export function HlsVideo({ src, saturate = true, className, ...props }: HlsVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // For Safari native HLS support
      video.src = src;
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={cn("object-cover", !saturate && "saturate-0", className)}
      autoPlay
      muted
      loop
      playsInline
      {...props}
    />
  );
}

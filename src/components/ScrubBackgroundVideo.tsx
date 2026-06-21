import { useEffect, useRef } from "react";

export function ScrubBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isForwardRef = useRef<boolean>(true);
  const lastTimeRef = useRef<number>(performance.now());

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Load video with auto-play settings optimized for mobile/desktop
    video.load();

    const handlePlayMode = () => {
      if (window.innerWidth < 1024) {
        // Mobile: Turn off default full-loop to handle custom 3.0s - 4.0s sub-loop
        video.loop = false;
        isForwardRef.current = true;
        video.currentTime = 3.0;
        video.play().catch(() => {});
      } else {
        // Desktop: Pause and scrub with mouse movement
        if (!video.paused) {
          video.pause();
        }
      }
    };

    // Initialize play mode
    handlePlayMode();

    // High performance absolute position tracking relative to the client viewport width (Desktop only)
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      if (!video || !video.duration || isNaN(video.duration)) return;

      const relativeX = e.clientX / window.innerWidth;
      
      // Map coordinate directly from start to end of video duration
      const mappedTime = relativeX * video.duration;
      targetTimeRef.current = Math.max(0, Math.min(video.duration, mappedTime));
    };

    let animationFrameId: number;

    const updateLoop = () => {
      const now = performance.now();
      const deltaSec = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      if (window.innerWidth < 1024) {
        // Mobile (innerWidth < 1024): yoyo/ping-pong loop strictly between 3.0s and 4.0s
        if (video && video.duration && !isNaN(video.duration)) {
          if (isForwardRef.current) {
            // Forward phase: Use native player hardware video acceleration for ultimate smooth frame delivery
            if (video.paused) {
              video.play().catch(() => {});
            }
            if (video.currentTime >= 4.0) {
              video.pause();
              isForwardRef.current = false;
              // Instantly queue backward start without causing sequential seek lag
              if (!video.seeking) {
                video.currentTime = Math.max(3.0, video.currentTime - 0.04);
              }
            }
          } else {
            // Backward phase: manually walk backwards smoothly
            if (!video.paused) {
              video.pause();
            }

            // Only seek if previous frame was fully loaded by decoder (extremely important to eliminate lag)
            if (!video.seeking) {
              const nextTime = video.currentTime - Math.min(0.08, deltaSec * 1.0);
              
              if (nextTime <= 3.0) {
                video.currentTime = 3.0;
                isForwardRef.current = true;
              } else {
                video.currentTime = nextTime;
              }
            }
          }
        }
      } else {
        // Desktop: Interpolate smoothly towards user's mouse-target frame
        if (video && video.duration && !isNaN(video.duration)) {
          if (!video.paused) {
            video.pause();
          }
          
          // KEY HARDWARE LEVEL OPTIMIZATION:
          // Only initiate a seek command if the browser is NOT currently intermediate-seeking.
          // This prevents hardware-level decoder queue build-ups and entirely eliminates lag.
          if (!video.seeking) {
            const currentTime = video.currentTime;
            const diff = targetTimeRef.current - currentTime;

            // Apply a precise ease-out step only if the playhead difference is perceptible
            if (Math.abs(diff) > 0.02) {
              const easedTime = currentTime + diff * 0.15;
              video.currentTime = Math.max(0, Math.min(video.duration, easedTime));
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handlePlayMode);
    animationFrameId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handlePlayMode);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none bg-[#F7F8F6]">
      {/* Premium translucent overlay filter so text remains highly readable across all platforms */}
      <div className="absolute inset-0 bg-white/92 sm:bg-white/84 lg:bg-transparent backdrop-blur-[1px] lg:backdrop-blur-none z-[1] pointer-events-none transition-all duration-300" />
      
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover object-right lg:object-right-bottom scale-100 opacity-95"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4"
      />
    </div>
  );
}

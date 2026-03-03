import { useState, useRef, useEffect } from "react";
import { Play, Volume2 } from "lucide-react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
    fbq: (...args: any[]) => void;
  }
}

interface VslPlayerProps {
  onProgressUpdate?: (percent: number) => void;
}

const VIDEO_MILESTONES = [10, 25, 50, 75, 90, 95, 100];

export function VslPlayer({ onProgressUpdate }: VslPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const maxProgressRef = useRef(0);
  const onProgressRef = useRef(onProgressUpdate);
  const initializedRef = useRef(false);
  const firedMilestonesRef = useRef<Set<number>>(new Set());

  onProgressRef.current = onProgressUpdate;

  const firePixelEvent = (milestone: number) => {
    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', 'VideoProgress', {
        video_id: 'nyogyHHgv2M',
        video_title: 'Protocolo Co-Criação Consciente',
        percent_watched: milestone,
      });
    }
  };

  const sendProgressToServer = (milestone: number) => {
    fetch('/api/video-progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        videoId: 'nyogyHHgv2M',
        milestone,
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {});
  };

  const checkMilestones = (percent: number) => {
    for (const milestone of VIDEO_MILESTONES) {
      if (percent >= milestone && !firedMilestonesRef.current.has(milestone)) {
        firedMilestonesRef.current.add(milestone);
        firePixelEvent(milestone);
        sendProgressToServer(milestone);
      }
    }
  };

  useEffect(() => {
    if (!isPlaying || initializedRef.current) return;
    initializedRef.current = true;

    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', 'VideoStarted', {
        video_id: 'nyogyHHgv2M',
        video_title: 'Protocolo Co-Criação Consciente',
      });
    }

    const createPlayer = () => {
      if (!containerRef.current) return;

      const div = document.createElement('div');
      div.id = 'yt-player-' + Date.now();
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(div);

      const w = containerRef.current.offsetWidth;
      const h = containerRef.current.offsetHeight;

      playerRef.current = new window.YT.Player(div.id, {
        videoId: 'nyogyHHgv2M',
        width: w,
        height: h,
        playerVars: {
          autoplay: 1,
          rel: 0,
          controls: 1,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: (event: any) => {
            const iframe = event.target.getIframe();
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.position = 'absolute';
            iframe.style.top = '0';
            iframe.style.left = '0';
            intervalRef.current = setInterval(() => {
              if (playerRef.current && playerRef.current.getDuration) {
                try {
                  const duration = playerRef.current.getDuration();
                  const currentTime = playerRef.current.getCurrentTime();
                  if (duration > 0) {
                    const percent = (currentTime / duration) * 100;
                    if (percent > maxProgressRef.current) {
                      maxProgressRef.current = percent;
                      onProgressRef.current?.(percent);
                      checkMilestones(percent);
                    }
                  }
                } catch (e) {}
              }
            }, 1000);
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              maxProgressRef.current = 100;
              onProgressRef.current?.(100);
              checkMilestones(100);
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  return (
    <div
      data-testid="vsl-player"
      className="relative w-full max-w-sm mx-auto rounded-2xl overflow-hidden"
      style={{
        border: '3px solid #ec7c00',
        boxShadow: '0 0 40px rgba(236, 124, 0, 0.2), 0 0 80px rgba(236, 124, 0, 0.05)',
      }}
    >
      <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
        {!isPlaying ? (
          <div
            className="absolute inset-0 bg-black flex flex-col items-center justify-center cursor-pointer"
            onClick={() => setIsPlaying(true)}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

            <div className="relative z-10 flex flex-col items-center justify-center gap-4">
              <p className="text-white font-bold text-lg md:text-2xl tracking-wide drop-shadow-lg">
                Seu video ja comecou
              </p>

              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{ backgroundColor: 'rgba(236, 124, 0, 0.3)' }}
                />
                <div
                  className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full"
                  style={{ backgroundColor: '#e35525', border: '2px solid rgba(255,255,255,0.8)' }}
                >
                  <Play className="w-10 h-10 md:w-12 md:h-12 text-white fill-white ml-1" />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <Volume2 className="w-5 h-5 text-white animate-pulse" />
                <p className="text-white font-bold text-lg md:text-2xl tracking-wide drop-shadow-lg">
                  Clique para ouvir
                </p>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1.5" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <div
                className="h-full rounded-r-full"
                style={{
                  width: '30%',
                  backgroundColor: '#FF4002',
                }}
              />
            </div>
          </div>
        ) : (
          <div ref={containerRef} className="absolute inset-0 w-full h-full" />
        )}
      </div>
    </div>
  );
}

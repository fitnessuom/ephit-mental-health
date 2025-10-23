import { Video, getYouTubeId } from "@/lib/videoData";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";

interface VideoCardCompactProps {
  video: Video;
  onPlay?: (video: Video) => void;
}

export function VideoCardCompact({ video, onPlay }: VideoCardCompactProps) {
  const { track } = useAnalytics();
  const videoId = getYouTubeId(video.url);

  const handlePlay = () => {
    track("video_click", { videoId: video.id, videoName: video.name });
    onPlay?.(video);
  };

  return (
    <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors group cursor-pointer max-w-md" onClick={handlePlay}>
      <div className="relative flex-shrink-0 w-24 h-16 rounded overflow-hidden">
        <img
          src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
          alt={video.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Play className="w-4 h-4 text-primary-foreground fill-primary-foreground ml-0.5" />
          </div>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium line-clamp-2 leading-tight">{video.name}</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {video.minutes === "Short" ? "< 1 min" : `${video.minutes} min`}
        </p>
      </div>
    </div>
  );
}

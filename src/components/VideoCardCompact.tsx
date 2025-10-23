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
    <div 
      className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/15 hover:to-primary/10 transition-all duration-300 group cursor-pointer border border-primary/20 hover:border-primary/30 shadow-sm hover:shadow-md max-w-md"
      onClick={handlePlay}
    >
      <div className="relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden ring-2 ring-primary/30 group-hover:ring-primary/50 transition-all">
        <img
          src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
          alt={video.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-primary/90 group-hover:bg-primary flex items-center justify-center group-hover:scale-110 transition-all shadow-lg">
            <Play className="w-5 h-5 text-primary-foreground fill-primary-foreground ml-0.5" />
          </div>
        </div>
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <p className="text-sm font-semibold line-clamp-2 leading-snug group-hover:text-primary transition-colors">{video.name}</p>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-primary">
            {video.minutes === "Short" ? "< 1 min" : `${video.minutes} min`}
          </span>
          <span className="text-xs text-muted-foreground">• {video.level}</span>
        </div>
      </div>
    </div>
  );
}

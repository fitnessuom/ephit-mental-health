import { Video, getYouTubeId } from "@/lib/videoData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ExternalLink, User } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";

interface VideoCardProps {
  video: Video;
  onPlay?: (video: Video) => void;
}

export function VideoCard({ video, onPlay }: VideoCardProps) {
  const { track } = useAnalytics();
  const videoId = getYouTubeId(video.url);

  const handlePlay = () => {
    track("video_click", { videoId: video.id, videoName: video.name });
    onPlay?.(video);
  };

  const handleOpenYouTube = () => {
    track("video_click", { videoId: video.id, videoName: video.name, action: "open_youtube" });
    window.open(video.url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg group">
      <div 
        className="aspect-video relative bg-muted cursor-pointer overflow-hidden"
        onClick={handlePlay}
      >
        <img
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt={video.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
          onError={(e) => {
            // Fallback to medium quality thumbnail
            e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
          }}
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
            <div className="w-0 h-0 border-l-[16px] border-l-primary-foreground border-y-[10px] border-y-transparent ml-1" />
          </div>
        </div>
        <Badge className="absolute top-2 right-2 bg-background/90">{video.level}</Badge>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-2">{video.name}</CardTitle>
        <CardDescription className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {video.trainer}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {video.minutes === "Short" ? "< 1 min" : `${video.minutes} min`}
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {video.description}
        </p>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button 
          onClick={handlePlay}
          className="flex-1"
        >
          Watch Now
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={handleOpenYouTube}
          aria-label="Open on YouTube"
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

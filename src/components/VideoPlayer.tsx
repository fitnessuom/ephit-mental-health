import { Video, getYouTubeId } from "@/lib/videoData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";

interface VideoPlayerProps {
  video: Video | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VideoPlayer({ video, open, onOpenChange }: VideoPlayerProps) {
  if (!video) return null;

  const videoId = getYouTubeId(video.url);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{video.name}</DialogTitle>
          <DialogDescription className="flex items-center gap-4 text-sm">
            <Badge variant="secondary">{video.level}</Badge>
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {video.trainer}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {video.minutes === "Short" ? "< 1 min" : `${video.minutes} min`}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="aspect-video w-full rounded-lg overflow-hidden bg-muted">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?controls=1&rel=0&modestbranding=1&enablejsapi=1&autoplay=1`}
            title={video.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{video.description}</p>
          {video.details && (
            <p className="text-xs text-muted-foreground">
              <strong>Tags:</strong> {video.details}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

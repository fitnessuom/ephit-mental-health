import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay for smoother page load
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-4xl mx-auto bg-card/95 backdrop-blur-md border border-border/50 rounded-xl shadow-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              🍪 We use cookies
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We use cookies and similar technologies to help personalise content, tailor and measure ads, 
              and provide a better experience. By clicking "Accept All", you consent to the use of cookies. 
              You can manage your preferences or reject non-essential cookies by clicking "Manage Preferences". 
              For more information, please see our{" "}
              <a href="/cookie-policy" className="text-primary hover:underline">
                Cookie Policy
              </a>.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReject}
              className="text-muted-foreground hover:text-foreground"
            >
              Reject Non-Essential
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="bg-primary hover:bg-primary/90"
            >
              Accept All
            </Button>
          </div>
          
          <button
            onClick={handleReject}
            className="absolute top-2 right-2 md:static p-1 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close cookie banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

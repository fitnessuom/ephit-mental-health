import { useState, useEffect } from "react";
import { X } from "lucide-react";

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("disclaimer-dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem("disclaimer-dismissed", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-4xl mx-auto bg-card/95 backdrop-blur-md border border-border/50 rounded-xl shadow-lg p-4 md:p-6">
        <div className="flex gap-4 items-start">
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              ⚠️ Research Demonstration
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This website is currently in demonstration phase (for research purposes only) rather than clinical/personal wellness advice.{" "}
              For more information on the research team and contact, visit us at{" "}
              <a 
                href="https://sites.manchester.ac.uk/e-phit/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                sites.manchester.ac.uk/e-phit/
              </a>
            </p>
          </div>
          
          <button
            onClick={handleDismiss}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors shrink-0"
            aria-label="Dismiss disclaimer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

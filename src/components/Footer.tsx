import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 mt-20">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-3 text-foreground">e-PHIT Mental Health</h3>
            <p className="text-sm text-muted-foreground">
              Evidence-based workouts and nutrition advice for young people.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/quiz" className="text-muted-foreground hover:text-primary transition-colors">
                  Take the Quiz
                </Link>
              </li>
              <li>
                <Link to="/browse" className="text-muted-foreground hover:text-primary transition-colors">
                  Browse Videos
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <div className="text-sm text-muted-foreground space-y-2">
            <p className="font-medium">
              © {new Date().getFullYear()} ephit-mental-health demo. All rights reserved.
            </p>
            <p className="text-xs max-w-3xl">
              <strong>Disclaimer:</strong> The content provided here is for informational purposes 
              regarding personal wellbeing and should not be considered medical advice. This is a 
              demonstration site for research feedback purposes.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

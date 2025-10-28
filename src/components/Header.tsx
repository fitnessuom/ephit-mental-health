import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from "@/assets/logo.png";

export function Header() {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/quiz", label: "Take Quiz" },
    { to: "/browse", label: "Choose Your Moves" },
    { to: "/mind-gym", label: "Mind Gym" },
    { to: "/chat", label: "ePhit Coach" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Desktop Navigation - Now on LEFT */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation Toggle */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col space-y-4 mt-8">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo - Now on RIGHT */}
        <Link to="/" className="flex items-center space-x-3">
          <img 
            src={logo} 
            alt="e-PHIT Mental Health Logo" 
            className="h-12 w-auto"
          />
        </Link>
      </div>
    </header>
  );
}

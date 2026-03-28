import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu, X, Car, Moon, Sun, User, LogOut } from "lucide-react";
import { BRAND_NAME } from "../data/constants";
import { useTheme } from "next-themes";
import { useAuth } from "../contexts/AuthContext";
import { ImprovedAuthModal } from "./ImprovedAuthModal";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Book Ride", path: "/book-ride" },
    { name: "Pricing", path: "/pricing" },
    { name: "Become Driver", path: "/become-driver" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogin = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleSignup = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-gray-800"
            : "bg-white dark:bg-gray-900"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-r from-[#FFC800] to-[#FFD93D] p-2.5 rounded-xl group-hover:scale-110 transition-transform shadow-yellow">
                <Car className="h-6 w-6 text-black" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-[#FFC800] to-[#FFD93D] bg-clip-text text-transparent">
                  {BRAND_NAME}
                </span>
                <span className="text-xs text-muted-foreground -mt-1">
                  India's Fastest Ride
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive(link.path)
                      ? "bg-[#FFC800] text-black"
                      : "text-foreground hover:bg-[#FFF9E6] dark:hover:bg-gray-800"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>

              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <Link to="/user-dashboard">
                    <Button variant="outline" className="gap-2 border-2 hover:bg-[#FFF9E6] dark:hover:bg-gray-800">
                      <User className="h-4 w-4" />
                      {user?.firstName || user?.name}
                    </Button>
                  </Link>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="icon"
                    className="hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleLogin}
                    variant="outline"
                    className="border-2 border-[#FFC800] text-black dark:text-white hover:bg-[#FFF9E6] dark:hover:bg-gray-800 font-semibold"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={handleSignup}
                    className="bg-gradient-to-r from-[#FFC800] to-[#FFD93D] hover:from-[#FFD93D] hover:to-[#FFC800] text-black font-semibold shadow-yellow"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>

              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                  <div className="flex flex-col space-y-4 mt-8">
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                          isActive(link.path)
                            ? "bg-[#FFC800] text-black"
                            : "hover:bg-[#FFF9E6] dark:hover:bg-gray-800"
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                    <div className="pt-4 border-t space-y-3">
                      {isAuthenticated ? (
                        <>
                          <Link to="/user-dashboard" onClick={() => setIsOpen(false)}>
                            <Button variant="outline" className="w-full gap-2 border-2">
                              <User className="h-4 w-4" />
                              {user?.firstName || user?.name}
                            </Button>
                          </Link>
                          <Button
                            onClick={() => {
                              handleLogout();
                              setIsOpen(false);
                            }}
                            variant="outline"
                            className="w-full gap-2 border-2 border-red-200 text-red-600 hover:bg-red-50"
                          >
                            <LogOut className="h-4 w-4" />
                            Logout
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            onClick={() => {
                              handleLogin();
                              setIsOpen(false);
                            }}
                            variant="outline"
                            className="w-full border-2 border-[#FFC800] font-semibold"
                          >
                            Login
                          </Button>
                          <Button
                            onClick={() => {
                              handleSignup();
                              setIsOpen(false);
                            }}
                            className="w-full bg-gradient-to-r from-[#FFC800] to-[#FFD93D] text-black font-semibold"
                          >
                            Sign Up
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <ImprovedAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
      />
    </>
  );
}

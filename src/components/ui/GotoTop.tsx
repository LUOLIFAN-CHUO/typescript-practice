import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const GoToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 transition-opacity duration-300 ease-in-out ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
      } 
      group bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-600
      shadow-xl hover:shadow-2xl backdrop-blur-xl rounded-full p-4
      text-white dark:text-white hover:scale-110 transform transition-transform duration-300 border border-white/20`}
      aria-label="ページ上部へ戻る"
    >
      <ArrowUp size={20} className="animate-pulse group-hover:animate-none" />
    </button>
  );
};

export default GoToTopButton;

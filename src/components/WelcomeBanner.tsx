import { X } from "lucide-react";
import { useState } from "react";

const WelcomeBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-primary text-primary-foreground py-3 px-4 text-center relative">
      <p className="text-sm font-medium">
        🎉 Massive welcome to new joiners <strong>Hubano</strong>, <strong>Artemis</strong> and <strong>FormerlyLoveDoctor</strong>! 🎉
      </p>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-primary-foreground/20 rounded-full transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default WelcomeBanner;

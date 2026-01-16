import { motion } from "motion/react";
import { Globe, Zap, ShoppingBag, Palette, AppWindow, TrendingUp, Trophy, ShieldCheck, Gem, Layers } from "lucide-react";

export const SevenFigureIcon = () => {
  return (
    <div className="flex items-center gap-2">
      7-Figure
      <motion.div
        animate={{ rotateY: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <Trophy className="w-5 h-5 max-[375px]:w-4 max-[375px]:h-4 sm:w-8 sm:h-8 md:w-12 md:h-12 text-white" />
      </motion.div>
    </div>
  );
};

export const ProvenIcon = () => {
  return (
    <div className="flex items-center gap-2">
      Proven
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ShieldCheck className="w-5 h-5 max-[375px]:w-4 max-[375px]:h-4 sm:w-8 sm:h-8 md:w-12 md:h-12 text-white" />
      </motion.div>
    </div>
  );
};

export const ConvertingIcon = () => {
  return (
    <div className="flex items-center gap-2">
      Converting
      <motion.div
        animate={{ x: [-2, 2, -2], y: [1, -2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <TrendingUp className="w-5 h-5 max-[375px]:w-4 max-[375px]:h-4 sm:w-8 sm:h-8 md:w-12 md:h-12 text-white" />
      </motion.div>
    </div>
  );
};

export const PremiumIcon = () => {
  return (
    <div className="flex items-center gap-2">
      Premium
      <motion.div
        animate={{ rotate: [-10, 10, -10], filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Gem className="w-5 h-5 max-[375px]:w-4 max-[375px]:h-4 sm:w-8 sm:h-8 md:w-12 md:h-12 text-white" />
      </motion.div>
    </div>
  );
};

export const ScalableIcon = () => {
  return (
    <div className="flex items-center gap-2">
      Scalable
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Layers className="w-5 h-5 max-[375px]:w-4 max-[375px]:h-4 sm:w-8 sm:h-8 md:w-12 md:h-12 text-white" />
      </motion.div>
    </div>
  );
};

// Keep old ones for fallback if needed, or remove them. keeping for safety but not exporting if unused is fine in TS usually, but better to keep exports valid.
export const GlobalIcon = () => {
  return (
    <div className="flex items-center gap-2">
      Global
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <Globe className="w-5 h-5 max-[375px]:w-4 max-[375px]:h-4 sm:w-8 sm:h-8 md:w-12 md:h-12" />
      </motion.div>
    </div>
  );
};

export const FastIcon = () => {
  return (
    <div className="flex items-center gap-2">
      Fast
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.5 }}
      >
        <Zap className="w-5 h-5 max-[375px]:w-4 max-[375px]:h-4 sm:w-8 sm:h-8 md:w-12 md:h-12 fill-white text-white" />
      </motion.div>
    </div>
  );
};

export const StoresIcon = () => {
  return (
    <div className="flex items-center gap-2">
      Stores
      <motion.div
        animate={{ y: [-2, 2, -2] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ShoppingBag className="w-5 h-5 max-[375px]:w-4 max-[375px]:h-4 sm:w-8 sm:h-8 md:w-12 md:h-12" />
      </motion.div>
    </div>
  );
};

export const ThemesIcon = () => {
  return (
    <div className="flex items-center gap-2">
      Themes
      <motion.div
        animate={{ rotate: [-10, 10, -10] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Palette className="w-5 h-5 max-[375px]:w-4 max-[375px]:h-4 sm:w-8 sm:h-8 md:w-12 md:h-12" />
      </motion.div>
    </div>
  );
};

export const AppsIcon = () => {
  return (
    <div className="flex items-center gap-2">
      Apps
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <AppWindow className="w-5 h-5 max-[375px]:w-4 max-[375px]:h-4 sm:w-8 sm:h-8 md:w-12 md:h-12" />
      </motion.div>
    </div>
  );
};

export const SalesIcon = () => {
  return (
    <div className="flex items-center gap-2">
      Sales
      <motion.div
        animate={{ x: [-2, 2, -2], y: [1, -2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <TrendingUp className="w-5 h-5 max-[375px]:w-4 max-[375px]:h-4 sm:w-8 sm:h-8 md:w-12 md:h-12" />
      </motion.div>
    </div>
  );
};

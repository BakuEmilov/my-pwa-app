import { motion, useMotionValue, animate } from "framer-motion";
import React from "react";

const SNAP_POINTS = [0.2, 0.4, 0.8];

const OPTIONS = [
  { label: "Минимум", value: 0 },
  { label: "40%", value: 1 },
  { label: "Почти максимум", value: 2 },
];

export default function BottomSheet() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const y = useMotionValue(0);

  const moveToSnapPoint = (index: number) => {
    setActiveIndex(index);
  };

  React.useEffect(() => {
    const vh = window.innerHeight;
    const targetY = vh * (1 - SNAP_POINTS[activeIndex]);
    animate(y, targetY, { type: "spring", stiffness: 300, damping: 30 });
  }, [activeIndex, y]);

  const handleDragEnd = (_: unknown, info: { point: { y: number } }) => {
    const vh = window.innerHeight;
    const snapPositions = SNAP_POINTS.map((p) => vh * (1 - p));

    const nearestIndex = snapPositions.reduce((closest, pos, i) => {
      return Math.abs(pos - info.point.y) <
        Math.abs(snapPositions[closest] - info.point.y)
        ? i
        : closest;
    }, 0);

    setActiveIndex(nearestIndex);
  };

  return (
    <motion.div
      className="fixed left-0 right-0 bottom-0 bg-white rounded-t-2xl shadow-xl z-50"
      style={{
        y,
        height: "100vh",
      }}
      drag="y"
      dragConstraints={{ top: 0, bottom: window.innerHeight * 0.8 }}
      onDragEnd={handleDragEnd}
    >
      <div className="flex justify-center items-center h-6">
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mt-2" />
      </div>

      <div className="p-4 overflow-y-auto h-full text-black">
        <h2 className="text-xl font-bold">Контент</h2>
        <p className="text-sm mt-2">Добавь сюда любой контент...</p>

        <div className="flex gap-2 mt-4">
          {OPTIONS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => moveToSnapPoint(value)}
              className={`px-4 py-2 rounded cursor-pointer ${
                activeIndex === value ? "bg-black text-white" : "bg-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

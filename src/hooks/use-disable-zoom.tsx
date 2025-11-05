import { useEffect } from "react";

export function useDisableZoom() {
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) e.preventDefault();
    };

    const handleGestureStart = (e: Event) => e.preventDefault();

    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("gesturestart", handleGestureStart);

    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("gesturestart", handleGestureStart);
    };
  }, []);
}

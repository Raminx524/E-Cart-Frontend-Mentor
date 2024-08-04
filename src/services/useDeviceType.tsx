import { useState, useEffect } from "react";

const useDeviceType = (): "mobile" | "tablet" | "desktop" => {
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(max-width: 767px)").matches) {
        setDeviceType("mobile");
      } else if (window.matchMedia("(max-width: 1024px)").matches) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceType;
};

export default useDeviceType;

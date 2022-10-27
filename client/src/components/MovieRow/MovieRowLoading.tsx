import ContentLoader from "react-content-loader";
import { useEffect, useState } from "react";

export const MovieRowLoading: React.FC = () => {
  const [width, setWidth] = useState<number>();

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("scroll", handleWindowResize);
  }, []);

  return (
    <ContentLoader
      speed={2}
      width={width}
      height={144}
      viewBox={`0 0 ${width} 144`}
      backgroundColor="#8e8e8e"
      foregroundColor="#acacac"
    >
      <rect x="0" y="0" rx="0" ry="0" width="288" height="144" />
      <rect x="298" y="0" rx="0" ry="0" width="288" height="144" />
      <rect x="596" y="0" rx="0" ry="0" width="288" height="144" />
      <rect x="894" y="0" rx="0" ry="0" width="288" height="144" />
      <rect x="1192" y="0" rx="0" ry="0" width="288" height="144" />
      <rect x="1490" y="0" rx="0" ry="0" width="288" height="144" />
      <rect x="1788" y="0" rx="0" ry="0" width="288" height="144" />
    </ContentLoader>
  );
};

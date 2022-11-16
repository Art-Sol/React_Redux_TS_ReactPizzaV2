import React from "react";
import ContentLoader from "react-content-loader";

export const SkeletonProduct: React.FC = () => (
  <ContentLoader
    speed={2}
    width={1260}
    height={387}
    viewBox="0 0 1260 387"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="420" y="0" rx="10" ry="10" width="400" height="35" />
    <rect x="420" y="55" rx="10" ry="10" width="400" height="55" />
    <rect x="420" y="165" rx="10" ry="10" width="190" height="55" />
    <rect x="620" y="165" rx="10" ry="10" width="200" height="55" />
    <rect x="420" y="235" rx="10" ry="10" width="190" height="55" />
    <rect x="620" y="235" rx="10" ry="10" width="200" height="55" />
    <rect x="420" y="325" rx="10" ry="10" width="80" height="55" />
    <rect x="520" y="325" rx="10" ry="10" width="130" height="55" />
    <circle cx="190" cy="190" r="190" />
  </ContentLoader>
);

import ContentLoader from "react-content-loader";
import { react, Fragment } from "react";

const Loader = () => (
  <ContentLoader
    speed={2}
    width={1200}
    height={510}
    viewBox="0 0 1000 510"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    {/* Header */}
    <rect x="15" y="20" rx="3" ry="3" width="200" height="20" />
    <rect x="230" y="20" rx="3" ry="3" width="200" height="20" />
    <rect x="445" y="20" rx="3" ry="3" width="200" height="20" />
    <rect x="660" y="20" rx="3" ry="3" width="200" height="20" />

    {/* Rows */}
    {Array.from({ length: 10 }).map((_, index) => (
      <Fragment key={index}>
        <rect
          x="15"
          y={50 + index * 45}
          rx="3"
          ry="3"
          width="200"
          height="20"
        />
        <rect
          x="230"
          y={50 + index * 45}
          rx="3"
          ry="3"
          width="200"
          height="20"
        />
        <rect
          x="445"
          y={50 + index * 45}
          rx="3"
          ry="3"
          width="200"
          height="20"
        />
        <rect
          x="660"
          y={50 + index * 45}
          rx="3"
          ry="3"
          width="200"
          height="20"
        />
      </Fragment>
    ))}
  </ContentLoader>
);

export default Loader;

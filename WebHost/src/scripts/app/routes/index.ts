import React from "react";

const Blog = React.lazy(
  () => import(/* webpackChunkName: 'blog' */ "./BlogRoute")
);
const Landing = React.lazy(
  () => import(/* webpackChunkName: 'landing' */ "./LandingRoute")
);
const About = React.lazy(
  () => import(/* webpackChunkName: 'about' */ "./AboutRoute")
);

export { Blog, Landing, About };

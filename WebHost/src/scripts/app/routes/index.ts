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
const AdminLanding = React.lazy(
  () => import(/* webpackChunkName: 'admin-landing' */ "./AdminLandingRoute")
);
const BlogEdit = React.lazy(
  () => import(/* webpackChunkName: 'blog-edit' */ "./AdminBlogEditRoute")
);

export { Blog, Landing, About, AdminLanding, BlogEdit };

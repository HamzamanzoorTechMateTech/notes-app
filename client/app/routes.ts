import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/Login.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("signup", "routes/Signup.tsx"),
] satisfies RouteConfig;

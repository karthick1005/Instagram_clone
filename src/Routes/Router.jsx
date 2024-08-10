import Authpage from "../Pages/Authpage/Authpage";
import Homepage from "../Pages/HomePage/Homepage";
import Post_open from "../Pages/Profilepage/Post_open/Post_open";
import Profilepage from "../Pages/Profilepage/Profilepage";

const routes = [
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/auth",
    element: <Authpage />,
  },
  {
    path: "/:username",
    element: <Profilepage />,
  },
  {
    path: "/p/:value",
    element: <Post_open />,
  },
];

export default routes;

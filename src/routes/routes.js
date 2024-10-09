import config from "~/config";
import HeaderOnly from "~/layouts/HeaderOnly";
import Home from "~/pages/Home/Home";
import Login from "~/pages/Login/Login";
import LstMovie from "~/pages/LstMovie/LstMovie";

const publicRoutes = [
  { path: config.routes.home, comp: Home },
  { path: config.routes.login, comp: Login, layout: HeaderOnly },
  { path: config.routes.danhsach + `/:loai-phim`, comp: LstMovie },
  { path: config.routes.theloai + `/:loai-phim`, comp: LstMovie },
  { path: config.routes.quocgia + `/:loai-phim`, comp: LstMovie },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

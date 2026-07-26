import { Route, Routes } from "react-router";
import { SiteLayout } from "@/layout/site-layout";
import { HomePage } from "@/pages/home-page";
import { NotFoundPage } from "@/pages/not-found-page";
import { ShopPage } from "@/pages/shop-page";
import { routes } from "./routes";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteLayout />} path={routes.home}>
        <Route element={<HomePage />} index />
        <Route element={<ShopPage />} path={routes.shop} />
        <Route element={<NotFoundPage />} path="*" />
      </Route>
    </Routes>
  );
}

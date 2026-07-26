import { Route, Routes } from "react-router";
import { SiteLayout } from "@/layout/site-layout";
import { CartPage } from "@/pages/cart-page";
import { CheckoutPage } from "@/pages/checkout-page";
import { HomePage } from "@/pages/home-page";
import { NotFoundPage } from "@/pages/not-found-page";
import { ProductDetailPage } from "@/pages/product-detail-page";
import { ShopPage } from "@/pages/shop-page";
import { routes } from "./routes";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteLayout />} path={routes.home}>
        <Route element={<HomePage />} index />
        <Route element={<ShopPage />} path={routes.shop} />
        <Route element={<ProductDetailPage />} path="product/:slug" />
        <Route element={<CartPage />} path={routes.cart} />
        <Route element={<CheckoutPage />} path={routes.checkout} />
        <Route element={<NotFoundPage />} path="*" />
      </Route>
    </Routes>
  );
}

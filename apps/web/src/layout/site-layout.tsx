import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function SiteLayout() {
  const { pathname } = useLocation();

  // Client-side navigation keeps the scroll offset; every page starts at its
  // own hero in the design.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

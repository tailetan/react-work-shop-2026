import { cn } from "@react-workshop/ui/utils";
import { useEffect, useId, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { primaryNavigation, routes } from "../app/routes";
import { Container } from "../components/container";
import {
  CartIcon,
  CloseIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  UserIcon
} from "../components/icons";
import { useCart } from "../features/cart/hooks/use-cart";

const iconButtonClass = "grid h-10 w-10 place-items-center transition-colors hover:text-brand";

export function SiteHeader() {
  const { count } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const searchInputId = useId();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Any navigation closes the transient panels.
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const term = searchTerm.trim();

    navigate(term ? `${routes.shop}?search=${encodeURIComponent(term)}` : routes.shop);
    setIsSearchOpen(false);
  }

  return (
    <header className="relative bg-white">
      <Container className="flex min-h-[100px] items-center justify-between gap-6">
        <Link
          className="flex shrink-0 items-center gap-2 text-[28px] font-bold leading-none md:text-[34px]"
          to={routes.home}
        >
          <img
            alt=""
            className="h-9 w-9 object-contain"
            height={36}
            src="/images/common/common-01.png"
            width={36}
          />
          Furniro
        </Link>

        <nav
          aria-label="Main"
          className="hidden items-center gap-10 text-base font-medium xl:gap-[72px] lg:flex"
        >
          {primaryNavigation.map((item) => (
            <NavLink
              className={({ isActive }) =>
                cn("transition-colors hover:text-brand", isActive && "text-brand")
              }
              end={item.to === routes.home}
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1 text-black sm:gap-4">
          <button aria-label="Account" className={iconButtonClass} type="button">
            <UserIcon className="h-7 w-7" />
          </button>

          <button
            aria-expanded={isSearchOpen}
            aria-label="Search products"
            className={iconButtonClass}
            onClick={() => setIsSearchOpen((open) => !open)}
            type="button"
          >
            <SearchIcon className="h-7 w-7" />
          </button>

          <button aria-label="Wishlist" className={iconButtonClass} type="button">
            <HeartIcon className="h-7 w-7" />
          </button>

          <Link
            aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
            className={cn(iconButtonClass, "relative")}
            to={routes.cart}
          >
            <CartIcon className="h-7 w-7" />
            {count > 0 ? (
              <span className="absolute -right-1 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[11px] font-semibold text-white">
                {count > 99 ? "99+" : count}
              </span>
            ) : null}
          </Link>

          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className={cn(iconButtonClass, "lg:hidden")}
            onClick={() => setIsMenuOpen((open) => !open)}
            type="button"
          >
            {isMenuOpen ? (
              <CloseIcon className="h-7 w-7" />
            ) : (
              <MenuIcon className="h-7 w-7" />
            )}
          </button>
        </div>
      </Container>

      {isSearchOpen ? (
        <div className="border-t border-line bg-beige py-4">
          <Container>
            <form className="flex items-center gap-3" onSubmit={handleSearchSubmit} role="search">
              <label className="sr-only" htmlFor={searchInputId}>
                Search products
              </label>
              <input
                autoComplete="off"
                className="h-12 min-w-0 flex-1 rounded-[10px] border border-muted bg-white px-4 outline-none focus-visible:border-brand"
                id={searchInputId}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search for sofas, ottomans, outdoor sets..."
                type="search"
                value={searchTerm}
              />
              <button
                className="h-12 rounded-[10px] bg-brand px-6 font-semibold text-white transition-colors hover:bg-brand-dark"
                type="submit"
              >
                Search
              </button>
            </form>
          </Container>
        </div>
      ) : null}

      {isMenuOpen ? (
        <nav
          aria-label="Mobile"
          className="border-t border-line bg-white lg:hidden"
          id="mobile-navigation"
        >
          <Container className="grid gap-1 py-4">
            {primaryNavigation.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  cn(
                    "rounded-[8px] px-3 py-3 text-base font-medium transition-colors hover:bg-beige",
                    isActive && "text-brand"
                  )
                }
                end={item.to === routes.home}
                key={item.to}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </Container>
        </nav>
      ) : null}
    </header>
  );
}

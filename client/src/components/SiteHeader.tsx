import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ClipboardList, Mail, Menu, Phone, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useRequirement } from "@/components/RequirementProvider";
import { business } from "@/lib/business";
import { siteNavigation } from "@/lib/navigation";

const logoUrl = "/mas-logo.jpeg";
const focusableSelector = "a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])";

type NavigationItem = {
  label: string;
  href?: string;
  download?: boolean;
  action?: () => void;
};

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [, navigate] = useLocation();
  const { items, setOpen, setQuoteOpen } = useRequirement();
  const menuTriggerRef = useRef<HTMLButtonElement | null>(null);
  const menuPanelRef = useRef<HTMLDivElement | null>(null);
  const menuCloseRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const listener = () => setScrolled(window.scrollY > 18);
    listener();
    window.addEventListener("scroll", listener, { passive: true });
    return () => window.removeEventListener("scroll", listener);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const scrollY = window.scrollY;
    const body = document.body;
    const root = document.documentElement;
    const original = {
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      rootOverflow: root.style.overflow,
    };

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    root.style.overflow = "hidden";

    const focusMenu = window.requestAnimationFrame(() => menuCloseRef.current?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab" || !menuPanelRef.current) return;

      const focusable = Array.from(menuPanelRef.current.querySelectorAll<HTMLElement>(focusableSelector));
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.cancelAnimationFrame(focusMenu);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      body.style.overflow = original.bodyOverflow;
      body.style.position = original.bodyPosition;
      body.style.top = original.bodyTop;
      body.style.width = original.bodyWidth;
      root.style.overflow = original.rootOverflow;
      window.scrollTo(0, scrollY);
      window.requestAnimationFrame(() => menuTriggerRef.current?.focus());
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const goToFinder = () => {
    navigate("/catalogue");
    window.setTimeout(() => document.getElementById("catalogue-search")?.focus(), 100);
  };
  const goToHomeAnchor = (anchor: "#categories" | "#about" | "#contact") => {
    const focusTarget = () => document.querySelector<HTMLElement>(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (window.location.pathname === "/") {
      focusTarget();
      return;
    }
    navigate(`/${anchor}`);
    window.setTimeout(focusTarget, 120);
  };
  const nav: NavigationItem[] = [
    siteNavigation.products,
    { label: siteNavigation.categories.label, action: () => goToHomeAnchor(siteNavigation.categories.anchor) },
    { label: siteNavigation.finder.label, action: goToFinder },
    { label: siteNavigation.about.label, action: () => goToHomeAnchor(siteNavigation.about.anchor) },
    { label: siteNavigation.contact.label, action: () => goToHomeAnchor(siteNavigation.contact.anchor) },
    siteNavigation.catalogue,
  ];

  const mobileMenu = (
    <div id="mobile-site-menu" className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`} aria-hidden={!menuOpen}>
      <div ref={menuPanelRef} className="mobile-menu__panel" role="dialog" aria-modal="true" aria-labelledby="mobile-menu-title">
        <h2 id="mobile-menu-title" className="sr-only">M.A.S. Traders navigation</h2>
        <div className="mobile-menu__header"><img src={logoUrl} alt="M.A.S. Traders" className="h-11 w-11 object-cover rounded-full shadow-sm" /><button ref={menuCloseRef} type="button" onClick={closeMenu} aria-label="Close navigation menu" className="header-menu-button text-white"><X size={23} /></button></div>
        <nav className="mobile-menu__nav" aria-label="Mobile navigation">
          {nav.map((item, index) => item.action ? <button key={item.label} type="button" onClick={() => { closeMenu(); item.action?.(); }} tabIndex={menuOpen ? 0 : -1} className="mobile-menu-link" style={{ transitionDelay: `${80 + index * 55}ms` }}><span>{String(index + 1).padStart(2, "0")}</span>{item.label}</button> : <a key={item.label} href={item.href} download={item.download} onClick={closeMenu} tabIndex={menuOpen ? 0 : -1} className="mobile-menu-link" style={{ transitionDelay: `${80 + index * 55}ms` }}><span>{String(index + 1).padStart(2, "0")}</span>{item.label}</a>)}
        </nav>
        <div className="mobile-menu__footer">
          <button type="button" onClick={() => { closeMenu(); setOpen(true); }} tabIndex={menuOpen ? 0 : -1} className="mobile-menu__requirement"><ClipboardList size={18} /> My Requirement <strong>{items.length}</strong></button>
          <button type="button" onClick={() => { closeMenu(); setQuoteOpen(true); }} tabIndex={menuOpen ? 0 : -1} className="btn-primary w-full justify-center">Request a Quote</button>
        </div>
      </div>
    </div>
  );

  return <header className={`site-header fixed inset-x-0 top-0 ${scrolled ? "site-header--scrolled" : ""}`}>
    <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-5 px-5 sm:h-[76px] sm:px-7 lg:px-10">
      <Link href="/" className="flex shrink-0 items-center" aria-label="M.A.S. Traders home"><img src={logoUrl} alt="M.A.S. Traders" className="h-10 w-10 object-cover rounded-full sm:h-11 sm:w-11 shadow-sm" /></Link>
      <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary navigation">
        {nav.map((item) => item.action ? <button key={item.label} type="button" onClick={item.action} className="header-nav-link">{item.label}</button> : <a key={item.label} href={item.href} download={item.download} className="header-nav-link">{item.label}</a>)}
      </nav>
      <div className="hidden items-center gap-3 lg:flex">
        <a href={business.phoneHref} aria-label="Call M.A.S. Traders" className="header-icon-link"><Phone size={17} /></a>
        <a href={business.emailHref} aria-label="Email M.A.S. Traders" className="header-icon-link"><Mail size={17} /></a>
        <button type="button" onClick={() => setOpen(true)} className="header-requirement">My Requirement <span>{items.length}</span></button>
        <button type="button" onClick={() => setQuoteOpen(true)} className="btn-primary">Request a Quote</button>
      </div>
      <div className="flex items-center gap-1.5 lg:hidden">
        <button type="button" onClick={() => setOpen(true)} aria-label={`Open My Requirement with ${items.length} selected item${items.length === 1 ? "" : "s"}`} className="header-mobile-requirement"><ClipboardList size={20} /><span>{items.length}</span></button>
        <button ref={menuTriggerRef} type="button" onClick={() => setMenuOpen(true)} aria-expanded={menuOpen} aria-controls="mobile-site-menu" aria-label="Open navigation menu" className="header-menu-button"><Menu size={22} /></button>
      </div>
    </div>
    {typeof document !== "undefined" ? createPortal(mobileMenu, document.body) : null}
  </header>;
}

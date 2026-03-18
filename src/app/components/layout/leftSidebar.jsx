import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { getComponentsByCategory } from "../../../library/data/componentsMetadata.js";
import { X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion.jsx";

/* ═══════════════════════════════════════════════════════
   Constants
   ═══════════════════════════════════════════════════════ */

const DISABLED_COMPONENTS = ["shape-blur", "magnet-lines", "text-cursor"];

/** Category configuration for accordion sections */
const CATEGORY_CONFIG = [
  { key: "text", label: "Text Components", accordionValue: "item-1" },
  { key: "effect", label: "Effect Components", accordionValue: "item-2" },
  { key: "button", label: "Button Components", accordionValue: "item-3" },
];

/** Static (non-component) navigation pages */
const STATIC_PAGES = [
  {
    name: "Components",
    category: "Get Started",
    path: "/components",
    icon: "hand",
  },
  {
    name: "Installation",
    category: "Get Started",
    path: "/installation",
    icon: "code",
  },
  { name: "Support", category: "Help", path: "/support", icon: "question" },
  { name: "FAQ", category: "Help", path: "/faq", icon: "message" },
];

/* ═══════════════════════════════════════════════════════
   useDebounce Hook
   ═══════════════════════════════════════════════════════ */

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

/* ═══════════════════════════════════════════════════════
   Sidebar Component
   ═══════════════════════════════════════════════════════ */

const Sidebar = ({ showBackLink = false, variant = "default", onNavigate }) => {
  const location = useLocation();
  const isMobile = variant === "mobile";

  /* ─── State ─── */
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  /* ─── Refs ─── */
  const searchInputRef = useRef(null);
  const overlayRef = useRef(null);

  /* ─── Debounced query (300ms) ─── */
  const debouncedQuery = useDebounce(searchQuery, 300);

  /* ─── Component data ─── */
  const componentsByCategory = getComponentsByCategory();

  const filteredCategories = useMemo(() => {
    return CATEGORY_CONFIG.map((config) => ({
      ...config,
      components: (componentsByCategory[config.key] || []).filter(
        (c) => !DISABLED_COMPONENTS.includes(c.key),
      ),
    }));
  }, [componentsByCategory]);

  /* ═══════════════════════════════════════════════════════
     navigationData — unified searchable array
     Properti: name, category, path, isNew (opsional)
     ═══════════════════════════════════════════════════════ */

  const navigationData = useMemo(() => {
    const items = STATIC_PAGES.map((page) => ({
      name: page.name,
      category: page.category,
      path: page.path,
    }));

    filteredCategories.forEach(({ label, components }) => {
      components.forEach((component) => {
        items.push({
          name: component.name,
          category: label,
          path: `/components/${component.key}`,
          isNew: component.newComponent || false,
        });
      });
    });

    return items;
  }, [filteredCategories]);

  /* ═══════════════════════════════════════════════════════
     Search Logic — case-insensitive, matches name + category
     ═══════════════════════════════════════════════════════ */

  const filteredResults = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    const q = debouncedQuery.toLowerCase().trim();
    return navigationData.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q),
    );
  }, [debouncedQuery, navigationData]);

  /** Group results by category for sectioned display */
  const groupedResults = useMemo(() => {
    const groups = {};
    filteredResults.forEach((item) => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [filteredResults]);

  /** Overlay shows when input focused OR query present */
  const isSearchActive = isSearchFocused || searchQuery.length > 0;

  /* ═══════════════════════════════════════════════════════
     Event Handlers
     ═══════════════════════════════════════════════════════ */

  /** Escape key — clear search & close overlay */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isSearchActive) {
        setSearchQuery("");
        setIsSearchFocused(false);
        searchInputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSearchActive]);

  /** Click outside search area — close overlay */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isSearchActive &&
        overlayRef.current &&
        !overlayRef.current.contains(e.target) &&
        searchInputRef.current &&
        !searchInputRef.current.parentElement.parentElement.contains(e.target)
      ) {
        setSearchQuery("");
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchActive]);

  /** Navigate to result — reset search state */
  const handleResultClick = useCallback(() => {
    setSearchQuery("");
    setIsSearchFocused(false);
    onNavigate?.();
  }, [onNavigate]);

  /* ═══════════════════════════════════════════════════════
     URL Helpers
     ═══════════════════════════════════════════════════════ */

  const getCurrentComponentName = () => {
    const pathParts = location.pathname.split("/");
    if (pathParts.length >= 3 && pathParts[1] === "components") {
      return pathParts[2];
    }
    return null;
  };

  const currentComponentName = getCurrentComponentName();
  const currentLink = location.pathname;

  /** Render component name with optional "New" badge */
  const renderComponentLabel = (component, isActive) => (
    <span className="flex w-full items-center gap-2">
      <span>{component.name}</span>
      {component.newComponent && (
        <span
          className={`rounded px-[0.3125rem] py-0 text-[9px] font-bold uppercase text-foreground flex items-center justify-center bg-primary`}
        >
          New
        </span>
      )}
    </span>
  );

  /* ═══════════════════════════════════════════════════════
     Render
     ═══════════════════════════════════════════════════════ */

  const Tag = isMobile ? "div" : "aside";

  return (
    <Tag
      className={
        isMobile
          ? `w-full relative ${isSearchActive ? "search-active" : ""}`
          : `hidden lg:block w-full relative lg:max-w-[300px] lg:min-w-[300px] bg-background border-r border-foreground/10 lg:overflow-y-auto lg:sticky lg:top-18 lg:self-start h-auto lg:h-[calc(100vh-4.5rem)] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-muted [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-background hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30 ${isSearchActive ? "search-active" : ""}`
      }
    >
      <div
        className={
          isMobile
            ? "flex flex-col flex-grow gap-4 px-4 pb-4"
            : "flex flex-col flex-grow gap-0 p-4 sm:p-6 sm:pb-4 lg:h-[calc(100vh-4.5rem)]"
        }
      >
        {/* ── Search Bar (Enhanced) ── */}
        <div className="relative z-40">
          <div
            className={`w-full flex items-center justify-start rounded transition-all duration-200 ${
              isSearchFocused
                ? "bg-foreground/15 ring-1 ring-foreground"
                : "bg-foreground/10"
            }`}
          >
            <div className="flex flex-col items-center justify-center w-11 h-11">
              <FontAwesomeIcon
                icon={["far", "search"]}
                className="w-4 h-4 transition-colors text-textLow"
              />
            </div>

            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              className="w-full bg-transparent text-foreground placeholder:text-textLow outline-none"
            />

            {/* Clear button (visible when query exists) */}
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  searchInputRef.current?.focus();
                }}
                className="flex items-center justify-center w-11 h-11 text-textLow hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ── Content Area Wrapper (relative for overlay positioning) ── */}
        <div
          className={`relative lg:flex-grow min-h-0 flex flex-col overflow-hidden ${
            isSearchActive ? "min-h-[50vh] lg:min-h-0" : ""
          }`}
        >
          {/* ── Search Results Overlay ── */}
          <div
            ref={overlayRef}
            className={`
              absolute inset-0 z-30 bg-background overflow-y-auto
              transition-all duration-200 ease-in-out
              [&::-webkit-scrollbar]:w-1.5
              [&::-webkit-scrollbar-track]:bg-transparent
              [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20
              [&::-webkit-scrollbar-thumb]:rounded-full
              ${
                isSearchActive
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-1 pointer-events-none"
              }
            `}
          >
            <div className="py-4">
              {debouncedQuery.trim() === "" ? (
                /* ── Hint state ── */
                <div className="flex flex-col items-center justify-center py-16 text-textLow select-none">
                  <FontAwesomeIcon
                    icon={["far", "search"]}
                    className="w-6 h-6 mb-3 opacity-20"
                  />
                  <p className="text-sm opacity-60">
                    Type to search components...
                  </p>
                  <p className="text-xs opacity-40 mt-2">
                    Press{" "}
                    <kbd className="px-1.5 py-0.5 bg-foreground/5 border border-foreground/10 rounded text-[10px] font-mono">
                      Esc
                    </kbd>{" "}
                    to close
                  </p>
                </div>
              ) : filteredResults.length === 0 ? (
                /* ── Empty state ── */
                <div className="flex flex-col items-center justify-center py-16 text-textLow select-none">
                  <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center mb-3">
                    <FontAwesomeIcon
                      icon={["far", "search"]}
                      className="w-4 h-4 opacity-40"
                    />
                  </div>
                  <p className="text-sm font-medium text-foreground/60">
                    No results found
                  </p>
                  <p className="text-xs opacity-40 mt-1">
                    No match for &ldquo;{debouncedQuery}&rdquo;
                  </p>
                </div>
              ) : (
                /* ── Grouped results ── */
                <div className="flex flex-col">
                  {/* Result count footer */}
                  <p className="text-link font-medium text-textLow mb-4">
                    {filteredResults.length} result
                    {filteredResults.length !== 1 ? "s" : ""} found
                  </p>

                  {Object.entries(groupedResults).map(([category, items]) => (
                    <div key={category}>
                      <ul className="list-none flex flex-col gap-0.5">
                        {items.map((item) => {
                          const slug = item.path.split("/").pop();
                          const isActive =
                            currentLink === item.path ||
                            currentComponentName === slug;
                          return (
                            <li key={item.path}>
                              <Link
                                to={item.path}
                                onClick={handleResultClick}
                                className={`
                                  flex items-center gap-2 py-3.5 px-3.5 rounded text-link
                                  transition-all duration-150
                                  ${
                                    isActive
                                      ? "bg-primary/10 text-primary font-semibold"
                                      : "text-foreground font-medium hover:bg-foreground/5 hover:text-foreground hover:font-semibold"
                                  }
                                `}
                              >
                                <span className="truncate">{item.name}</span>
                                {item.isNew && (
                                  <span className="rounded px-[0.3125rem] h-[1.125rem] inter-semi-12 uppercase text-foreground bg-base-medium">
                                    New
                                  </span>
                                )}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Sidebar Navigation Content ── */}
          <div className="flex flex-col flex-grow overflow-scroll">
            <div className="sidebar-section flex flex-col mb-1 pt-4 px-4">
              <ul className="list-none flex flex-col">
                <li>
                  <Link
                    to="/installation"
                    onClick={() => onNavigate?.()}
                    className={`flex gap-2 py-3 items-center justify-start ${
                      currentLink !== "/installation"
                        ? "text-link font-medium text-foreground/60 hover:text-foreground"
                        : "text-link font-semibold text-foreground"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={["far", "code"]}
                      className="w-4 h-4"
                    />
                    Installation
                  </Link>
                </li>

                <li>
                  <Link
                    to="/components"
                    onClick={() => onNavigate?.()}
                    className={`flex gap-2 py-3 items-center justify-start ${
                      currentLink !== "/components"
                        ? "text-link font-medium text-foreground/60 hover:text-foreground"
                        : "text-link font-semibold text-foreground"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={["far", "cube"]}
                      className="w-4 h-4"
                    />
                    Components
                  </Link>
                </li>
              </ul>
            </div>

            <div
              id="componentList"
              className="sidebar-section relative z-[1] flex flex-col px-4"
            >
              <div className="flex flex-col">
                <Accordion type="single" collapsible defaultValue="item-1">
                  {filteredCategories.map(
                    ({ label, components, accordionValue }) => (
                      <AccordionItem
                        key={accordionValue}
                        value={accordionValue}
                      >
                        <AccordionTrigger>
                          <p className="text-xs uppercase tracking-tight text-textLow font-medium">
                            {label}{" "}
                            <span className="opacity-80">
                              • {components.length}
                            </span>
                          </p>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-none">
                            {components.map((component) => (
                              <li
                                key={component.key}
                                className={`border-l pl-3 py-2 transition-all duration-200 ${currentComponentName === component.key ? "border-primary" : "border-foreground/20"}`}
                              >
                                <Link
                                  to={`/components/${component.key}`}
                                  onClick={() => onNavigate?.()}
                                  className={` transition-all duration-200 ${
                                    currentComponentName !== component.key
                                      ? "link font-medium text-textLow hover:text-foreground"
                                      : "link font-semibold text-foreground"
                                  }`}
                                >
                                  {renderComponentLabel(
                                    component,
                                    currentComponentName === component.key,
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ),
                  )}
                </Accordion>
              </div>
            </div>

            <div className="sticky bottom-0 z-[2]">
              <div className="sidebar-section px-4 bg-background">
                <ul className="list-none">
                  <li>
                    <Link
                      to="/support"
                      onClick={() => onNavigate?.()}
                      className={`flex gap-2 py-3 items-center justify-start ${
                        currentLink !== "/support"
                          ? "text-link font-medium text-foreground/60 hover:text-foreground"
                          : "text-link font-semibold text-foreground"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={["far", "question"]}
                        className="w-4 h-4"
                      />
                      Support
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/faq"
                      onClick={() => onNavigate?.()}
                      className={`flex gap-2 py-3 items-center justify-start ${
                        currentLink !== "/faq"
                          ? "text-link font-medium text-foreground/60 hover:text-foreground"
                          : "text-link font-semibold text-foreground"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={["far", "message"]}
                        className="w-4 h-4"
                      />
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Tag>
  );
};

export default Sidebar;

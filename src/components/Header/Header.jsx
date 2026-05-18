import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Logo, LogoutBtn } from "../index";
import { useTheme } from "../../context/ThemeContext";

const Header = React.memo(() => {
  const authStatus = useSelector((state) => state.auth.status);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: "Home", slug: "/", show: true },
    { name: "Login", slug: "/login", show: !authStatus },
    { name: "Signup", slug: "/signup", show: !authStatus },
    { name: "All Posts", slug: "/all-posts", show: authStatus },
    { name: "Add Post", slug: "/add-post", show: authStatus },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-200">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" aria-label="Home">
            <Logo width="70px" />
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:block" aria-label="Main navigation">
            <ul className="flex items-center space-x-2">
              {navItems.map(
                (item) =>
                  item.show && (
                    <li key={item.name}>
                      <NavLink
                        to={item.slug}
                        className={({ isActive }) =>
                          `px-5 py-2 rounded-full text-sm font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            isActive
                              ? "bg-blue-600 text-white"
                              : "text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-800"
                          }`
                        }
                        aria-current={({ isActive }) => (isActive ? "page" : undefined)}
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  )
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </nav>

          {/* Right side buttons: theme toggle + mobile menu */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle dark mode"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <ul className="flex flex-col space-y-2">
              {navItems.map(
                (item) =>
                  item.show && (
                    <li key={item.name}>
                      <NavLink
                        to={item.slug}
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }) =>
                          `block px-4 py-2 rounded-lg text-sm font-medium transition ${
                            isActive
                              ? "bg-blue-600 text-white"
                              : "text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-800"
                          }`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  )
              )}
              {authStatus && (
                <li className="px-4">
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
});

export default Header;
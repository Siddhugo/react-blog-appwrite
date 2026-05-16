import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Logo, LogoutBtn } from "../index";
// import { selectIsAuthenticated } from "../../store/authSlice"; // if you have selector

const Header = React.memo(() => {
  // Use the selector from authSlice if exported, else direct access
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = useMemo(
    () => [
      { name: "Home", slug: "/", show: true },
      { name: "Login", slug: "/login", show: !authStatus },
      { name: "Signup", slug: "/signup", show: !authStatus },
      { name: "All Posts", slug: "/all-posts", show: authStatus },
      { name: "Add Post", slug: "/add-post", show: authStatus },
    ],
    [authStatus]
  );

  return (
    <header className="bg-white shadow-md border-b" role="banner">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div>
            <NavLink to="/" aria-label="Home">
              <Logo width="70px" />
            </NavLink>
          </div>

          {/* Navigation */}
          <nav aria-label="Main navigation">
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
                              : "text-gray-700 hover:bg-blue-100"
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
        </div>
      </Container>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
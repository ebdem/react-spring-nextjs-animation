import React from "react";
import { animated } from "react-spring";
import { parseCookies, setCookie } from "nookies";
import { useAnimation } from "../useAnimation";
import "../styles.css";

const COOKIE_KEY = "isSidebarOpen";

function useSidebar(initialIsOpen) {
  const [isOpen, setIsOpen] = React.useState(initialIsOpen);
  const toggle = () => setIsOpen(value => !value);

  // Persist to cookies
  React.useEffect(() => {
    setCookie({}, COOKIE_KEY, JSON.stringify(isOpen), {});
  }, [isOpen]);

  return { isOpen, toggle };
}

function IndexPage({ isSidebarOpen }) {
  const { isOpen, toggle } = useSidebar(isSidebarOpen);
  const styles = useAnimation(isOpen);

  return (
    <div className="app">
      <animated.div className="sidebar" style={styles.sidebar}>
        Sidebar
      </animated.div>
      <animated.div className="main" style={styles.main}>
        <button className="btn" onClick={toggle}>
          Toggle
        </button>
      </animated.div>
    </div>
  );
}

IndexPage.getInitialProps = async ctx => {
  const cookies = parseCookies(ctx);
  const sidebarState = cookies[COOKIE_KEY];
  const isSidebarOpen = sidebarState ? sidebarState === "true" : true;
  return { isSidebarOpen };
};

export default IndexPage;

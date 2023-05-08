import useAuthContext from "../../hooks/useAuthContext";
import { Link, useLocation } from "react-router-dom";
import SCNavbar from "./Navbar.styled";
import useLogout from "../../hooks/useLogout";
import { useState } from "react";
import useTagContext from "../../hooks/useTagContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faGear,
  faPlus,
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const log_out = useLogout();
  const { user } = useAuthContext();
  const { tags } = useTagContext();
  const { pathname } = useLocation();
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [tagsOpen, setTagsOpen] = useState(false);
  const reg = /^\/home\/\d+$/;
  const isHome = reg.test(pathname);

  function handle_tag_controls() {
    setSideBarOpen(false);
    setTagsOpen((prev) => !prev);
  }

  function handle_sidebar_controls() {
    setTagsOpen(false);
    setSideBarOpen((prev) => !prev);
  }

  return (
    <SCNavbar>
      <section className={`top-section ${sideBarOpen ? "open" : ""}`}>
        <button className="sidebar-control" onClick={handle_sidebar_controls}>
          hi
        </button>
        <Link to="/home/1">
          <FontAwesomeIcon icon={faHouse} />
          <span>Home</span>
        </Link>
        {user ? (
          <div className="links">
            <Link to="/settings">
              {" "}
              <FontAwesomeIcon icon={faGear} />
              <span>Settings</span>
            </Link>
            <Link to="/new-counter">
              <FontAwesomeIcon icon={faPlus} />
              <span>New Counter</span>
            </Link>
            <button onClick={() => log_out()}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              <span>Log out</span>
            </button>
          </div>
        ) : (
          <div className="links">
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign up</Link>
          </div>
        )}
      </section>
      {user && isHome ? (
        <section className={`tags-section ${tagsOpen ? "open" : "closed"}`}>
          <div className="tags">
            {tags.map((tag) => (
              <span key={tag.name}>
                <button>x</button>
                {tag.name}
              </span>
            ))}
          </div>
          <button className="tags-control" onClick={handle_tag_controls}>
            #hi
          </button>
        </section>
      ) : null}
    </SCNavbar>
  );
}

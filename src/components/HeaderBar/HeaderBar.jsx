import styles from "./HeaderBar.module.css";
import homeicon from "../../assets/SVGs/home-pixelated.svg";
import yellowbell from "../../assets/SVGs/yellowbell.png";
import animatedmessage from "../../assets/SVGs/msgicon.png";
import purplemenu4 from "../../assets/SVGs/purplemenu1.png";
import home from "../../assets/SVGs/purplemenu8.png";

import cloud9 from "../../assets/SVGs/cloud9purple.png";
import Badge from "@mui/material/Badge";
import addIcon from "../../assets/lottie/addd2.svg";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { AuthContext } from "../../Authentication/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
export const HeaderBar = ({ setShowModal }) => {
  const testing = () => {
    console.log("testing... testing...");
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [error, setError] = useState("");
  const [showMenu, setshowMenu] = useState(false);

  async function handlelogOut() {
    setError("");
    try {
      console.log("signout is yet to be implemented");
      window.localStorage.clear();
      authContext.authUserData = null;
      dispatch(logout());
    } catch {
      setError("Failed to Log Out");
    }
  }

  const menuId = "menuList";

  return (
    <>
      <div className={styles.layout}>
        <div className={styles.one}>
          <div className={styles.topText}>
            <div className={styles.shape}> </div> Cloud9
          </div>
        </div>
        <div className={styles.newPost} onClick={() => setShowModal(true)}>
          <img className={styles.newPostBtn} src={addIcon} alt="" />
          <span>New post</span>
        </div>
        <div className={styles.two}>{/* empty space */}</div>
        <div className={styles.three}>
          <Badge size="sm" className={styles.badge} badgeContent={4}>
            {" "}
            <div
              className={styles.messagebutton}
              role="button"
              onClick={testing}
            >
              <img src={animatedmessage} alt="" />
            </div>
          </Badge>
          <Badge className={styles.badge} badgeContent={40}>
            <div
              className={styles.messagebutton}
              role="button"
              onClick={testing}
            >
              <img src={yellowbell} alt="" />
            </div>
          </Badge>

          {/* <div
            className={styles.menuList}
            role="button"
            // onClick={showMenuOptions}
          >
            <img
              onClick={() => setshowMenu((x) => !x)}
              src={purplemenu4}
              alt=""
            />
            <div
              className={`${styles.options} ${!showMenu ? styles.hide : ""}`}
            >
              <Link className={styles.settings} to="/settings">
                Settings
              </Link>
              <div className={styles.logout} onClick={handlelogOut}>
                Log Out
              </div>
            </div>
          </div> */}
        </div>
        <div
          className={styles.menuList}
          role="button"
          // onClick={showMenuOptions}
        >
          <img
            onClick={() => setshowMenu((x) => !x)}
            src={purplemenu4}
            alt=""
          />
          <div
            style={{ zIndex: "10" }}
            className={`${styles.options} ${!showMenu ? styles.hide : ""}`}
          >
            <Link className={styles.settings} to="/settings">
              Settings
            </Link>
            <div className={styles.logout} onClick={handlelogOut}>
              Log Out
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

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
export const HeaderBar = () => {
  const testing = () => {
    console.log("testing... testing...");
  };
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const showMenuOptions = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const hideMenuOptions = () => {
    setAnchorEl(null);
    navigate("/settings");
  };
  const authContext = useContext(AuthContext);

  const [error, setError] = useState("");

  async function handlelogOut() {
    setError("");
    try {
      console.log("signout is yet to be implemented");
      window.localStorage.clear();
      navigate("/login");
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
          <img src={home} alt="" />
          <input placeholder="# Explore" />
          <img className={styles.newPostBtn} src={addIcon} alt="" />
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

          <div
            id={menuId}
            className={styles.menuList}
            role="button"
            onClick={showMenuOptions}
          >
            <img src={purplemenu4} alt="" />
          </div>
          <Menu
            id={menuId}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={hideMenuOptions}
            // anchorOrigin={{
            //   vertical: "top",
            //   horizontal: "right",
            // }}
            // transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={hideMenuOptions}>
              <Link className={styles.settings} to="/settings">
                settings
              </Link>
            </MenuItem>
            <MenuItem onClick={handlelogOut}>log out</MenuItem>
          </Menu>
        </div>
      </div>
    </>
  );
};

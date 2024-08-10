import React, { useEffect, useState } from "react";
import { MdHome } from "react-icons/md";
import {
  CreatePostLogo,
  InstagramLogo,
  InstagramMobileLogo,
  NotificationsLogo,
  SearchLogo,
} from "../../../assets/constants";
import Profile_pic from "../../../assets/profile_pic";
import "./sidebar.css";
import { useNavigate } from "react-router-dom";
import PostUpload from "../PostUpload/PostUpload";

const Sidebar = () => {
  const [name, setname] = useState("");
  const [upload, setupload] = useState([]);
  useEffect(() => {
    const getdata = () => {
      let obj = JSON.parse(localStorage.getItem("user-Info"));
      setname(obj ? obj.username : null);
    };
    getdata();
    // return () => {
    //   window.removeEventListener("storage", getdata);
    // };
  }, []);
  const onclose = () => {
    setupload([]);
    closeModal();
    window.location.reload();
  };
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isModalOpen]);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    // <div>
    <div>
      <div className="instalogo">
        <InstagramLogo />
      </div>
      <div className="sidebar_container">
        <div className="instatext">
          <InstagramLogo />
        </div>
        <div className="instatext_pc">
          <InstagramMobileLogo />
        </div>
        {/* <div className="instalogo">
        <InstagramMobileLogo />
      </div> */}
        <ul>
          <li>
            <a onClick={() => navigate("/")}>
              <MdHome color="white" size={30} />
              <span className="tooltiptext">Home</span>
              <div className="lielement">Home</div>
            </a>
          </li>
          <li>
            <a>
              <SearchLogo />
              <span className="tooltiptext">Search</span>
              <div className="lielement">Search</div>
            </a>
          </li>
          <li>
            <a>
              {" "}
              <NotificationsLogo />
              <span className="tooltiptext">Notification</span>
              <div className="lielement">Notification</div>
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                openModal();
                setupload(
                  <>
                    <PostUpload close={onclose} />
                  </>
                );
              }}
            >
              <CreatePostLogo />
              <span className="tooltiptext">Create</span>
              <div className="lielement">Create</div>
            </a>
          </li>
          <li>
            <a
              className="profilepic_cont"
              onClick={() => {
                navigate(`${name}`);
                window.location.reload();
              }}
            >
              <Profile_pic
                classname="profilepic"
                url={`${
                  JSON.parse(localStorage.getItem("user-Info"))
                    ? JSON.parse(localStorage.getItem("user-Info"))
                        .profilepicurl
                    : ""
                }`}
                altername=""
              />
              {/* <img className="profilepic" src="/profilepic.png" alt="" /> */}
              <span className="tooltiptext">Profile</span>
              <div className="lielement">Profile</div>
            </a>
          </li>
        </ul>
        {/* </div> */}
      </div>
      {upload}
    </div>
  );
};

export default Sidebar;

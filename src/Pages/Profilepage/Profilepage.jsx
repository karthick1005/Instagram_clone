import React, { useEffect, useState } from "react";
import "./Profilepage.css";
import { IoSettingsOutline } from "react-icons/io5";
import Story from "../Component/Story/Story";
import { FaRegBookmark } from "react-icons/fa6";
import { MdGridOn } from "react-icons/md";
import { IoPerson } from "react-icons/io5";

import { IoMdClose } from "react-icons/io";
import Post_open from "./Post_open/Post_open";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getdata, getimagedata } from "../../Hooks/Usesignupandpass";
import Imagecontainer from "./Imagecontainer";
import { Updatefollowers } from "../../Hooks/updatelike";
import EditProfile from "../Component/EditProfile/EditProfile";
const Profilepage = () => {
  const navigate = useNavigate();
  const [additem, setadditem] = useState([]);
  const [editprof, seteditprof] = useState([]);
  const [postimage, setpost] = useState([
    "https://firebasestorage.googleapis.com/v0/b/instagramclone-78258.appspot.com/o/img1.png?alt=media&token=1a6dac25-dde6-4699-bfcf-648d5951c15e",
    // "/img2.png",
    // "/img3.png",
    // "/img4.png",
    // "/img1.png",
    // "/img2.png",
    // "/img3.png",
    // "/img4.png",
  ]);
  const { username } = useParams();
  const [tab, settab] = useState(0);
  const [datas, setdata] = useState(null);
  const [saved, setsaved] = useState([]);
  const [userdata, setuserdata] = useState(
    JSON.parse(localStorage.getItem("user-Info"))
  );
  const closeoverlay = () => {
    setadditem([]);
    closeModal();
    history.pushState({}, "", `/${datas.username}`);
  };
  // const history = useHistory();
  const add = (value) => {
    // console.log(value);
    // const arr = [value];
    openModal();
    setadditem(
      <>
        {history.pushState({}, "", `/p/${value}`)}
        <Post_open val={value} />
        <div className=" closebutton_cont">
          <IoMdClose size={24} className="closebutton" onClick={closeoverlay} />
        </div>
      </>
    );
  };
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
  useEffect(() => {
    document.title = username;
    const fetch = async () => {
      let data = await getdata(username);

      setdata(data);
      setpost(data.posts);
      setsaved(data.saved);
    };
    fetch();
  }, []);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const follow = async () => {
    let res = await Updatefollowers(
      JSON.parse(localStorage.getItem("user-Info")).uid,
      datas.uid,
      true
    );
    let obj = JSON.parse(localStorage.getItem("user-Info"));
    obj.following.push(datas.uid);
    localStorage.setItem("user-Info", JSON.stringify(obj));
    setdata((prevdata) => ({
      ...prevdata,
      follower: [
        ...prevdata.follower,
        JSON.parse(localStorage.getItem("user-Info")).uid,
      ],
    }));
    console.log(userdata);
  };
  const openprof = () => {
    seteditprof(
      <>
        <EditProfile close={closeedit} />
      </>
    );
  };
  const closeedit = () => {
    seteditprof([]);
  };
  const unfollowuser = async () => {
    let res = Updatefollowers(
      JSON.parse(localStorage.getItem("user-Info")).uid,
      datas.uid,
      false
    );
    const updatedFollowing = datas.follower.filter(
      (id) => id !== JSON.parse(localStorage.getItem("user-Info")).uid
    );
    const updatedUser = { ...datas, follower: updatedFollowing };
    setdata(updatedUser);
  };
  if (datas === null) return <div>404</div>;
  return (
    <div>
      {editprof}

      <div
        className={
          additem.length === 0 ? "Profilepage_cont" : "Profilepage_cont_active"
        }
      >
        {/* <Post_open /> */}

        <div className="profilepage_top">
          <div className="Profilepic_pic">
            <img src={datas.profilepicurl} alt="" />
          </div>
          <section>
            <div className="Infosection">
              <div className="_top_title">
                <h1>{username}</h1>
                {username ===
                JSON.parse(localStorage.getItem("user-Info")).username ? (
                  <div className="_top_title_btn">
                    <button onClick={() => openprof()}>Edit Profile</button>
                    <button>View archive</button>
                    <a>
                      <IoSettingsOutline size={24} />
                    </a>
                  </div>
                ) : (
                  <div>
                    {!datas.follower.includes(userdata.uid) ? (
                      <div className="_top_title_btn">
                        <button onClick={follow}>Follow</button>
                      </div>
                    ) : (
                      <div className="_top_title_btn">
                        <button onClick={unfollowuser}>Unfollow</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="following_info">
                <p>{datas.posts.length} posts</p>
                <p>{datas.follower.length} followers</p>
                <p>{datas.following.length} following</p>
              </div>
              <div className="username_caption">
                {console.log(typeof datas.bio)}
                {datas.bio
                  .replace(/\\n/g, "\n")
                  .split("\n")
                  .map((value, index) => (
                    <React.Fragment key={index}>
                      <span>{value}</span>
                      {/* <br /> */}
                    </React.Fragment>
                  ))}
              </div>
            </div>
          </section>
        </div>
        <div className="Highlights_cont">
          <Story type={"Hightlight"} />
        </div>

        <div className="Profile_bottom_container">
          <div className="Profile_bottom_btn">
            <button
              className={tab === 0 ? "active" : ""}
              onClick={() => settab(0)}
            >
              <MdGridOn size={14} />
              Posts
            </button>
            {datas.uid === JSON.parse(localStorage.getItem("user-Info")).uid ? (
              <button
                className={tab === 1 ? "active" : ""}
                onClick={() => settab(1)}
              >
                <FaRegBookmark size={14} />
                Saved
              </button>
            ) : (
              <></>
            )}
            <button
              className={tab === 2 ? "active" : ""}
              onClick={() => settab(2)}
            >
              <IoPerson size={14} />
              Tagged
            </button>
          </div>
        </div>
        <div className="Profile_post_container">
          {/* <div className="Profile_post_row_image">
          <div className="profile_post_hover_container">
            <div className="profile_post_hover_elements_cont">
              <span className="profile_post_hover_elements">
                <UnlikeLogo className="profile_post_hover_elements_ico" />
                11.4k
              </span>
              <span className="profile_post_hover_elements">
                <CommentLogo className="profile_post_hover_elements_ico" />
                11.4k
              </span>
            </div>
          </div>

          <img src="/img1.png" alt="" />
        </div> */}

          {tab === 0 &&
            postimage.map((value) => {
              console.log(value);
              return (
                <div
                  className="Profile_post_row_image"
                  onClick={() => add(value)}
                >
                  <Imagecontainer id={value} />
                  {/* <img src={getimagedata(value)} alt="" /> */}
                </div>
              );
            })}
          {tab === 1 &&
            saved.map((value) => {
              return (
                <div
                  className="Profile_post_row_image"
                  onClick={() => add(value)}
                >
                  <Imagecontainer id={value} />
                  {/* <img src={getimagedata(value)} alt="" /> */}
                </div>
              );
            })}
        </div>
        {additem}
      </div>
    </div>
  );
};

export default Profilepage;

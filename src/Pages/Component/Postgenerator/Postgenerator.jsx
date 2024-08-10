import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../Sidebar/sidebar";
import "./Postgenerator.css";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { CommentLogo, UnlikeLogo } from "../../../assets/constants";
import { BsSend } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa6";
import Post from "./Post/Post";
import { getimagedata, updatesaved } from "../../../Hooks/Usesignupandpass";
import { Updatelikes } from "../../../Hooks/updatelike";
import { useNavigate } from "react-router-dom";
import { addnewcomment, getcommentswithid } from "../../../Hooks/comments";
import { FaBookmark } from "react-icons/fa6";
const Postgenerator = ({ post, name, addfunc, image }) => {
  const photos = ["/img3.png", "/img1.png", "/img2.png"];
  const [slide, setslide] = useState(0);
  const [like, setlike] = useState(false);
  const navigate = useNavigate();
  const nextslide = () => {
    setslide(slide === photos.length - 1 ? 0 : slide + 1);
  };
  const prevslide = () => {
    setslide(slide === 0 ? photos.length - 1 : slide - 1);
  };
  const [data, setdata] = useState(null);
  const [comments, setcomments] = useState(null);
  const textarea_ref = useRef(null);
  useEffect(() => {
    getimage();
  }, []);
  const getimage = async () => {
    let datas = await getimagedata(post);
    console.log(datas);
    setdata(datas);
    let res = await getcommentswithid(post);
    console.log(res);
    setcomments(res.result);
  };
  const addlike = async () => {
    let val = JSON.parse(localStorage.getItem("user-Info"));
    let res = await Updatelikes(
      post,
      val.uid,
      !data.likes.includes(JSON.parse(localStorage.getItem("user-Info")).uid)
    );
    if (
      !data.likes.includes(JSON.parse(localStorage.getItem("user-Info")).uid)
    ) {
      setdata((prevdata) => ({
        ...prevdata,
        likes: [
          ...prevdata.likes,
          JSON.parse(localStorage.getItem("user-Info")).uid,
        ],
      }));
    } else {
      setdata((prevdata) => ({
        ...prevdata,
        likes: prevdata.likes.filter(
          (like) => like != JSON.parse(localStorage.getItem("user-Info")).uid
        ),
      }));
    }
    if (res) {
      getimage();
    }
  };
  const postcomment = async () => {
    console.log(textarea_ref.current.value);
    let res = await addnewcomment(
      post,
      JSON.parse(localStorage.getItem("user-Info")).uid,
      textarea_ref.current.value,
      JSON.parse(localStorage.getItem("user-Info")).username
    );
    if (res) {
      textarea_ref.current.value = "";
      let res = await getcommentswithid(post);
      console.log(res);
      setcomments(res.result);
    }
  };
  const addbookmark = async () => {
    let newSavedPosts;
    if (!JSON.parse(localStorage.getItem("user-Info")).saved.includes(post)) {
      let res = await updatesaved(
        JSON.parse(localStorage.getItem("user-Info")).uid,
        true,
        post
      );
      console.log(res);
      let obj = JSON.parse(localStorage.getItem("user-Info"));
      console.log(post);
      obj.saved.push(post);
      console.log(obj);
      newSavedPosts = [...savedPosts, post];
      localStorage.setItem("user-Info", JSON.stringify(obj));
    } else {
      await updatesaved(
        JSON.parse(localStorage.getItem("user-Info")).uid,
        false,
        post
      );
      let obj = JSON.parse(localStorage.getItem("user-Info"));
      obj.saved = obj.saved.filter((item) => item !== post);
      newSavedPosts = obj.saved;
      localStorage.setItem("user-Info", JSON.stringify(obj));
    }
    setSavedPosts(newSavedPosts);
  };
  const [savedPosts, setSavedPosts] = useState(
    JSON.parse(localStorage.getItem("user-Info")).saved || []
  );

  return (
    <div>
      {/* <Menucard /> */}
      {/* <div className="Homepage_Container"> */}
      {/* <Story /> */}
      {/* <Sidebar /> */}
      <div className="Post_container">
        <article className="Post_card">
          <div className="Post_card_title">
            <a>
              <img className="post_prof_pic" src={image} alt="" srcset="" />
            </a>
            <a onClick={() => navigate(`/${name}`)} className="post_card_name">
              {name}
            </a>
            <a>
              <IoEllipsisHorizontal size={20} />
            </a>
          </div>
          <div className="post_image_holder">
            <Post photos={data ? data.img : ""} />
          </div>

          <div className="like_section">
            <div className="like_btn" onClick={() => addlike()}>
              {/* {like ? <UnlikeLogo /> : <FaRegHeart size={24} color="white" />} */}
              {data &&
              data.likes.includes(
                JSON.parse(localStorage.getItem("user-Info")).uid
              ) ? (
                <UnlikeLogo size={24} />
              ) : (
                <FaRegHeart size={24} color="white" />
              )}
            </div>
            <div onClick={() => addfunc(post)}>
              <CommentLogo />
            </div>
            <div>
              <BsSend size={24} />
            </div>
            <div className="bookmark" onClick={() => addbookmark()}>
              {!savedPosts.includes(post) ? (
                <FaRegBookmark className="bookmark" size={24} />
              ) : (
                <FaBookmark className="bookmark" size={24} color="white" />
              )}
            </div>
          </div>
          <div className="like_section_number">
            <p>{data ? data.likes.length : 1} likes</p>
            {comments && comments.length >= 1 ? (
              <p>
                {comments[0].username} commented as {comments[0].comment}
              </p>
            ) : (
              <></>
            )}
          </div>
          <div className="view_comments_btn" onClick={() => addfunc(post)}>
            View all {comments && comments.length} comments
          </div>
          <div className="add_comments_cont">
            <textarea
              ref={textarea_ref}
              className="add_comments_text"
              id=""
              placeholder="Add a comment"
            ></textarea>
            <div onClick={() => postcomment()} className="add_comments_btn">
              Post
            </div>
          </div>
          <hr />
        </article>
      </div>
    </div>
    // </div>
  );
};

export default Postgenerator;

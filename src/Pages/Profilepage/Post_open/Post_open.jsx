import React, { useEffect, useRef, useState } from "react";
import "./Post_open.css";
import Post from "../../Component/Postgenerator/Post/Post";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { CommentLogo, UnlikeLogo } from "../../../assets/constants";
import { FaRegBookmark, FaRegHeart } from "react-icons/fa6";
import Comment from "../../Component/comment/Comment";
import {
  getdatawithuid,
  getimagedata,
  updatesaved,
} from "../../../Hooks/Usesignupandpass";
import { Updatelikes } from "../../../Hooks/updatelike";
import { useNavigate, useParams } from "react-router-dom";
import { addnewcomment, getcommentswithid } from "../../../Hooks/comments";
import { FaBookmark } from "react-icons/fa6";
import { removeposttodb } from "../../../Hooks/Post";
const Post_open = ({ val, image }) => {
  const [like, setlike] = useState(false);
  const textarea_ref = useRef(null);
  const navigate = useNavigate();
  const makefocus = () => {
    if (textarea_ref.current) {
      textarea_ref.current.focus();
    }
  };
  let { value } = useParams();
  if (val !== null && value == null) {
    value = val;
  }
  const [img, setimg] = useState(image);
  const [data, setdata] = useState(null);
  const [comments, setcomments] = useState(null);
  useEffect(() => {
    getimage();
    getcomments();
  }, []);
  const getimage = async () => {
    let datas = await getimagedata(value);
    console.log(datas);
    setdata(datas);
    getuser(datas.userid);
  };
  const getuser = async (uid) => {
    let data = await getdatawithuid(uid);
    console.log(data);
    setimg(data.profilepicurl);
  };
  const getcomments = async () => {
    let datas = await getcommentswithid(value);
    console.log(datas);
    setcomments(datas);
  };
  const addlike = async () => {
    let val = JSON.parse(localStorage.getItem("user-Info"));
    let res = await Updatelikes(
      value,
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
  const update = () => {
    // additem([]);
  };
  const postcomment = async () => {
    console.log(textarea_ref.current.value);
    let res = await addnewcomment(
      value,
      JSON.parse(localStorage.getItem("user-Info")).uid,
      textarea_ref.current.value,
      JSON.parse(localStorage.getItem("user-Info")).username,
      JSON.parse(localStorage.getItem("user-Info")).profilepicurl
    );
    if (res) {
      textarea_ref.current.value = "";
      getcomments();
    }
  };
  const addbookmark = async () => {
    let newSavedPosts;
    if (!JSON.parse(localStorage.getItem("user-Info")).saved.includes(value)) {
      let res = await updatesaved(
        JSON.parse(localStorage.getItem("user-Info")).uid,
        true,
        value
      );
      console.log(res);
      let obj = JSON.parse(localStorage.getItem("user-Info"));

      obj.saved.push(value);
      console.log(obj);
      newSavedPosts = [...savedPosts, value];
      localStorage.setItem("user-Info", JSON.stringify(obj));
    } else {
      await updatesaved(
        JSON.parse(localStorage.getItem("user-Info")).uid,
        false,
        value
      );
      let obj = JSON.parse(localStorage.getItem("user-Info"));
      obj.saved = obj.saved.filter((item) => item !== value);
      newSavedPosts = obj.saved;
      localStorage.setItem("user-Info", JSON.stringify(obj));
    }
    setSavedPosts(newSavedPosts);
  };
  const [savedPosts, setSavedPosts] = useState(
    JSON.parse(localStorage.getItem("user-Info")).saved || []
  );
  const deletepost = async () => {
    let res = await removeposttodb(
      value,
      JSON.parse(localStorage.getItem("user-Info")).uid,
      data.img
    );
    if (res) {
      navigate(`/${JSON.parse(localStorage.getItem("user-Info")).username}`);
      window.location.reload();
    }
  };
  const getdate = (time) => {
    let postDate = new Date(time.seconds * 1000);
    let currentDate = new Date();
    let differenceInTime = currentDate - postDate;
    let secondsAgo = Math.floor(differenceInTime / 1000);
    let minutesAgo = Math.floor(secondsAgo / 60);
    let hoursAgo = Math.floor(minutesAgo / 60);
    let daysAgo = Math.floor(hoursAgo / 24);
    let weeksAgo = Math.floor(daysAgo / 7);
    if (secondsAgo < 60) {
      return "Just now";
    } else if (minutesAgo < 60) {
      return `${minutesAgo} minute${minutesAgo !== 1 ? "s" : ""} ago`;
    } else if (hoursAgo < 24) {
      return `${hoursAgo} hour${hoursAgo !== 1 ? "s" : ""} ago`;
    } else if (daysAgo < 7) {
      return `${daysAgo} day${daysAgo !== 1 ? "s" : ""} ago`;
    } else if (weeksAgo < 4) {
      return `${weeksAgo} week${weeksAgo !== 1 ? "s" : ""} ago`;
    } else {
      // If it's more than 4 weeks, return the full date in a readable format
      return postDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
    // return 10;
  };
  return (
    <div className="Post_open_container" onClick={update}>
      <div className="Post_open_body">
        <div className="post_comment_topcont_mobile">
          <img src={img} alt="" />
          <div className="post_comment_topcnt_mobile_text">
            <span>{data && data.username}</span>
            <span>{data && data.caption}</span>
          </div>
          {data &&
          data.userid === JSON.parse(localStorage.getItem("user-Info")).uid ? (
            <a onClick={deletepost}>Delete</a>
          ) : null}
        </div>
        <div className="post_open_post">
          <Post photos={data ? data.img : null} />
        </div>
        <div className="Post_open_comments_cont">
          <div className="post_comment_topcont">
            <img src={img} alt="" />
            <div className="post_comment_topcnt_text">
              <span>{data && data.username}</span>
              <span>{data && data.caption}</span>
            </div>
            {data &&
            data.userid ===
              JSON.parse(localStorage.getItem("user-Info")).uid ? (
              <a onClick={deletepost}>Delete</a>
            ) : null}
          </div>
          <div className="Entire_post_comment_comment_cont">
            {comments &&
              comments.result.map((values, i) => {
                console.log(values);
                return (
                  <Comment
                    value={values}
                    commentid={comments.docsid[i]}
                    postid={value}
                  />
                );
              })}
            {/* <Comment />
            <Comment /> */}
          </div>
          <div className="Like_section_post">
            <div
              className="like_btn"
              onClick={() => {
                // setlike(!like);
                addlike();
              }}
            >
              {}
              {data &&
              data.likes.includes(
                JSON.parse(localStorage.getItem("user-Info")).uid
              ) ? (
                <UnlikeLogo size={24} />
              ) : (
                <FaRegHeart size={24} color="white" />
              )}
            </div>
            <div className="" onClick={makefocus}>
              <CommentLogo />
            </div>
            <a onClick={() => addbookmark()}>
              {!savedPosts.includes(value) ? (
                <FaRegBookmark className="bookmark" size={24} />
              ) : (
                <FaBookmark className="bookmark" size={24} color="white" />
              )}
            </a>
          </div>
          <div className="Like_section_count">
            {data ? data.likes.length : 1} likes
            {console.log(data)}
            <span>{data ? getdate(data.time) : 1}</span>
          </div>
          <div className="post_add_comments_container">
            <div className="post_add_comments_cont">
              <textarea
                ref={textarea_ref}
                className="post_add_comments_text"
                id=""
                placeholder="Add a comment"
              ></textarea>
              <div
                onClick={() => postcomment()}
                className="post_add_comments_btn"
              >
                Post
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post_open;

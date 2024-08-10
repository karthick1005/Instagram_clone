import React, { useState } from "react";
import { UnlikeLogo } from "../../../assets/constants";
import { FaRegHeart } from "react-icons/fa6";
import "./comment.css";
import { updatecomments } from "../../../Hooks/comments";
const Comment = ({ value, commentid, postid }) => {
  const [like, setlike] = useState(false);
  const [comment, setcomment] = useState(value);
  const updatelike = async () => {
    if (
      !value.likes.includes(JSON.parse(localStorage.getItem("user-Info")).uid)
    ) {
      value.likes.push(JSON.parse(localStorage.getItem("user-Info")).uid);
      updatecomments(
        postid,
        commentid,
        JSON.parse(localStorage.getItem("user-Info")).uid,
        true
      );
    } else {
      console.log("hello");
      value.likes = value.likes.filter(
        (item) => item !== JSON.parse(localStorage.getItem("user-Info")).uid
      );
      updatecomments(
        postid,
        commentid,
        JSON.parse(localStorage.getItem("user-Info")).uid,
        false
      );
    }
    console.log(value);
    setcomment({
      ...comment,
      likes: value.likes,
    });
  };
  return (
    <div>
      <div className="post_comment_comment_cont">
        <img src="/profilepic.png" alt="" />
        <div className="post_comment_topcnt_text">
          <span>{value.username}</span>
          <span>{value.comment}</span>
        </div>
        <a className="Comment_like">
          <div className="like_btn" onClick={() => updatelike()}>
            {comment.likes.includes(
              JSON.parse(localStorage.getItem("user-Info")).uid
            ) ? (
              <UnlikeLogo size={12} />
            ) : (
              <FaRegHeart size={12} color="white" />
            )}
          </div>
          <span>{comment.likes.length}</span>
        </a>
      </div>
    </div>
  );
};

export default Comment;

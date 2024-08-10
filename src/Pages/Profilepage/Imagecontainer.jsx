import React, { useEffect, useState } from "react";
import { getimagedata } from "../../Hooks/Usesignupandpass";
import {
  CommentLogo,
  NotificationsLogo,
  UnlikeLogo,
} from "../../assets/constants";
import { getcommentswithid } from "../../Hooks/comments";
const Imagecontainer = ({ id }) => {
  const [image, setimage] = useState("");
  const [data, setdata] = useState(null);
  const [comments, setcomment] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      let data = await getimagedata(id);

      console.log(data);
      //   setimage(data.img);
      setdata(data);
      let res = await getcommentswithid(id);
      setcomment(res);
    };
    fetch();
  }, []);
  return (
    <div>
      <div className="profile_post_hover_container">
        <div className="profile_post_hover_elements_cont">
          <span className="profile_post_hover_elements">
            <UnlikeLogo className="profile_post_hover_elements_ico" />
            {data ? data.likes.length : 10}
          </span>
          <span className="profile_post_hover_elements">
            <CommentLogo className="profile_post_hover_elements_ico" />
            {comments ? comments.result.length : 10}
          </span>
        </div>
      </div>
      <img src={data ? data.img[0] : ""} alt="" />
    </div>
  );
};

export default Imagecontainer;

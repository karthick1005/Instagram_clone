import React, { useState } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import "./Post.css";
const Post = ({ photos }) => {
  // const photos = ["/img3.png", "/img1.png", "/img2.png"];
  const [slide, setslide] = useState(0);
  const nextslide = () => {
    setslide(slide === photos.length - 1 ? 0 : slide + 1);
  };
  const prevslide = () => {
    setslide(slide === 0 ? photos.length - 1 : slide - 1);
  };
  return (
    <div className="Post_card_body">
      {photos ? (
        <>
          <div className="Post_card_body_image">
            {photos.map((values, index) => {
              return (
                <img
                  key={index}
                  className={
                    slide === index ? "myslide_image:" : "myslide-hidden"
                  }
                  src={values}
                  alt=""
                  srcset=""
                />
              );
            })}
          </div>
          {photos.length > 1 ? (
            <div>
              <div className="slideshowDots">
                {photos.map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => setslide(idx)}
                    className={`slideshowDot ${idx === slide ? "active" : ""}`}
                  ></div>
                ))}
              </div>
              <div className="button_post">
                <div className="beforebutton" onClick={() => prevslide()}>
                  <MdNavigateBefore size={30} />
                </div>

                <div className="nextbutton" onClick={() => nextslide()}>
                  <MdNavigateNext size={30} />
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </>
      ) : (
        // {/* <img className="myslide" src="/img4.png" alt="" srcset="" /> */}
        <div></div>
      )}
    </div>
  );
};

export default Post;

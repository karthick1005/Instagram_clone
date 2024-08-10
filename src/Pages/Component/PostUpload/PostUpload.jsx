import React, { useRef, useState } from "react";
import "./PostUpload.css";
import { Postcancel, Postlogo } from "../../../assets/constants";
import { IoMdClose } from "react-icons/io";
import { IoMdArrowBack } from "react-icons/io";
import Profile_pic from "../../../assets/profile_pic";
import { uploadphotos } from "../../../Hooks/Photos";
import { uploadposttodb } from "../../../Hooks/Post";
const PostUpload = ({ close }) => {
  const [drag, setDrag] = useState(false);
  const [error, seterror] = useState(false);
  const [url, seturl] = useState(null);
  const [file, setfile] = useState(null);
  const [next, setnext] = useState(false);
  const [notext, setnotext] = useState("");
  const textarea = useRef(null);
  const fileselect = useRef(null);
  const dragentered = (event) => {
    event.preventDefault();
    setDrag(true);
  };

  const dragover = (event) => {
    event.preventDefault();
    setDrag(true);
  };

  const dragended = (event) => {
    event.preventDefault();
    setDrag(false);
  };

  const ondrop = (event) => {
    if (!next) {
      event.preventDefault();
      setDrag(false);

      const files = event.dataTransfer.files[0];
      if (files.type.startsWith("image/")) {
        // Process image file
        setfile(files);
        console.log(URL.createObjectURL(files));
        seturl(URL.createObjectURL(files));
        console.log("This is an image file.");
      } else {
        seterror(true);
      }
    } 
  };
  const handlechange = (event) => {
    setfile(event.target.files[0]);
    seturl(URL.createObjectURL(event.target.files[0]));
  };
  const uploadimage = async () => {
    let res = await uploadphotos(
      JSON.parse(localStorage.getItem("user-Info")).uid,
      file
    );
    let r = await uploadposttodb(
      JSON.parse(localStorage.getItem("user-Info")).uid,
      res,
      textarea.current.value,
      JSON.parse(localStorage.getItem("user-Info")).username
    );
    if (r) {
      close();
    }
  };

  return (
    <div
      className="PostUpload_parent"
      onDragEnter={dragentered}
      onDragOver={dragover}
      onDragLeave={dragended}
      onDrop={ondrop}
    >
      <div className=" closebutton_cont" onClick={close}>
        <IoMdClose size={24} className="closebutton" />
      </div>
      <div className="Postupload_body">
        <div className="postupload_image_place">
          <div className="Postupload_title">
            {url ? (
              <div className="image_title">
                <IoMdArrowBack id="back" size={24} onClick={close} />
                {next ? <h2>Create new post</h2> : <h2>Crop</h2>}
                {next ? (
                  <button onClick={uploadimage}>Share</button>
                ) : (
                  <button onClick={() => setnext(true)}>Next</button>
                )}
              </div>
            ) : (
              <h2>Create New Post</h2>
            )}
            <hr />
          </div>
          <div className="Postupload_body_below">
            <div className="Post_upload_body_image">
              {url ? (
                <div
                  className={"Post_logo_container image"}
                  style={{ backgroundImage: `url(${url})` }}
                >
                  {/* Drag photos and videos here
            <button>Select from Computer</button> */}
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    name=""
                    id=""
                    style={{ display: "none" }}
                    ref={fileselect}
                    accept=".png ,.jpg ,.jpeg"
                    onChange={handlechange}
                  />
                  {!error ? (
                    <div
                      className={`Post_logo_container ${drag ? "active" : ""}`}
                    >
                      <Postlogo />
                      Drag photos and videos here
                      <button onClick={() => fileselect.current.click()}>
                        Select from Computer
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`Post_logo_container ${drag ? "active" : ""}`}
                    >
                      <Postcancel />
                      This file is not supported
                      <button onClick={() => fileselect.current.click()}>
                        Select other file
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
            {next ? (
              <div className="Post_upload_details">
                <div className="details_header">
                  <Profile_pic
                    classname="postprofilepic"
                    url={
                      JSON.parse(localStorage.getItem("user-Info"))
                        .profilepicurl
                    }
                    altername=""
                  />
                  <h3>
                    {JSON.parse(localStorage.getItem("user-Info")).username}
                  </h3>
                </div>
                <div className="details_textarea">
                  <textarea
                    name="caption"
                    id=""
                    placeholder="Write a Caption"
                    maxLength={200}
                    ref={textarea}
                    onChange={(value) => setnotext(value.target.value)}
                  ></textarea>
                  <p>{notext.length}/200</p>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostUpload;

import React, { useEffect, useRef, useState } from "react";
import "./PostUpload.css";
import { Postcancel, Postlogo } from "../../../assets/constants";
import { IoMdClose } from "react-icons/io";
import { IoMdArrowBack } from "react-icons/io";
import Profile_pic from "../../../assets/profile_pic";
import { uploadphotos } from "../../../Hooks/Photos";
import { uploadposttodb } from "../../../Hooks/Post";
import FilterSlider from "../Filter/Slider/FilterSlider";
import FilterPreview from "../Filter/FilterPreview/FilterPreview";
const PostUpload = ({ close }) => {
  const [image, setimage] = useState(null);
  const [prev, setprev] = useState(document.title);
  const [drag, setDrag] = useState(false);
  const [error, seterror] = useState(false);
  const [url, seturl] = useState(null);
  const [file, setfile] = useState(null);
  const [next, setnext] = useState(false);
  const [filter, setfilter] = useState(false);
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
      image
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
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const [currentmenu, setcurrentmenu] = useState("Insta");
  const [currentfilter, setcurrentfilter] = useState("");
  const [filtervalue, setfilterval] = useState({
    Contrast: 100,
    Brightness: 100,
    Saturation: 100,
    Sepia: 0,
    GrayScale: 0,
  });
  const filterStyles = {
    filter: `
      contrast(${filtervalue.Contrast}%) 
      brightness(${filtervalue.Brightness}%) 
      saturate(${filtervalue.Saturation}%) 
      sepia(${filtervalue.Sepia}%) 
      grayscale(${filtervalue.GrayScale}%)
    `,
  };

  const saveimage = async () => {
    const divElement = imageRef.current; // Reference to the div with the background image
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Get the background image URL from the div (the preview image)
    const backgroundImage = getComputedStyle(divElement).backgroundImage;
    const previewUrl = backgroundImage.slice(5, -2); // Extract URL from 'url("...")'

    // Create a new Image object for the preview image
    const previewImage = new Image();
    previewImage.crossOrigin = "Anonymous"; // Handle CORS if necessary

    // Set the preview image's source to the URL extracted from the div
    previewImage.src = previewUrl;

    // Handle the image after it's loaded
    previewImage.onload = () => {
      // Set canvas size to the preview image size
      canvas.width = previewImage.width;
      canvas.height = previewImage.height;

      // Apply any CSS filters from the div to the canvas context (if filters are applied)
      const filter = getComputedStyle(divElement).filter;
      ctx.filter = filter;

      // Draw the preview image onto the canvas
      ctx.drawImage(previewImage, 0, 0, canvas.width, canvas.height);

      // Now you have the canvas ready with the background image
      // Convert the canvas to a Blob (for Firebase upload)
      canvas.toBlob(async (blob) => {
        if (blob) {
          // Upload the preview image (filtered) to Firebase
          setimage(blob);
        }
      }, "image/png");
    };
  };
  useEffect(() => {
    console.log(prev);
    // prev = document.title;
    document.title = "Create new post • Instagram";
  }, []);
  return (
    <div
      className="PostUpload_parent"
      onDragEnter={dragentered}
      onDragOver={dragover}
      onDragLeave={dragended}
      onDrop={ondrop}
    >
      {console.log(prev)}
      <div
        className=" closebutton_cont"
        onClick={() => {
          close();
          document.title = prev;
        }}
      >
        <IoMdClose size={24} className="closebutton" />
      </div>
      <div className="Postupload_body">
        <div className="postupload_image_place">
          <div className="Postupload_title">
            {url ? (
              <div className="image_title">
                <IoMdArrowBack
                  id="back"
                  size={24}
                  onClick={() => {
                    if (next && filter) {
                      setfilter(false);
                    } else if (next && !filter) {
                      close();
                      document.title = prev;
                    }
                  }}
                />
                {next ? (
                  <>{filter ? <h2>Create new post</h2> : <h2>Edit</h2>}</>
                ) : (
                  <h2>Crop</h2>
                )}
                {next ? (
                  <>
                    {filter ? (
                      <button onClick={uploadimage}>Share</button>
                    ) : (
                      <button
                        onClick={() => {
                          saveimage();
                          setfilter(true);
                        }}
                      >
                        Next
                      </button>
                    )}
                  </>
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
                  className={`Post_logo_container image ${
                    currentmenu === "Insta" ? currentfilter : ""
                  }`}
                  style={{
                    backgroundImage: `url(${url})`,
                    ...(currentmenu === "Custom" ? filterStyles : ""),
                  }}
                  ref={imageRef}
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
              <>
                {filter ? (
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
                  <div className="Post_upload_details">
                    <div className="PostUpload_selection_btn">
                      <button
                        className={currentmenu === "Insta" ? "active" : ""}
                        onClick={() => setcurrentmenu("Insta")}
                      >
                        Filter
                      </button>
                      <button
                        className={currentmenu === "Custom" ? "active" : ""}
                        onClick={() => {
                          setcurrentmenu("Custom");
                          setcurrentfilter("");
                        }}
                      >
                        Ajustment
                      </button>
                    </div>
                    <canvas
                      ref={canvasRef}
                      style={{ display: "none" }}
                    ></canvas>
                    <div className="Post_upload_details_area">
                      {currentmenu === "Insta" ? (
                        <FilterPreview
                          setfilter={setcurrentfilter}
                          current={currentfilter}
                        />
                      ) : (
                        <FilterSlider filter={filtervalue} set={setfilterval} />
                      )}
                    </div>
                  </div>
                )}
              </>
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

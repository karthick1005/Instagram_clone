import React, { useRef, useState } from "react";
import "./EditProfile.css";
import { updateprofile } from "../../../Hooks/Usesignupandpass";
import { useNavigate } from "react-router-dom";
import Profile_pic from "../../../assets/profile_pic";
const EditProfile = ({ close }) => {
  const navigate = useNavigate();
  const text_red = useRef(null);
  const fileselect = useRef(null);
  const [word, setword] = useState(
    JSON.parse(localStorage.getItem("user-Info"))
      .bio.replace(`""`, "")
      .replace(/\\n/g, "\n")
  );
  const [username, setname] = useState(
    JSON.parse(localStorage.getItem("user-Info")).username
  );
  const handleChange = (event) => {
    const value = event.target.value;
    setword(value);
    console.log("Textarea value:", JSON.stringify(value));
  };
  const update = async () => {
    let res = await updateprofile(
      JSON.parse(localStorage.getItem("user-Info")).uid,
      word,
      text_red.current.value,
      pic,
      file
    );
    if (res) {
      let obj = JSON.parse(localStorage.getItem("user-Info"));
      obj.username = text_red.current.value;
      obj.bio = word;
      localStorage.setItem("user-Info", JSON.stringify(obj));
      navigate(`/${obj.username}`);
      window.location.reload();
    }
  };
  const [url, seturl] = useState(
    JSON.parse(localStorage.getItem("user-Info")).profilepicurl
  );
  const [file, setfile] = useState(null);
  const [pic, setpic] = useState(false);
  const handlephotochange = (event) => {
    setfile(event.target.files[0]);
    seturl(URL.createObjectURL(event.target.files[0]));
    setpic(true);
  };
  return (
    <div className="Edit_Profile_cont">
      <div className="Edit_Profile_body">
        <h1>Edit Profile</h1>
        <div className="Editprofile_photos_cont">
          <div
            onClick={() => {
              fileselect.current.click();
            }}
          >
            <input
              type="file"
              name=""
              style={{ display: "none" }}
              ref={fileselect}
              id=""
              accept=".png , .jpg ,.jpeg"
              onChange={handlephotochange}
            />
            <Profile_pic classname="Editprofile_photo" url={url} />
          </div>

          <div className="editprofile_itemss">
            <label htmlFor="Name">UserName</label>
            <input
              type="text"
              name=""
              id=""
              onChange={(value) => setname(value.target.value)}
              ref={text_red}
              value={username}
            />
            <label htmlFor="Bio">Bio</label>
            <div className="profile_textarea">
              <textarea
                rows={3}
                maxLength={50}
                name=""
                id=""
                value={word}
                onChange={handleChange}
              ></textarea>
              <p>{word.length}/50</p>
            </div>
            <div className="editprofile_button">
              <button id="cancel" onClick={close}>
                Cancel
              </button>
              <button onClick={update} id="Save">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

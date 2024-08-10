import React from "react";
import Profile_pic from "../../../assets/profile_pic";
import "./story.css";
const Story = ({ type }) => {
  // console.log(type);
  const profile = [
    "hello1",
    "hello2",
    "hello3",
    "hello4",
    "hello5",
    "hello5",
    "hello6",
    "hello7",

    "hello8",
    "hello9",

    "hello10",
    "hello11",
  ];
  return (
    <div>
      <div
        className={
          type === "Hightlight" ? "Hightlight_Container" : "Story_container"
        }
      >
        <ul>
          {profile.map((value, index) => {
            return (
              <li>
                <a>
                  <Profile_pic
                    classname={
                      type === "Hightlight" ? "Hightlight_prof" : "Story_prof"
                    }
                    url="/profilepic.png"
                    altername=""
                  />
                  {value}
                </a>
              </li>
            );
          })}
        </ul>
        {/* story */}
      </div>
    </div>
  );
};

export default Story;

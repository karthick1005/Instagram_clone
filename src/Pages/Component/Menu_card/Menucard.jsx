import React, { useEffect, useState } from "react";
import "./Menucard.css";
import Profile_pic from "../../../assets/profile_pic";
import { getdatawithuid, getsuggestion } from "../../../Hooks/Usesignupandpass";
import { Updatefollowers } from "../../../Hooks/updatelike";
import { signOut } from "firebase/auth";
import { auth } from "../../../Firebase/Firebase";
import { useNavigate } from "react-router-dom";
const Menucard = ({ datachanged }) => {
  const values = ["hello", "hello2"];
  const [name, setname] = useState("");
  const [data, setdata] = useState(null);
  const [random, setrandom] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("logged") === null) return;
    let obj = JSON.parse(localStorage.getItem("user-Info"));
    setname(obj.username);
    getuserdata();
  }, []);
  const getdatalocal = async () => {
    let res = await getsuggestion();
    res = removeObjectUsingFilter(
      res,
      JSON.parse(localStorage.getItem("user-Info"))
    );
    setdata(res);
    let ran = getRandomItems(res, 3);
    console.log(ran);
    setrandom(ran);
  };
  const getRandomItems = (array, num) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };
  const removeObjectUsingFilter = (array, objectToRemove) => {
    let res = array.filter((item) => item.uid !== objectToRemove.uid);
    console.log(res);
    return res.filter((item) => !objectToRemove.following.includes(item.uid));
  };
  const follow = async (id) => {
    let res = await Updatefollowers(
      JSON.parse(localStorage.getItem("user-Info")).uid,
      id,
      true
    );
    if (res) {
      getuserdata();
    }
    let ran = getRandomItems(data, 3);
    // console.log(ran);
    setrandom(ran);
  };
  const getuserdata = async () => {
    let data_res = await getdatawithuid(
      JSON.parse(localStorage.getItem("user-Info")).uid
    );
    localStorage.setItem("user-Info", JSON.stringify(data_res));
    datachanged();
    getdatalocal();
  };
  const logout = async () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        navigate("/auth");
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);

        // An error happened.
      });
  };
  return (
    <div className="Menu_Card">
      <div className="prof_pic">
        <Profile_pic
          classname=""
          url={`${
            JSON.parse(localStorage.getItem("user-Info"))
              ? JSON.parse(localStorage.getItem("user-Info")).profilepicurl
              : ""
          }`}
          altername=""
        />
        {/* <img src="/profilepic.png" alt="" srcset="" /> */}
        {name}
        <button onClick={logout}>Logout</button>
      </div>
      <div className="prof_pic_suggest">
        Suggested for you<button>See All</button>
      </div>
      <div className="prof_other-cont">
        {random.map((value, i) => {
          // console.log(i);

          return (
            <div className="prof_pic_others">
              <div className="prof_pic_others_img">
                <Profile_pic
                  // classname="profilepic"
                  url={value.profilepicurl}
                  altername=""
                />
                {/* <img src="/profilepic.png" alt="" srcset="" /> */}
                <p>
                  {value.username}

                  <p className="suggest">Suggested for you</p>
                </p>
              </div>
              <button onClick={() => follow(value.uid)}>Follow</button>
            </div>
          );
        })}
      </div>
      <div className="credit_menu">&copy;Build by Udhayakarthick</div>
    </div>
  );
};

export default Menucard;

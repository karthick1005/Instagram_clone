import React, { useEffect, useState } from "react";
import Menucard from "../Component/Menu_card/Menucard";
import Story from "../Component/Story/Story";
import Postgenerator from "../Component/Postgenerator/Postgenerator";
import "./Homepage.css";
import { getdatawithuid } from "../../Hooks/Usesignupandpass";
import Post_open from "../Profilepage/Post_open/Post_open";
import { IoMdClose } from "react-icons/io";
const Homepage = () => {
  const [alldata, setalldata] = useState({ data: [] });
  const [additem, setadditem] = useState([]);
  const getdata = async () => {
    const results = [];
    //  for(const element in  JSON.parse(localStorage.getItem("user-Info")).following){
    //       console.log(element);
    //
    if (localStorage.getItem("logged") === null) return;
    for (const element of JSON.parse(localStorage.getItem("user-Info"))
      .following) {
      let datas = await getdatawithuid(element);
      if (datas.uid === JSON.parse(localStorage.getItem("user-Info")).uid) {
        localStorage.setItem("user-Info", JSON.stringify(datas));
      }
      results.push(datas);
    }
    setalldata((prevdata) => ({
      ...prevdata,
      data: results,
    }));
  };
  useEffect(() => {
    document.title = "Instagram";
    getdata();
  }, []);
  const add = (value, image) => {
    console.log(value);
    // const arr = [value];
    openModal();
    setadditem(
      <>
        {history.pushState({}, "", `/p/${value}`)}

        <Post_open val={value} image={image} />
        <div className=" closebutton_cont">
          <IoMdClose size={24} className="closebutton" onClick={closeoverlay} />
        </div>
      </>
    );
  };
  const closeoverlay = () => {
    setadditem([]);
    closeModal();
    history.pushState({}, "", `/`);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isModalOpen]);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="Homepage_Container">
        <div className="story_homepage">
          <Story />
        </div>
        {console.log(alldata)}
        {alldata.data.length == 0 ? (
          <div className="Nofollowerspopup">
            You dont have any friend rightnow please follow
          </div>
        ) : (
          <>
            {alldata.data.map((value, i) => {
              console.log("hello", i);
              return value.posts.map((post, index) => {
                // console.log(i);
                return (
                  <Postgenerator
                    post={post}
                    name={value.username}
                    addfunc={add}
                    image={value.profilepicurl}
                  />
                );
              });
            })}
          </>
        )}

        {/* <Postgenerator /> */}
        <Menucard datachanged={getdata} />
      </div>
      {additem}
    </div>
  );
};

export default Homepage;

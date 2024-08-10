import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import routes from "./Routes/Router";
import { getdatawithuid } from "./Hooks/Usesignupandpass";
import { auth } from "./Firebase/Firebase";
import Sidebar from "./Pages/Component/Sidebar/sidebar";
function App() {
  const navigate = useNavigate();
  const getdata = async () => {
    console.log(localStorage.getItem("logged"));

    if (localStorage.getItem("logged") === null) {
      navigate("/auth");
    } else {
      let uid = auth.currentUser.uid;
      let datas = await getdatawithuid(uid);
      localStorage.setItem("user-Info", JSON.stringify(datas));
    }
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    <>
      {window.location.pathname !== "/auth" ? <Sidebar /> : <></>}
      <Routes>
        {routes.map((routes, i) => (
          <Route key={i} path={routes.path} element={routes.element} />
        ))}
      </Routes>
    </>
  );
}

export default App;

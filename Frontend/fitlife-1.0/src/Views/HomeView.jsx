import React, { useEffect, useState } from "react";
import "../Styles/Home.css";
import Header from "../Components/Home/Header";
import Main from "../Components/Home/Main";
import UserService from "../Services/UserService";
import state from "../Utils/Store";
import AuthModal from "../Components/Auth/AuthModal";

const HomeView = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      UserService.getProfile()
        .then((userDataMain) => {
          state.currentUser = userDataMain;
          console.log(userDataMain);
        })
        .catch((err) => {});
    }
  }, []);
  return (
    <div id="top">
      <AuthModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />
      <Header
        onOpenAuth={() => {
          setIsOpenModal(true);
        }}
      />
      <Main
        onOpenAuth={() => {
          setIsOpenModal(true);
        }}
      />
    </div>
  );
};

export default HomeView;

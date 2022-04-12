/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { useParams } from "react-router-dom";

import RealtorsApi from "./api/realtors";
import store from "./store/store";
import { setCurrentRealtor, setDeviceSize, setRealtors } from "./store/actions";
import { useAppDispatch, useAppSelector } from "./store/hooks";

import Header from "./ui/Header/Header";
import Navigation from "./ui/Navigation/Navigation";
import MessageViewer from "./ui/MessageViewer/MessageViewer";

import * as Device from "./ui/Device";
import "./App.scss";

function App() {
  const params = useParams<UrlParameters>();
  const dispatch = useAppDispatch();
  const device = useAppSelector((state) => state.device);
  const [hideNavigation, setHideNavigation] = useState<boolean>(false);

  const getRealtors = async () => {
    try {
      const realtors = await RealtorsApi.getAllRealtors();
      dispatch(setRealtors(realtors.data));
    } catch (error) {
      //display error message
    }
  };

  const getRealtor = async (realtorId: Realtor["id"]) => {
    try {
      const realtor = await RealtorsApi.getOneRealtor(realtorId);
      dispatch(setCurrentRealtor(realtor.data));
    } catch (error) {
      //display error message
    }
  };

  const onWindowResize = () => dispatch(setDeviceSize(Device.get()));

  useEffect(() => {
    getRealtors();
    const deviceType = Device.get();
    dispatch(setDeviceSize(deviceType));

    if (params.messageId && !hideNavigation && deviceType === "mobile") {
      setHideNavigation(true);
    }
    window.addEventListener("resize", onWindowResize);
    return () => window.removeEventListener("resize", onWindowResize);
  }, []);

  useEffect(() => {
    if (!Object.keys(params).length) return;

    if (params.realtorId) {
      getRealtor(parseInt(params.realtorId, 10));
    }
    if (params.messageId && !hideNavigation && device === "mobile") {
      setHideNavigation(true);
    } else if ((!params.messageId && hideNavigation) || device === "desktop") {
      setHideNavigation(false);
    }
  }, [params, device]);

  return (
    <Provider store={store}>
      <div className="app-container">
        <Header />
        <div className="main-container">
          {!hideNavigation && <Navigation />}
          <MessageViewer />
        </div>
      </div>
    </Provider>
  );
}

export default App;

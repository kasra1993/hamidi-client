import React, { useState } from "react";
import {
  Home,
  Settings,
  LogOutIcon,
  UploadCloudIcon,
  MessageCircle,
  TicketPlus,
} from "lucide-react";
import { logout } from "../../redux/slices/userSlice";
import { SidebarItem } from "../../components/sidebar/SidebarItem";
import Sidebar from "../../components/sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import UserSettings from "./UserSettings";

import UserMessages from "./UserMessages";
import UserUpload from "./UserUpload";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../redux/slices/toastSlice";
import UserTickets from "./UserTicket";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [selectedMenu, setSelectedMenu] = useState("Settings");
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(
      showToast({
        message: "شما از صفحه کاربری خود خارج شده اید",
        type: "success",
      })
    );
    navigate("/");
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "User-Upload":
        return <UserUpload />;
      case "Settings":
        return <UserSettings />;
      case "Messages":
        return <UserMessages />;
      case "Tickets":
        return <UserTickets />;
      default:
        return <UserSettings />;
    }
  };
  return (
    <>
      <div className="flex">
        <Sidebar user={user}>
          {/* <SidebarItem icon={<Home size={20} />} text="Home" alert /> */}
          {/* <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active /> */}
          {/* <SidebarItem icon={<StickyNote size={20} />} text="Projects" alert /> */}
          {/* <hr className="my-3" /> */}
          {/* <SidebarItem icon={<LifeBuoy size={20} />} text="Sgsdfsadf" />
          <SidebarItem icon={<Calendar size={20} />} text="Sgsdfsadf" />
          <SidebarItem icon={<Flag size={20} />} text="Sgsdfsadf" /> */}
          <SidebarItem
            icon={<Home size={20} />}
            text="خانه"
            path="/"
            // onClick={() => setSelectedMenu("Home")}
          />
          <SidebarItem
            icon={<MessageCircle size={20} />}
            text="پیام ها"
            onClick={() => setSelectedMenu("Messages")}
          />
          <SidebarItem
            icon={<TicketPlus size={20} />}
            text="تیکت ها"
            onClick={() => setSelectedMenu("Tickets")}
          />
          <SidebarItem
            icon={<UploadCloudIcon size={20} />}
            text="بارگذاری"
            onClick={() => setSelectedMenu("User-Upload")}
          />
          <SidebarItem
            icon={<Settings size={20} />}
            text="تنظیمات"
            onClick={() => setSelectedMenu("Seetings")}
          />
          <SidebarItem
            icon={<LogOutIcon size={20} />}
            text="خروج"
            onClick={handleLogout}
          />
        </Sidebar>
        <div className="flex-1 p-5">{renderContent()}</div>
      </div>
    </>
  );
};

export default UserProfile;

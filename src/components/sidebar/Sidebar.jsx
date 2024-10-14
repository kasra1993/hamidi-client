import React from "react";
import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../../redux/slices/userSlice";

// import mainLogo from "/public/main-logo.png";

export default function Sidebar({ children, user }) {
  const expanded = useSelector((state) => state.user.sidebar_expanded);
  const dispatch = useDispatch();
  return (
    <>
      <aside className="h-screen ">
        <nav className="h-full flex flex-col bg-white border-r shadow-sm ">
          <div className="py-2 flex justify-end -mr-5 relative">
            {/* <img
              src={mainLogo}
              className={`overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"
              }`}
            /> */}
            <button
              type="button"
              onClick={() => dispatch(toggleSidebar())}
              className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-100 text-white hover:text-gray-800 z-99  "
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <div className="border-t flex p-5 gap-5">
            <img src={user?.image?.url} className="w-10 h-10 rounded-2xl" />
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              } `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">{user?.name}</h4>
                <span className="text-xs text-gray-600">{user?.email}</span>
              </div>
              {/* <MoreVertical size={20} /> */}
            </div>
          </div>
          <ul className="flex-1 px-3">{children}</ul>
        </nav>
      </aside>
    </>
  );
}

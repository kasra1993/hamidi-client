import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets } from "../../redux/slices/ticketSlice";
import { BadgeCheck, Edit, Gauge } from "lucide-react";

const UserTicketList = ({ userId }) => {
  const dispatch = useDispatch();
  const { tickets, loading, error } = useSelector((state) => state.tickets);

  useEffect(() => {
    dispatch(fetchTickets(userId));
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching tickets.</p>;

  return (
    // <div className="space-y-4">
    //   {tickets.map((ticket) => (
    //     <div key={ticket._id} className="p-4 border rounded">
    //       <h2 className="text-lg font-semibold">{ticket.subject}</h2>
    //       <p>Status: {ticket.status}</p>
    //       <p>{ticket.description}</p>
    //       {ticket.adminResponse && (
    //         <p>Admin Response: {ticket.adminResponse}</p>
    //       )}
    //     </div>
    //   ))}
    // </div>
    <div className="bg-gray-100 w-full">
      {/* <div className="header bg-white h-16 px-10 py-8 border-b-2 border-gray-200 flex items-center justify-between"> */}
      {/* <div className="flex items-center space-x-2 text-gray-400">
          <span className="text-green-700 tracking-wider font-thin text-md">
            <a href="#">Home</a>
          </span>
          <span>/</span>
          <span className="tracking-wide text-md">
            <span className="text-base">Categories</span>
          </span>
          <span>/</span>
        </div> */}
      {/* </div> */}
      <div className="header mt-5">
        <h1 className=" text-2xl">تیکت های شما</h1>
      </div>
      <div className="flex flex-col mt-6 lg:flex-row w-full">
        <div className="w-full lg:w-full m-1 bg-white shadow-lg text-lg rounded-sm border border-gray-200">
          <div className="overflow-x-auto rounded-lg p-3">
            <table className="table-auto w-full ">
              <thead className="text-sm text-gray-800 bg-slate-700  mx-auto rounded-2xl">
                <tr>
                  <th className="p-2 text-white ">
                    <div className="  border-r-2">وضعیت</div>
                  </th>
                  <th className="p-2 text-white">
                    <div className="">موضوع</div>
                  </th>
                  <th className="p-2 text-white">
                    <div className="font-semibold text-center  border-x-2">
                      متن
                    </div>
                  </th>
                  <th className="p-2 text-white">
                    <div className="font-semibold text-center">فعالیت</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr className="border border-gray-700 hover:shadow-lg hover:cursor-pointer">
                    {/* <td>
                      <img
                      src="https://images.pexels.com/photos/25652584/pexels-photo-25652584/free-photo-of-elegant-man-wearing-navy-suit.jpeg?auto=compress&cs=tinysrgb&w=400"
                      className="h-8 w-8 mx-auto"
                      />
                      </td> */}
                    <td className="justify-center flex mt-3">
                      {ticket.status === "closed" ? (
                        <BadgeCheck color="green" />
                      ) : (
                        <Gauge />
                      )}
                    </td>
                    <td className="text-sm">{ticket.subject}</td>
                    <td className="text-sm">{ticket.description}</td>
                    <td className="p-2">
                      <div className="flex justify-center">
                        <a
                          href="#"
                          className="rounded-md hover:bg-green-100 text-green-600 p-2 flex justify-between items-center text-sm gap-2"
                        >
                          <span>
                            {/* <FaEdit className="w-4 h-4 mr-1" /> */}
                            <Edit width={20} />
                          </span>{" "}
                          مشاهده
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTicketList;

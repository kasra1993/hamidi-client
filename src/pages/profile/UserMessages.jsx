import React, { useState } from "react";

const contacts = [
  {
    id: 1,
    name: "John Doe",
    messages: [
      { id: 1, text: "Hello, how are you?" },
      { id: 2, text: "Let’s meet tomorrow!" },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    messages: [
      { id: 1, text: "Hi! Long time no see." },
      { id: 2, text: "Are you coming to the event?" },
      { id: 3, text: "Please let me know!" },
    ],
  },
];

const UserMessages = () => {
  // const [selectedContact, setSelectedContact] = useState(null); // Track selected contact
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = (contact) => {
  //   setSelectedContact(contact);
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  //   setSelectedContact(null);
  // };

  // return (
  //   <div className="p-4 max-w-xl mx-auto">
  //     <h1 className="text-2xl font-semibold mb-4">Messages</h1>
  //     <div className="space-y-4">
  //       {contacts.map((contact) => (
  //         <div
  //           key={contact.id}
  //           className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100"
  //           onClick={() => openModal(contact)}
  //         >
  //           <div>
  //             <h2 className="text-lg font-semibold text-gray-800">
  //               {contact.name}
  //             </h2>
  //             <p className="text-gray-500">
  //               {contact.messages.length} messages
  //             </p>
  //           </div>
  //           <button className="text-blue-500 hover:underline">
  //             View Messages
  //           </button>
  //         </div>
  //       ))}
  //     </div>

  //     {/* Modal */}
  //     {isModalOpen && selectedContact && (
  //       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
  //         <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
  //           <h2 className="text-lg font-semibold mb-4">
  //             Messages with {selectedContact.name}
  //           </h2>
  //           <div className="space-y-3">
  //             {selectedContact.messages.map((message) => (
  //               <div key={message.id} className="bg-gray-100 p-3 rounded-lg">
  //                 <p>{message.text}</p>
  //               </div>
  //             ))}
  //           </div>
  //           <button
  //             className="mt-6 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
  //             onClick={closeModal}
  //           >
  //             Close
  //           </button>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (subject && description) {
      //   addTicket(subject, description);
      //   setSubject("");
      //   setDescription("");
    }
  };

  return (
    <div className="bg-gray-100 h-screen">
      <div className="flex flex-col mx-3 mt-6 lg:flex-row">
        <div className="w-full lg:w-1/3 m-1">
          <form
            className="w-full bg-white shadow-md p-6"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-full px-3 mb-6">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="category_name"
                >
                  درخواست
                </label>
                <input
                  className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                  type="text"
                  name="name"
                  placeholder="موضوع"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
              <div className="w-full px-3 mb-6">
                <textarea
                  rows="4"
                  className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                  name="description"
                  placeholder="توضیحات"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="w-full md:w-full px-3 mb-6">
                <button
                  type="submit"
                  className="appearance-none block w-full bg-green-700 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-green-600 focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  ثبت
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="w-full lg:w-2/3 m-1 bg-white shadow-lg text-lg rounded-sm border border-gray-200">
          <div className="overflow-x-auto rounded-lg p-3">
            <table className="table-auto w-full">
              <thead className="text-sm font-semibold uppercase text-gray-800 bg-gray-50 mx-auto">
                <tr>
                  <th>شناسه</th>
                  <th>موضوع</th>
                  <th>توضیحات</th>
                  <th>وضعیت</th>
                  <th className="p-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* {tickets &&
                  tickets.map((ticket) => (
                    <tr key={ticket?.id}>
                      <td>{ticket?.id}</td>
                      <td>{ticket?.subject}</td>
                      <td>{ticket?.description}</td>
                      <td>{ticket?.status}</td>
                      <td className="p-2 text-center">
                        <div className="flex justify-center">
                          <a
                            href="#"
                            className="rounded-md hover:bg-green-100 text-green-600 p-2 flex justify-between items-center"
                          >
                            <span>
                              <FaEdit className="w-4 h-4 mr-1" />
                            </span>
                            Edit
                          </a>
                          <button
                            className="rounded-md hover:bg-red-100 text-red-600 p-2 flex justify-between items-center"
                            onClick={() =>
                              updateTicketStatus(ticket?.id, "Deleted")
                            }
                          >
                            <span>
                              <FaTrash className="w-4 h-4 mr-1" />
                            </span>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMessages;

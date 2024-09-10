import React from "react";

const Products = ({ provider, type }) => {
  return (
    <article className="rounded-xl border border-gray-700 bg-gray-200 p-4">
      <div className="flex items-center justify-between gap-4 px-10 py-3 mb-5 bg-slate-300 rounded-lg">
        <img
          alt=""
          src={provider?.image?.url}
          className="shadow-sm shadow-slate-400 object-cover w-[5rem]"
        />

        <div>
          <h3 className="text-2xl font-medium text-black">
            {provider?.name || provider?.company_name}
          </h3>
        </div>
      </div>
      {type && type === "part" ? (
        <table className="w-full">
          <thead>
            <tr
              style={{
                textAlign: "left",
                color: "black",
                justifyContent: "space-evenly",
                display: "flex",
                width: "100%",
              }}
            >
              <th>گروه قطعات</th>
              <th>اسم قطعات </th>
              <th>شناسه قطعات </th>
            </tr>
          </thead>

          <tbody className="w-full">
            {provider &&
              provider.records &&
              provider?.records.map((record, index) => (
                <tr
                  key={index}
                  className="flex w-full h-full justify-evenly rounded-lg border border-gray-700 p-4 hover:border-pink-600 text-black my-5 "
                >
                  <td className=" text-justify">{record?.partgroup?.title}</td>
                  <td>{record?.partname?.title}</td>
                  <td>{record?.partgeneralid?.title}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <table className="w-full">
          <thead>
            <tr
              style={{
                textAlign: "left",
                color: "black",
                justifyContent: "space-evenly",
                display: "flex",
                width: "100%",
              }}
            >
              <th>گروه مواد</th>
              <th>اسم مواد </th>
              <th>گرید مواد </th>
            </tr>
          </thead>

          <tbody className="w-full">
            {provider &&
              provider.records &&
              provider?.records.map((record, index) => (
                <tr
                  key={index}
                  className="flex w-full h-full justify-evenly rounded-lg border border-gray-700 p-4 hover:border-pink-600 text-black my-5 "
                >
                  <td className=" text-justify">
                    {record?.materialgroup?.title}
                  </td>
                  <td>{record?.materialname?.title}</td>
                  <td>{record?.materialgrade?.title}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </article>
  );
};

export default Products;

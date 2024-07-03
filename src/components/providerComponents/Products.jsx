import React from "react";

const Products = ({ provider, type }) => {
  return (
    <article className="rounded-xl border border-gray-700 bg-gray-800 p-4">
      <div className="flex items-center gap-4">
        <img
          alt=""
          src={provider?.image?.url}
          className="size-16 rounded-full object-cover"
        />

        <div>
          <h3 className="text-lg font-medium text-white">{provider.name}</h3>
        </div>
      </div>
      {type && type === "part" ? (
        <table className="w-full">
          <thead>
            <tr
              style={{
                textAlign: "left",
                color: "white",
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
              provider?.records.map((record, index) => (
                <tr
                  key={index}
                  className="flex w-full h-full justify-evenly rounded-lg border border-gray-700 p-4 hover:border-pink-600 text-white my-5 "
                >
                  <td className=" text-justify">{record.partgroup?.title}</td>
                  <td>{record.partname?.title}</td>
                  <td>{record.partgeneralid?.title}</td>
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
                color: "white",
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
              provider?.records.map((record, index) => (
                <tr
                  key={index}
                  className="flex w-full h-full justify-evenly rounded-lg border border-gray-700 p-4 hover:border-pink-600 text-white my-5 "
                >
                  <td className=" text-justify">
                    {record.materialgroup.title}
                  </td>
                  <td>{record.materialname.title}</td>
                  <td>{record.materialgrade.title}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </article>
  );
};

export default Products;

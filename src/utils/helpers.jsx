export const formatPrice = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
};

export const getUniqueValues = (data) => {
  let unique = [];
  data &&
    data.map(
      (item) => unique.push(item?.title)
      //   {
      //   item.map((i) => unique.push(i.title));
      // }
    );

  return ["all", ...new Set(unique)];
};

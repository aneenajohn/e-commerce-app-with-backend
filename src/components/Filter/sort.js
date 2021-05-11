// import { useProduct } from "../productContext";

export function getSortedData(productList, sortBy) {
  // const { sortBy } = useProduct();
  console.log("sortBy inside sorting function", sortBy);
  if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
    console.log("inside high to low");
    return productList.sort((a, b) => b["price"] - a["price"]);
  }
  if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
    return productList.sort((a, b) => a.price - b.price);
  }
  console.log("out of sort");
  return productList;
}

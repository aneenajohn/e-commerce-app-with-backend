// import { useState } from "react";
// import axios from "axios";
// import { BACKEND_URL } from "./backendUrl";
// import { useProduct } from "./ProductList/productContext";

// export async function getAllProducts() {
//   let { products: productsData } = useProduct();
//   const [isLoading, setLoader] = useState(false);
//   try {
//     setLoader(true);
//     const {
//       data: { products: dataFromServer }
//     } = await axios.get(`${BACKEND_URL}products`);

//     productsData = dataFromServer;
//     console.log(productsData);
//     // setProductsData(dataFromServer);
//     setLoader(false);
//   } catch (err) {
//     console.error(`Error happened ${err}`);
//   }
// }

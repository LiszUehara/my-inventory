import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ProductContext = createContext({
  products: [],
});

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const addProducts = (newProduct) => {
    let createDate = new Date(newProduct.createDate)
    createDate.setHours(createDate.getHours()+3)
    setProducts([...products, { ...newProduct, id: uuidv4(), createDate: createDate  }]);
  };
  const editProduct = (id, description) => {
    let newProducts = products;
    let product = newProducts.find((product) => id === product.id);
    product.description = description
    setProducts(newProducts);
  };

  return (
    <ProductContext.Provider value={{ products, addProducts, editProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext };

export default ProductContextProvider;
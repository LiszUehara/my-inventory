import "./App.css";
import AppContextProvider from "./context/AppContext";
import ProductContextProvider from "./context/ProductContext";
import { Router } from "./routes";

export default function App() {

  return (
    <AppContextProvider>
      <ProductContextProvider>
        <Router />
      </ProductContextProvider>
    </AppContextProvider>
  );
}

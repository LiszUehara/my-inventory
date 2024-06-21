import "./App.css";
import AppContextProvider from "./context/AppContext";
import { Router } from "./routes";

export default function App() {

  return (
    <AppContextProvider>
      <Router />
    </AppContextProvider>
  );
}

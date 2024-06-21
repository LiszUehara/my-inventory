import "./App.css";
import DisciplineContextProvider from "./context/discipline";
import { Router } from "./routes";

export default function App() {

  return (
    <div className="App">
      <DisciplineContextProvider>
        <Router />
      </DisciplineContextProvider>
    </div>
  );
}

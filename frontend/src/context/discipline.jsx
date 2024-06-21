import { createContext, useState } from 'react';

const DisciplineContext = createContext({
    disciplines: [],
});


const DisciplineContextProvider = ({ children }) => {
    const [disciplines, setDisciplines] = useState([]);
    const addDisciplines  = (newDiscipline) => {
        setDisciplines([...disciplines, newDiscipline]);
    }

  return (
    <DisciplineContext.Provider value={{ disciplines, addDisciplines }}>
      {children}
    </DisciplineContext.Provider>
  );
};

export { DisciplineContext };

export default DisciplineContextProvider;
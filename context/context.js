import { useContext, createContext, useState, useCallback, useEffect } from "react";
import { getDBConnection, getAllExpenses, createTable, getAllTypes } from "../database/db-service";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);
    const [typeItems, setTypeItems] = useState([]);

    const loadData = useCallback(async () => {
        try {
            const db = await getDBConnection()
            createTable(db)
            //drop table
/*             db.transaction((tx) => {
              tx.executeSql('DROP TABLE IF EXISTS expenses', [], (tx, results) => {
                console.log('Results', results.rowsAffected);
              });
            }) */
  
            getAllExpenses(db, setExpenses)
            getAllTypes(db, setTypeItems)
    
        } catch (error) {
          console.error(error);
        }
      },[])
    
    useEffect(() => {
            loadData();
    }, [loadData]);
    
    return (
        <AppContext.Provider
        value={{
            expenses,
            setExpenses,
            typeItems,
            setTypeItems,
        }}
        >
        {children}
        </AppContext.Provider>
    );
}

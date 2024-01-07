import * as SQLite from 'expo-sqlite';

const expenseTable = "expenses"
const typeTable = "types"

export const getDBConnection = async () => {
  return SQLite.openDatabase('spent_data.db');
};

export const createTable = async (db) => {
    const expensesQuery = `CREATE TABLE IF NOT EXISTS ${expenseTable}(
          id varchar(255) NOT NULL,
          title varchar(255) NOT NULL,
          type varchar(255),
          amount int,
          date DATETIME NOT NULL,
          PRIMARY KEY (id)
      );`;

    const typesQuery = `CREATE TABLE IF NOT EXISTS ${typeTable}(
        id varchar(255) NOT NULL,
        name varchar(255) NOT NULL UNIQUE,
        color varchar(255) NOT NULL,
        PRIMARY KEY (id)
    );`;
  
    db.transaction(tx => tx.executeSql(expensesQuery,null,(tx,result) => {
        console.log(`table ${expenseTable} created`)
    },(tx,error) => {
        console.log(error)
    }));
    db.transaction(tx => tx.executeSql(typesQuery,null,(tx,result) => {
        console.log(`table ${typeTable} created`)
    },(tx,error) => {
        console.log(error)
    }));
};

export const insertExpense = async (db,expense,setExpenses) => {
    query = `INSERT INTO ${expenseTable} (id,title,type,amount,date) VALUES (?,?,?,?,?)`
    db.transaction(tx => tx.executeSql(query,[expense.id,expense.title,expense.type,expense.amount,expense.date],(tx,result) => {
        getAllExpenses(db, setExpenses)
    },(tx,error) => {
        console.log(error)
    }))
}

export const insertType = async (db,typeItem,setTypeItems) => {
    query = `INSERT INTO ${typeTable} (id,name,color) VALUES (?,?,?)`
    db.transaction(tx => tx.executeSql(query,[typeItem.id,typeItem.name,typeItem.color],(tx,result) => {
        getAllTypes(db, setTypeItems)
    },(tx,error) => {
        console.log(error)
    }))
}

export const deleteExpense = async (db,id,setExpenses) => {
    query = `DELETE FROM ${expenseTable} WHERE id = ?`
    db.transaction(tx => tx.executeSql(query,[id],(tx,result) => {
        getAllExpenses(db, setExpenses)
    },(tx,error) => {
        console.log(error)
    }))
}

export const deleteType = async (db,id,name,setTypeItems,setExpenses) => {

    updateQuery = `UPDATE ${expenseTable} SET type = ? WHERE type = ?`
    db.transaction(tx => tx.executeSql(updateQuery,["Other",name],(tx,result) => {
        getAllExpenses(db, setExpenses)
    },(tx,error) => {
        console.log(error)
    }))

    deleteQuery = `DELETE FROM ${typeTable} WHERE id = ?`
    db.transaction(tx => tx.executeSql(deleteQuery,[id],(tx,result) => {
        getAllTypes(db, setTypeItems)
    },(tx,error) => {
        console.log(error)
    }))
}

export const updateExpense = async (db,expense,setExpenses) => {
    query = `UPDATE ${expenseTable} SET title = ?, type = ?, amount = ?, date = ? WHERE id = ?`
    db.transaction(tx => tx.executeSql(query,[expense.title,expense.type,expense.amount,expense.date,expense.id],
        (tx,result) => {
            getAllExpenses(db, setExpenses)
        },(tx,error) => {
            console.log(error)
        }
    ))
}

export const updateType = async (db,typeItem,setTypeItems) => {
    query = `UPDATE ${typeTable} SET name = ?, color = ? WHERE id = ?`
    db.transaction(tx => tx.executeSql(query,[typeItem.name,typeItem.color,typeItem.id],
        (tx,result) => {
            getAllTypes(db, setTypeItems)
        },(tx,error) => {
            console.log(error)
        }
    ))
}

export const getAllExpenses = async (db,setExpenses) => {
    const query = `SELECT * FROM ${expenseTable}`
    db.transaction(tx => tx.executeSql(query,null,(tx,result) => setExpenses(result.rows._array)))
}

export const getAllTypes = async (db,setTypeItems) => {
    const query = `SELECT * FROM ${typeTable}`
    await db.transaction(tx => tx.executeSql(query,null,(tx,result) => setTypeItems(result.rows._array)))
}

export const getSingleExpense = async (db,id) => {
    const query = `SELECT * FROM ${expenseTable} WHERE id = ${id}`
    const result = await db.transaction(tx => tx.executeSql(query))
    return result.rows
}



import React, { useEffect, useState } from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import Form from './components/Form';
import Alert from './components/Alert';
import { v4 as uuidv4 } from 'uuid';

//localstorage.getItem('item name');
//localstorage.setItem('item name');

const initialExpenses = localStorage.getItem("expenses")
? JSON.parse(localStorage.getItem("expenses")) : [];
function App() {

//--------- state values -----------

// for all expense, and add expenses
  const [expenses, setExpenses] = useState(initialExpenses);
// single expense 
  const [charge, setCharge] = useState("");
// single amount
  const [amount, setAmount] = useState("");
//alert
const[alert, setAlert] = useState({show:false});
// edit  
const [edit, setEdit] = useState(false);
//edit item
const [id, setId] = useState(0);


//--------- UseEffect -----------
useEffect(() => {
  console.log('we called useEffect');
  localStorage.setItem('expenses', JSON.stringify(expenses));
}, [expenses]);

//--------- functionality -----------

//handle charge
  const handleCharge = e =>{
    /*console.log(`charge : ${e.target.value}`)*/
    setCharge(e.target.value)
  }

// handle amount
  const handleAmount = e =>{
    /*console.log(`amount : ${e.target.value}`)*/
    setAmount(e.target.value)
  }

  // handle alert 
    const handleAlert = ({type, text}) => {
      setAlert({show:true, type, text});
      setTimeout(() => {
      setAlert({show:false})
      },5000)
    }


  // handle submit
  const handleSubmit = e =>{
    e.preventDefault();
    /*console.log(charge, amount);*/
    if(charge !== "" && amount > 0){
  if(edit){
    let tempExpenses = expenses.map(item => {
      return item.id === id?{...item,charge,amount}:item;
    });
    setExpenses(tempExpenses);
    setEdit(false);
    handleAlert({type:"success", text:"item has been edited"});
  }else{
    const singleExpense = {id: uuidv4(),charge:charge, amount:amount};
      setExpenses([...expenses, singleExpense]);
      handleAlert({type:"success", text:"item has been added"});
  }
      setCharge("");
      setAmount("");

    }else{
      //handle alert called
      handleAlert({type:'danger', text:`charge can not be empty and the amount has to be larger than zero`
    });
    }
  };
    // clear all the items
    const clearItems = () => {
      /*console.log("cleared all items");*/
    setExpenses([]);
    handleAlert({type: "danger", text:"all items have been deleted"})
    };

    // handle delete
    const handleDelete = (id) => {
      let tempExpenses = expenses.filter(item => item.id !== id);
      console.log(tempExpenses);  
      setExpenses(tempExpenses);
      handleAlert({type: "danger", text: "item deleted"});
    };

    // handle edit
    const handleEdit = (id) => {
      let expense = expenses.find(item => item.id === id)
      let {charge, amount} = expense;
      setCharge(charge);
      setAmount(amount);
      setEdit(true);
      setId(id);
    };
    

  return (
  <>
    {alert.show && <Alert type={alert.type} text={alert.text}/>}
    <Alert/>
      <h1>BUDGET CALCULATOR</h1>
      <main className='App'>
        <Form 
        charge={charge} 
        amount={amount} 
        handleAmount={handleAmount} 
        handleCharge={handleCharge} 
        handleSubmit={handleSubmit}
        edit={edit}
        />
        <ExpenseList 
        expenses ={expenses} 
        handleDelete= {handleDelete} 
        handleEdit={handleEdit}
        clearItems={clearItems}
        />
      </main>
      <h1>Total Spend : 
        <span className='total'>${expenses.reduce((acc,curr)=>{
            return (acc += parseInt(curr.amount));
          },0)}
        </span>
      </h1>

    </>
  );
}

export default App;

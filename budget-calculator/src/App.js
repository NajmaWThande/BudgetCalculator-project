import React, { useState } from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import Form from './components/Form';
import Alert from './components/Alert';
import { v4 as uuidv4 } from 'uuid';


const initialExpenses = [
{id:uuidv4(), charge:"rent", amount:1600},
{id:uuidv4(), charge:"car payment", amount:400},
{id:uuidv4(), charge:"credit card bill", amount:1200},
{id:uuidv4(), charge:"Gas", amount:100},
{id:uuidv4(), charge:"insuarance", amount:1100},
{id:uuidv4(), charge:"food", amount:300},
{id:uuidv4(), charge:"internet bill", amount:150},
{id:uuidv4(), charge:"other", amount:800}

];
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
      const singleExpense = {id: uuidv4(),charge:charge, amount:amount};
      setExpenses([...expenses, singleExpense]);
      handleAlert({type:"success", text:"item has been added"});
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
      console.log("cleared all items");
    };

    // handle delete
    const handleDelete = (id) => {
      console.log(`items deleted : ${id}`);
    }

    // handle edit
    const handleEdit = (id) => {
      console.log(`item has been edited : ${id}`);
    }

  return (
  <>
    {alert.show && <Alert type={alert.type} text={alert.text}/>}
    <Alert/>
      <h1>Budget Calculator</h1>
      <main className='App'>
        <Form 
        charge={charge} 
        amount={amount} 
        handleAmount={handleAmount} 
        handleCharge={handleCharge} 
        handleSubmit={handleSubmit}
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

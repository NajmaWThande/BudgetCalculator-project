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
  const [charge, setCharge] = useState('');
// single amount
  const [amount, setAmount] = useState('');
//--------- functionality -----------

  const handleCharge = e =>{
    console.log(`charge : ${e.target.value}`)
    setCharge(e.target.value)
  }
  const handleAmount = e =>{
    console.log(`amount : ${e.target.value}`)
    setAmount(e.target.value)
  }
  const handleSubmit = e =>{
    e.preventDefault();
  }

  return <>
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
        <ExpenseList expenses ={expenses}/>
      </main>
      <h1>Total Spend : 
        <span className='total'>${expenses.reduce((acc,curr)=>{
            return (acc += curr.amount);
          },0)}
        </span>
      </h1>
    



    </>;
}

export default App;

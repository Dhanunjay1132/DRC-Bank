import React, { useState } from 'react'
import './index.css'
import HomePage from './pages/home';
import CreatAccount from './pages/creatAccount';
import { Route, Routes } from 'react-router-dom';
import ViewAccounts from './pages/ViewAccounts';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import Transfer from './pages/Transfer';
// import { TodoPage } from './assets/components/todo'
// import { LoginPage } from './assets/components/login'
// import ShoppingCart from './assets/components/ShoppingCart';
// import HomeApi from './assets/components/api'; // Importing the HomeApi component

// import ChatBot from './assets/components/chatboat';
// import { Practice } from './assets/components/practice';
 

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [username, setUsername] = useState(""); //  to store logged in name
  
  // const handleLogin = (name) => {
  //   setUsername(name);
  //   setIsLoggedIn(true);
  // };
  
  const [accounts, setAccounts] = useState([
    
   ]); // To store created accounts
   
   const addAccount = (accountObj) => {
     setAccounts(Prev=> [...accounts, accountObj]);
   }

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage accounts={accounts}/>} />  
      <Route path="/create" element={<CreatAccount addAccount = {addAccount}/>} /> 
      <Route path="/accounts" element={<ViewAccounts accounts= {accounts}/>} />   
      <Route path="/deposit" element={<Deposit accounts={accounts} setAccounts={setAccounts} />} /> 
      <Route path="/withdraw" element={<Withdraw accounts={accounts} setAccounts={setAccounts}/>} />   
      <Route path="/transfer" element={<Transfer accounts={accounts} setAccounts={setAccounts}/>} />   
       
    </Routes>














     {/* <Practice></Practice>  */}
    {/* <div className="min-h-screen bg-gray-200 flex items-center justify-center bg-gradient-to-r from-blue-200 to-blue-500">
    <ChatBot /> */}
      {/* <HomeApi></HomeApi> */}
       {/* {isLoggedIn ? (
        <TodoPage username={username} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}  */}

      {/* <div className="min-h-screen bg-gray-200 flex items-center justify-center bg-gradient-to-r from-blue-200 to-blue-500">
      <ShoppingCart />
    </div>   */}
    
    </>
  );
}


export default App;
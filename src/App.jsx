import './App.css'
import HomePage from './components/HomePage/HomePage';
import OrderPage from './components/OrderPage/OrderPage';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Success from './components/SuccessPage/Success';
import { useState } from 'react';


function App() {
  const [orderDetails, setOrderDetails] = useState();

  return (

    <>
    <Switch>

      <Route path='/' exact><HomePage /></Route>
      <Route path='/OrderPage'><OrderPage setOrderDetails={setOrderDetails} /></Route>
      <Route path="/success/"><Success orderDetails={orderDetails}/></Route>
      
    </Switch>
      
    </>
  )
}

export default App

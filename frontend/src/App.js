import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './containers/Home'
import Login from './containers/Login'
import Register from './containers/Register'
import Activate from './containers/Activate'
import ResetPassword from './containers/ResetPassword'
import ResetPasswordConfirm from './containers/ResetPasswordConfirm'
import Recommendation from "./containers/Recommendation";
import ItemList from "./containers/ItemList";
import Item from "./containers/Item";
import Wardrobe from "./containers/Wardrobe";

import { Provider } from "react-redux";
import store from "./store";

import Layout from "./hocs/Layout";


const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/register' element={<Register/>} />
          <Route exact path='/reset-password' element={<ResetPassword/>} />
          <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>} />
          <Route exact path='/activate/:uid/:token' element={<Activate/>} />
          <Route exact path='/recommendation' element={<Recommendation/>} />
          <Route exact path='/item-list' element={<ItemList/>} />
          <Route exact path='/item-list/:id' element={<Item/>} />
          <Route exact path='/wardrobe' element={<Wardrobe/>} />
        </Routes>
      </Layout>
    </Router>
  </Provider>

);

export default App;
import './Page.css';
import { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/Navigation/Home/Home';
import About from '../components/Navigation/About/About';
import Contacts from '../components/Navigation/Contacts/Contacts';
import Divisions from '../components/Navigation/Divisions/Divisions';
import Admin from '../components/Navigation/Admin/Admin';

const Page = () => {
  
  return (   
    <div className="Page">
      <Layout>
        <Switch>
          <Route path='/pages' exact component={Home} />
          <Route path='/pages/about' component={About} />
          <Route path='/pages/contacts' component={Contacts} />
          <Route path='/pages/divisions' component={Divisions} />
          <Route path='/pages/admin' component={Admin} />
          
        </Switch>
     </Layout>
    </div>
  );
}

export default Page;

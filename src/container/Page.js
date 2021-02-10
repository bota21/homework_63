import './Page.css';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/Navigation/Home/Home';
import About from '../components/Navigation/About/About';
import Contacts from '../components/Navigation/Contacts/Contacts';
import Divisions from '../components/Navigation/Divisions/Divisions';
import Admin from '../components/Navigation/Admin/Admin';
import NotFound from '../NotFound';
import axios from 'axios';
import Spinner from '../components/ModalWindow/Spinner/Spinner';

const Page = () => {
  const [loading, setLoading] = useState(true)
  const [homeData, setHomeData] = useState([]);
  const [aboutData, setAboutData] = useState([]);
  const [contactsData, setContactsData] = useState([]);
  const [divisionsData, setDivisionsData] = useState([]);

  let multiFunction = (url, arr) => {
    let fetchData = async () => {
      let response = await axios.get(url);
      let fetchedData = Object.keys(response.data).map(id => {
        return { ...response.data, id }
      })
      arr(fetchedData)
    }
    fetchData().finally(() => setLoading(false))
  }
  useEffect(() => {
    multiFunction('home.json', setHomeData)
  }, [loading]);

  useEffect(() => {
    multiFunction('about.json', setAboutData)
  }, [loading]);

  useEffect(() => {
    multiFunction('contacts.json', setContactsData)
  }, [loading]);

  useEffect(() => {
    multiFunction('divisions.json', setDivisionsData)
  }, [loading]);

  return (
    <div className="Page">
      <Layout>
        {loading ? <Spinner /> : null}
        <Switch>
          <Route path='/pages' exact render={() => <Home array={homeData} />} />
          <Route path='/pages/about' render={() => <About array={aboutData} />} />
          <Route path='/pages/contacts' render={() => <Contacts array={contactsData} />} />
          <Route path='/pages/divisions' render={() => <Divisions array={divisionsData} />} />
          <Route path='/pages/admin' component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </div>
  );
}

export default Page;

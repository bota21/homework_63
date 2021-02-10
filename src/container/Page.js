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
  const [adminValue, setAdminValue] = useState([
    { input: '', textarea: '' }
  ]);
  const [select, setSelected] = useState({ value: 'about' })

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
  }, [homeData]);

  useEffect(() => {
    multiFunction('about.json', setAboutData)
  }, [aboutData]);

  useEffect(() => {
    multiFunction('contacts.json', setContactsData)
  }, [contactsData]);

  useEffect(() => {
    multiFunction('divisions.json', setDivisionsData)
  }, [divisionsData]);

  let changeAdminValue = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setAdminValue({ ...adminValue, [name]: value })
  }

  let submitFormAdmin = (e) => {
    e.preventDefault();
    setLoading(true);
    let fetchData = async () => {
      try {
        let changeValue = { title: adminValue.input, content: adminValue.textarea };
        let response = await axios.put(select.value + '.json', changeValue);
        setAdminValue({ input: '', textarea: '' })
      } catch (e) {
        console.error(e);
      }
    }
    fetchData().finally(() => setLoading(false))
  }
  let changeSelect = (e) => {
    setSelected({ value: e.target.value })
  }

  return (
    <div className="Page">
      <Layout>
        {loading ? <Spinner /> : null}
        <Switch>
          <Route path='/pages/home' exact render={() => <Home array={homeData} />} />
          <Route path='/pages/about' render={() => <About array={aboutData} />} />
          <Route path='/pages/contacts' render={() => <Contacts array={contactsData} />} />
          <Route path='/pages/divisions' render={() => <Divisions array={divisionsData} />} />
          <Route path='/pages/admin' render={() => {
            return <Admin
              change={changeAdminValue}
              submit={submitFormAdmin}
              input='input'
              textarea='textarea'
              inputvalue={adminValue.input}
              textareaValue={adminValue.textarea}
              changeSelect={changeSelect}
              selectValue={select.value}
              homeValue='home'
              aboutValue='about'
              contactsValue='contacts'
              DivisionsValue='divisions'
            />
          }} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </div>
  );
}

export default Page;

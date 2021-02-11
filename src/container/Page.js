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

  useEffect(() => {
    let fetchData = async () => {
      try {
        let responseHome = await axios.get("home.json");
      let responseAbout = await axios.get("about.json");
      let responseContacts = await axios.get("contacts.json");
      let responseDivisions = await axios.get("divisions.json");
      Promise.all([
        responseAbout,
        responseHome,
        responseContacts,
        responseDivisions,
      ]).then(function (results) {
        setHomeData(results[1].data);
        setAboutData(results[0].data);
        setContactsData(results[2].data);
        setDivisionsData(results[3].data);
      });
      } catch (e) {
        throw new console.error(e);
      }      
    };
    fetchData().finally(() => setLoading(false));
  }, [loading]);

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
        await axios.put(select.value + '.json', changeValue);
        setAdminValue({ input: '', textarea: '' });
        window.location.href='/pages/'+select.value;
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
        <Route path='/' exact component={Home}/>
          <Route path='/pages' exact component={Home}/>
          <Route path='/pages/home' render={() => <Home
           title={homeData.title} content={homeData.content}
          />} />
          <Route path='/pages/about' render={() => <About
             title={aboutData.title} content={aboutData.content}
          />} />
          <Route path='/pages/contacts' render={() => <Contacts
             title={contactsData.title} content={contactsData.content}
          />} />
          <Route path='/pages/divisions' render={() => <Divisions
             title={divisionsData.title} content={divisionsData.content}
          />} />
         
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

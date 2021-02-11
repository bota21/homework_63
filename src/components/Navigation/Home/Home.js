import './Home.css';

const Home = props => {
    return <main className="Main">
        <h2>{props.title}</h2>
        <p>{props.content}</p>
    </main>
}

export default Home
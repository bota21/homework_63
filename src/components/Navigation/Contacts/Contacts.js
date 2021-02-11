const Contacts = props => {
    let renderPage = props.ar
    return <main className="Main">
        <h2>{props.title}</h2>
        <p>{props.content}</p>
    </main>
}

export default Contacts
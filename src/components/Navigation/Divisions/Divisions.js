const Divisions = props => {
    let renderPage = props.array.map(item => {
        return <div key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.content}</p>
        </div>
    })
    return <main className="Main">
        {renderPage}
    </main>
}

export default Divisions
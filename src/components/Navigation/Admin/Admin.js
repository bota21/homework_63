import './Admin.css';

const Admin = props => {
    return <form onSubmit={props.submit}>
        <main className="Admin">
            <h2>Edit pages</h2>
            <div className="form_wrapper">
                <label htmlFor="select" value={props.selectValue}>Select page</label>
                <select id='select' onChange={props.changeSelect}>
                    <option value={props.homeValue}>Home</option>
                    <option value={props.aboutValue}>About</option>
                    <option value={props.contactsValue}>Contacts</option>
                    <option value={props.DivisionsValue}>Divisions</option>
                </select>
            </div>
            <div className="form_wrapper">
                <label htmlFor="input">Title</label>
                <input type="text" id='input'
                    name={props.input}
                    value={props.inputValue}
                    onChange={props.change} />
            </div>
            <div className="form_wrapper">
                <label htmlFor="textarea">Content</label>
                <textarea name={props.textarea} id="textarea"
                    onChange={props.change}
                    value={props.textareaValue}
                >
                </textarea>
            </div>
            <button>Save</button>
        </main>
    </form>

}

export default Admin
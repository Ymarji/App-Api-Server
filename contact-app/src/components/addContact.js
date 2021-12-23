import react from "react";
class AddContact extends react.Component {
    state = {
        name: "",
        email: "",
    };
    add = (e) => {
        e.preventDefault();
        if (this.state.name === "" || this.state.email === ""){
            alert("All the Fields are mandatory!");
            return;
        }
        this.props.addContactHandeler(this.state);
        this.setState({name: "" , email: ""});
        this.props.history.push("/");
    }
    render() {
        return (
            <div className="ui main">
                <h2>
                    Add Contact
                </h2>
                <form className="ui form" onSubmit={this.add}>
                    <div className="field">
                        <label>Name</label>
                        <div>
                            <input
                            type="text"
                            name="text"
                            placeholder="Name ..."
                            value={this.state.name}
                            onChange={(e) => this.setState({name: e.target.value})}/>
                        </div>
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <div>
                            <input
                            type="text"
                            name="email"
                            placeholder="Email ..."
                            value={this.state.email}
                            onChange={(e) => this.setState({email: e.target.value})}/>
                        </div>
                    </div>
                    <button className="ui button blue">Add contact</button>
                </form>
            </div>
        )
    }
}

export default AddContact;
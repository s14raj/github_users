import { useState } from "react";
const axios = require('axios').default;

function CardList(props) {
  return (
    <div>
      {props.profiles.map(profile => <Card {...profile} />)}
    </div>
  );
}

function Form(props) {

  const [userinput, changeValue] = useState('');


  async function handleSubmit(event) {
    event.preventDefault();
    const res = await axios.get(`https://api.github.com/users/${userinput}`);
    props.onSubmit(res.data);
    const clean = () => changeValue('');
    clean();
  }


  return (
    <div>
      <div style={{ textAlign: "center", fontWeight: "bolder", fontSize: 30 }}> Add GitHub Users:</div>
      <br />
      <form onSubmit={handleSubmit}>
        <input type="text"
          value={userinput}
          placeholder="GitHub UserName..." required
          onChange={(e) => changeValue(e.target.value)}
        />

        <button>Add User</button>
      </form>
    </div>
  );
}
function Card(props) {
  const profile = props;
  return (
    <div className="github-profile">
      <img src={profile.avatar_url} />
      <div className="info">
        <div className="name">{profile.name}</div>
        <div className="company">{profile.company}</div>
      </div>
    </div>
  );
}

function App() {

  const [userprofiles, addprofile] = useState([]);

  const updatedprofiles = (profiledata) => addprofile([...userprofiles, profiledata]);


  return (
    <div>
      <Form onSubmit={updatedprofiles} />
      <CardList profiles={userprofiles} />
    </div>
  );
}

export default App;

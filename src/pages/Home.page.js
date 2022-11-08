import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "/Users/sandeepjain/mongoauth/src/contexts/user.contexts.js";

export default function Home() {
  const { logOutUser } = useContext(UserContext);
  const [form, setForm] = useState({
    age: "",
    condition: ""
  });

  const logOut = async () => {
    try {
      const loggedOut = await logOutUser();
      if (loggedOut) {
        window.location.reload(true);
      }
    } catch (error) {
      alert(error)
    }
  }

  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = () => {
    if (form.age && form.condition) {
      console.log("AGE: " + form.age);
      console.log("CONDITION: " + form.condition);
    } else {
      alert("Please fill both fields before proceeding")
    }
  }

  return <form style={{ display: "flex", flexDirection: "column", maxWidth: "500px", margin: "auto" }}>
      <h1 style={{paddingTop: "30px", paddingBottom: "10px"}}>Patient Information</h1><br></br>

      <h3>Age</h3>
      <TextField
        label="Age"
        variant="outlined"
        name="age"
        value={form.age}
        onChange={onFormInputChange}
        style={{ marginBottom: "1rem" }}
      />

      <h3>Condition</h3>
      <TextField
        label="Condition"
        variant="outlined"
        name="condition"
        value={form.condition}
        onChange={onFormInputChange}
        style={{ marginBottom: "1rem" }}
      />

      <br/>
      <Button variant="contained" color="primary" onClick={onSubmit} style={{marginBottom: "25px", fontWeight: "bold"}}>
        Submit
      </Button>

      <br/><br/><br/><br/><br/><br/><br/><br/>
      <Button variant="contained" onClick={logOut}>Log Out</Button>
  </form>
}
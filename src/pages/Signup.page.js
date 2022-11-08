import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "/Users/sandeepjain/mongoauth/src/contexts/user.contexts.js";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // As explained in the Login page.
  const { emailPasswordSignup } = useContext(UserContext);
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  // As explained in the Login page.
  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };


  // As explained in the Login page.
  const redirectNow = () => {
    const redirectTo = location.search.replace("?redirectTo=", "");
    navigate(redirectTo ? redirectTo : "/");
  }

  // As explained in the Login page.
  const onSubmit = async () => {
    try {
      const user = await emailPasswordSignup(form.email, form.password);
      if (user) {
        redirectNow();
      }
    } catch (error) {
      alert("Sign up was not successful: please ensure that you have typed in a valid email and a password that is at least 6 characters long.");
    }
  };

  return <form style={{ display: "flex", flexDirection: "column", maxWidth: "500px", margin: "auto" }}>
    <h1 style={{paddingTop: "30px", paddingBottom: "10px"}}>Sign Up</h1><br></br>
    <TextField
      label="Email"
      type="email"
      variant="outlined"
      name="email"
      value={form.email}
      onInput={onFormInputChange}
      style={{ marginBottom: "1rem" }}
    />
    <TextField
      label="Password"
      type="password"
      variant="outlined"
      name="password"
      value={form.password}
      onInput={onFormInputChange}
      style={{ marginBottom: "1rem" }}
    />
    <Button variant="contained" color="primary" onClick={onSubmit} style={{marginBottom: "25px", fontWeight: "bold"}}>
      Sign up
    </Button>
    <p style={{fontSize: "20px", fontFamily: "futura"}}>Have an account already? <Link to="/login">Log In</Link></p>
  </form>
}

export default Signup;
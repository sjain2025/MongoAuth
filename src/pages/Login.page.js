import { Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "/Users/sandeepjain/mongoauth/src/contexts/user.contexts.js";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const redirectNow = () => {
    const redirectTo = location.search.replace("?redirectTo=", "");
    navigate(redirectTo ? redirectTo : "/");
  }

  const loadUser = async () => {
    if (!user) {
      const fetchedUser = await fetchUser();
      if (fetchedUser) {
        redirectNow();
      }
    }
  }

  useEffect(() => {
    loadUser(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (event) => {
    try {
      const user = await emailPasswordLogin(form.email, form.password);
      if (user) {
        redirectNow();
      }
    } catch (error) {
      alert("Login was invalid: please create an account or type in the email and password associated with your account to log in.")
    }
  };

  return <form style={{ display: "flex", flexDirection: "column", maxWidth: "500px", margin: "auto" }}>
    <h1 style={{paddingTop: "30px", paddingBottom: "10px"}}>Login</h1><br></br>
    <TextField
      label="Email"
      type="email"
      variant="outlined"
      name="email"
      value={form.email}
      onChange={onFormInputChange}
      style={{ marginBottom: "1rem" }}
    />
    <TextField
      label="Password"
      type="password"
      variant="outlined"
      name="password"
      value={form.password}
      onChange={onFormInputChange}
      style={{ marginBottom: "1rem" }}
    />
    <Button variant="contained" color="primary" onClick={onSubmit} style={{marginBottom: "25px", fontWeight: "bold"}}>
      Login
    </Button>
    <p style={{fontSize: "20px", fontFamily: "futura"}}>Don't have an account? <Link to="/signup">Sign Up</Link></p>
  </form>
}

export default Login;
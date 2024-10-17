import React, { useState } from "react";
import "./style.css";
import Form from "react-bootstrap/Form";
import { FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    favClass: "1",
  });

  // Estado para controlar si se debe mostrar el mensaje de error del mail
  const [showError, setShowError] = useState(false);

  // Estado para controlar si se debe mostrar el mensaje de error de la contraseña
  const [showPasswordError, setShowPasswordError] = useState(false);

  const handleEmailChange = (e) => {
    setFormValues({ ...formValues, email: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setFormValues({ ...formValues, password: e.target.value });
  };

  // Función para validar el correo electrónico
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // Función para validar la contraseña
  // Función para validar la contraseña
  const validatePassword = (password) => {
    const minLong = 8;
    const tieneSimbolo = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const tieneMayuscula = (password.match(/[A-Z]/g) || []).length >= 2;
    const tieneMinuscula = /[a-z]/.test(password);

    return (
      password.length >= minLong &&
      tieneSimbolo &&
      tieneMayuscula &&
      tieneMinuscula
    );
  };

  const clickSubmit = () => {
    //Se verifica el email y la contraseña
    let newEmail = formValues.email;
    let newPassword = formValues.password;

    const isValidEmail = validateEmail(newEmail);
    const isValidPassword = validatePassword(newPassword);

    console.log(isValidEmail);
    console.log(isValidPassword);

    if (!isValidEmail) {
      setShowError(true);
    } else {
      setShowError(false);
    }

    if (!isValidPassword) {
      setShowPasswordError(true);
    } else {
      setShowPasswordError(false);
    }

    if (isValidEmail && isValidPassword) {
      // Perform login logic here (e.g., API call)
      // If login is successful, navigate to home
      navigate("/home", { state: { email: newEmail, password: newPassword } });
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Funciones para enviar a cada red social:
  const handleFacebookLogin = () => {
    window.open("https://www.facebook.com", "_blank");
  };

  const handleTwitterLogin = () => {
    window.open("https://www.twitter.com", "_blank");
  };

  const handleGoogleLogin = () => {
    window.open("https://www.google.com", "_blank");
  };

  return (
    <div className="login-background">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 d-flex flex-row">
          {/* Auth social */}
          <div className="social-auth-sidebar me-4">
            <h4 className="text-center mb-4">Login with</h4>
            <div className="d-grid gap-2">
              <Button
                variant="primary"
                className="mb-2 d-flex align-items-center justify-content-center"
                style={{ backgroundColor: "#3b5998", borderColor: "#3b5998" }}
                onClick={handleFacebookLogin}
              >
                <span className="text-white">Signin with Facebook</span>
              </Button>
              <Button
                variant="info"
                className="mb-2 d-flex align-items-center justify-content-center"
                style={{ backgroundColor: "#1DA1F2", borderColor: "#1DA1F2" }}
                onClick={handleTwitterLogin}
              >
                <span className="text-white">Signin with Twitter</span>
              </Button>
              <Button
                variant="danger"
                className="d-flex align-items-center justify-content-center"
                style={{ backgroundColor: "#db4437", borderColor: "#db4437" }}
                onClick={handleGoogleLogin}
              >
                <span className="text-white">Signin with Google</span>
              </Button>
            </div>
          </div>

          {/* Divisor */}
          <div className="vr mx-4"></div>

          <div>
            <h3 className="text-center">Log in</h3>
            {/* Form login */}
            <Form>
              <Form.Group className="mb-6" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={handleEmailChange}
                  value={formValues.email}
                  className={`form-control ${
                    showError ? "border border-danger" : ""
                  }`}
                  isInvalid={showError}
                />
                {showError && (
                  <FormControl.Feedback type="invalid">
                    <div className="fieldError">
                      Su email debe seguir un formato válido.
                    </div>
                  </FormControl.Feedback>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={handlePasswordChange}
                    value={formValues.password}
                    className={`form-control ${
                      showPasswordError ? "border border-danger" : ""
                    }`}
                    isInvalid={showPasswordError}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                  {setShowPasswordError && (
                    <Form.Text className="invalid-feedback">
                      Your password should be have numbers and letters and
                      should be at least 9 char long
                    </Form.Text>
                  )}
                </div>
              </Form.Group>
              <Button variant="primary" onClick={clickSubmit}>
                Login with email
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginComponent;

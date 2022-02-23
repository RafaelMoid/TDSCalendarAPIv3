import React from "react";
import {
  Box,
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon } from '@chakra-ui/icons'
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../providers/auth";
import { authenticate } from "../../services/requestFunctions";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import Animation from "./Animation";


import "./styles.scss";

const Login = () => {
  const [loginErrors, setLoginErrors] = React.useState("");
  const auth = React.useContext(AuthContext);
  const history = useHistory();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleLogin = (values) => {
    authenticate(values)
      .then((response) => {
        if (response.data) {
          auth.setApiToken(response.data.access_token);
          auth.setIsAuthenticated(!auth.isAuthenticated);
          history.push("/");
        }
      })
      .catch((err) => {
        if (err.message === "Request failed with status code 403") {
          setLoginErrors("Acesso negado: email ou senha inválidos!");
        } else {
          setLoginErrors(err.message);
        }
      });
  };

  const handleLogout = () => {
    auth.setApiToken("");
    auth.setIsAuthenticated(!auth.isAuthenticated);
  };

  return (
    <>
      {auth.isAuthenticated && (
        <div>
          <h3>Bem vindo!</h3>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      {!auth.isAuthenticated && (
        <div id="login-container">

          <aside>
              <div className="logo">
                <Logo />
                <h1>strateegia.calendar</h1>
              </div>
              <Animation />
              <p className="wellcomeP">Seus pontos de conversação sincronizados com sua google agenda</p>
          </aside>

          <main>
            <div className="login-form">
              <h2>Login</h2>
              <p>Insira sua informações de login da strateegia</p>
              <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
                  <FormControl isInvalid={errors.email} mt="10">
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents='none'
                        children={<EmailIcon color='gray'/>}
                        />
                      <Input
                        id="email"
                        type="email"
                        placeholder="email"
                        {...register("email", {
                          required: "campo obrigatório *",
                        })}
                        />
                    </InputGroup>
                    <FormErrorMessage color="#dc0362">
                      {errors.email && errors.email.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.password}>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents='none'
                        children={<LockIcon color='gray' />}
                        />
                      <Input
                        id="password"
                        type="password"
                        placeholder="senha"
                        {...register("password", {
                          required: "campo obrigatório *",
                        })}
                        />
                    </InputGroup>
                    <FormErrorMessage color="#dc0362">
                      {errors.password && errors.password.message}
                    </FormErrorMessage>
                  </FormControl>
                  {loginErrors && <Box color="#dc0362">{loginErrors}</Box>}
                  <div className="login-btn">
                    <Button mt={4} isLoading={isSubmitting} type="submit">
                      Login
                    </Button>
                  </div>
                </form>
              </div>
          </main>

        </div>
      )}
    </>
  );
};

export default Login;

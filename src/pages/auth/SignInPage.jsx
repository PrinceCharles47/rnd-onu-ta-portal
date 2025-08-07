import {
  Button,
  Box,
  Container,
  Stack,
  PasswordInput,
  Text,
  TextInput,
  Image,
  useComputedColorScheme,
} from "@mantine/core";

import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../hooks/auth/useAuth";

import logoLight from "../../assets/V_ConvergeLogo_Color.png";
import logoDark from "../../assets/V_ConvergeLogo_White.png";

import classes from "../../styles/Auth.module.css";
import { isNotEmpty, useForm } from "@mantine/form";

import { useContext } from "react";
import AuthContext from "../../providers/AuthProvider";
import { useNavigate } from "react-router";

export default function SignInPage() {
  const { auth, setAuth } = useContext(AuthContext);
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: isNotEmpty("Username is required."),
      password: isNotEmpty("Password is required"),
    },
  });

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      console.log("Login success", response);
      setAuth(response);
      navigate("/");
    },
    onError: (err) => {
      console.error("Login failed", err);
    },
  });

  const handleLogin = () => {
    const formData = form.getValues();
    if (formData) {
      mutate(formData);
    }
  };

  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <div className={classes.signInContainer}>
      <Container size={420} my={40}>
        <Stack align="center">
          <Image
            src={computedColorScheme === "light" ? logoLight : logoDark}
            maw={200}
          />
          <Text ta="center" fw={500} c="dimmed">
            ONU TYPE APPROVAL PORTAL
          </Text>
        </Stack>

        <Text>{JSON.stringify(auth)}</Text>

        <Box mt={50} miw={300}>
          <form onSubmit={form.onSubmit(handleLogin)}>
            <TextInput
              label="Username"
              placeholder="you@mantine.dev"
              radius="md"
              key={form.key("username")}
              {...form.getInputProps("username")}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              mt="md"
              radius="md"
              key={form.key("password")}
              {...form.getInputProps("password")}
            />
            <Button fullWidth mt="xl" radius="md" type="submit">
              Sign in
            </Button>

            <Button fullWidth mt="xl" radius="md" onClick={logout}>
              Sign out
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
}

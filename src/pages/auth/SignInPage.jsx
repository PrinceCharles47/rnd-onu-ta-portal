import {
  Button,
  Box,
  Container,
  Stack,
  PasswordInput,
  Text,
  TextInput,
  Image,
  Divider,
  useComputedColorScheme,
  Paper,
} from "@mantine/core";

import logoLight from "../../assets/V_ConvergeLogo_Color.png";
import logoDark from "../../assets/V_ConvergeLogo_White.png";

import classes from "../../styles/Auth.module.css";
import { isNotEmpty, useForm } from "@mantine/form";

import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/auth/useAuth";

export default function SignInPage() {
  const { logIn, logInStatus } = useAuth();

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

  const handleLogin = () => {
    const formData = form.getValues();
    formData && logIn(formData);
  };

  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  useEffect(() => {
    logInStatus === "success" && navigate("/");
  }, [logInStatus]);

  return (
    <div className={classes.signInContainer}>
      <Paper withBorder p="xl" radius="lg">
        <Stack gap="xl">
          <Stack align="center">
            <Image
              src={computedColorScheme === "light" ? logoLight : logoDark}
              maw={75}
            />
            <Text size="sm" ta="center" fw={700} c="dimmed">
              ONU TYPE APPROVAL PORTAL
            </Text>
          </Stack>

          <Box miw={300}>
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
            </form>
          </Box>
        </Stack>
      </Paper>
    </div>
  );
}

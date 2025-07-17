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

import logoLight from "../../assets/V_ConvergeLogo_Color.png";
import logoDark from "../../assets/V_ConvergeLogo_White.png";

import classes from "../../styles/Auth.module.css";
import { isNotEmpty, useForm } from "@mantine/form";

export default function SignInPage() {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

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

  const validate = () => {
    console.log(form.getValues());
  };

  return (
    <div className={classes.signInContainer}>
      <Container size={420} my={40}>
        <Stack align="center">
          <Image src={computedColorScheme === "light" ? logoLight : logoDark} maw={200}/>
          <Text ta="center" fw={500} c="dimmed">
            ONU TYPE APPROVAL PORTAL
          </Text>
        </Stack>

        <Box mt={50} miw={300}>
          <form onSubmit={form.onSubmit(validate)}>
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
      </Container>
    </div>
  );
}

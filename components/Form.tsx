import React from 'react';
import { useForm, useToggle, upperFirst } from '@mantine/hooks';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
} from '@mantine/core';
import axios from 'axios';
import { useRouter } from 'next/router';
// import { GoogleButton, TwitterButton } from '../SocialButtons/SocialButtons';

export default function AuthenticationForm(props: PaperProps<'div'>) {
  const [type, toggle] = useToggle('login', ['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validationRules: {
      email: (val) => /^\S+@\S+$/.test(val),
      password: (val) => val.length >= 6,
    },
  });
  const router = useRouter()
  const handleSubmit = (e) =>{
    console.log(type)
    
    if(type === "login"){
      // axios.get('http://localhost:3001/users').then((users:any) => {console.log(users.data)})
      axios.post("http://localhost:3001/users/login", {
        Password: form.values.password,
        Email:form.values.email
      }).then(res =>{
        console.log(res.data.response)
        localStorage.setItem("User", JSON.stringify(res.data.response))
        router.push("/")
      }).catch(err =>{
        console.log(err.response.data.message);
        alert(err.response.data.message ? err.response.data.message : err)
      })
    } else {
      //Create user
      axios.post("http://localhost:3001/users/", {
        Name: form.values.name,
        Password: form.values.password,
        Email:form.values.email
      }).then(res =>{
        console.log(res.data.Response)
        localStorage.setItem("User", JSON.stringify(res.data.Response))
        router.push("")
      }).catch(err =>{
        console.log(err);
        // alert(err.response ? err.response.data.message : err)
      })
    }
    console.log(form.values)
  }

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        Welcome, {type} with
      </Text>

      <Group grow mb="md" mt="md">
        {/* <GoogleButton radius="xl">Google</GoogleButton> */}
        {/* <TwitterButton radius="xl">Twitter</TwitterButton> */}
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit((e) => handleSubmit(e))}>
        <Group direction="column" grow>
          {type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              required
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
          />

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Group>

        <Group position="apart" mt="xl">
          <Anchor component="button" type="button" color="gray" onClick={() => toggle()} size="xs">
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit">{upperFirst(type)}</Button>
        </Group>
      </form>
    </Paper>
  );
}
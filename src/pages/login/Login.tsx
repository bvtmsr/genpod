import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextInput } from 'react-hook-form-mantine';
import { useNavigate } from 'react-router-dom';
import { useUserOperations } from 'src/api/useUserOperations';
import useUserStore from 'src/store/userStore';
import * as z from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Container, Flex, Space, Text } from '@mantine/core';

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required')
});

export default function Login() {
  const form = useForm({
    defaultValues: {
      username: 'admin',
      password: 'password'
    },
    mode: 'all',
    resolver: zodResolver(schema),
    shouldFocusError: true,
    shouldUseNativeValidation: false
  });
  const { login } = useUserOperations();
  const { setPersonalDetails, isUserLoggedIn, personalDetails } =
    useUserStore();

  const navigate = useNavigate();

  const handleSubmit = form.handleSubmit(async data => {
    const user = await login(data.username, data.password);
    if (user) {
      setPersonalDetails({
        username: user.username,
        id: user.id
      });
    }
  });
  useEffect(() => {
    if (personalDetails.username !== '') {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserLoggedIn()]);
  return (
    <Container
      mt="auto"
      size="xs"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <Flex
        bg="gray.7"
        w="100%"
        direction="column"
        align="flex-start"
        justify="flex-start"
        p="xl"
        rowGap="sm"
      >
        <Text size="xl" fw="bold" td="underline" ta="left">
          Login to your account
        </Text>
        <form onSubmit={handleSubmit}>
          <TextInput
            type="text"
            placeholder="Username"
            control={form.control}
            name="username"
            withAsterisk
            label="Username"
          />
          <TextInput
            type="password"
            placeholder="Password"
            control={form.control}
            name="password"
            withAsterisk
            label="Password"
          />
          <Space h="sm" />
          <Button type="submit" color="orange">
            Login
          </Button>
        </form>
      </Flex>
    </Container>
  );
}

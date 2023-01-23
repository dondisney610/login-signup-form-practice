import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth, useUser } from "../hooks/firebase";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";

type Inputs = {
  email: string;
  password: string;
  confirmationPassword: string;
};
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const auth = useAuth();
  const currentUser = useUser();
  const [isProcessingLogin, setIsProcessingLogin] = useState(false);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      setIsProcessingLogin(true);
      await createUserWithEmailAndPassword(auth, email, password);
      setIsProcessingLogin(false);
    } catch (e) {
      alert(e);
      setIsProcessingLogin(false);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = ({
    email,
    password,
    confirmationPassword,
  }) => {
    if (password === confirmationPassword) {
      login(email, password);
    } else {
      alert("パスワードが一致しません。");
    }
  };

  // useEffect(() => {
  //   if (currentUser) {
  //     router.push("/");
  //   }
  // }, [currentUser, router]);

  return (
    <Flex>
      <Box
        w="50%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Heading color="gray.800" mb="48px" textAlign="center" size="xl">
          ようこそ
        </Heading>
        <Box
          boxShadow="lg"
          w="600px"
          paddingY="120px"
          paddingX="32px"
          borderRadius="8px"
          border="1px solid"
          borderColor="gray.100"
          m="0 auto"
          display="flex"
        >
          <Box w="100%">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormLabel fontWeight="bold">Eメール</FormLabel>
              {errors.email && (
                <Text color="red.400" mb="8px">
                  Eメールは必須です
                </Text>
              )}
              <Input
                type="email"
                size="lg"
                mb="8"
                placeholder="example@test.com"
                {...register("email", { required: true })}
              />
              <FormLabel fontWeight="bold">パスワード</FormLabel>
              {errors.password && (
                <Text color="red.400" mb="8px">
                  パスワードは必須です
                </Text>
              )}
              <Input
                type="password"
                {...register("password", { required: true })}
                size="lg"
                mb="8"
              />
              <FormLabel fontWeight="bold">パスワード再入力</FormLabel>
              {errors.confirmationPassword && (
                <Text color="red.400" mb="8px">
                  パスワード再入力は必須です
                </Text>
              )}
              <Input
                type="password"
                {...register("confirmationPassword", { required: true })}
                size="lg"
                mb="8"
              />

              <Flex flexDirection="column">
                <Button
                  type="submit"
                  color="white"
                  background="gray.800"
                  size="lg"
                  paddingX="80px"
                  m="0 auto"
                  isLoading={isProcessingLogin}
                  _hover={{
                    background: "gray.700",
                  }}
                >
                  ログイン
                </Button>
              </Flex>
            </form>
          </Box>
        </Box>
      </Box>
      <Image
        w="50%"
        h="100vh"
        alt="カバー画像"
        src="https://images.unsplash.com/photo-1652554715588-60c932f66a0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
      />
    </Flex>
  );
};

export default Login;

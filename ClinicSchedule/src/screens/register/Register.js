import React, {useContext, useState} from 'react';
import Form from '../../container/Form';
import Dropdown from '../../components/Dropdown/Dropdown';
import { Center, Heading, Box, Text, Container, Button } from 'native-base';
import LoginContext from '../../context/loginContext';
import {authetication} from '../../api/firebase';

const Register = ({navigation}) => {

  const [select, setSelect] = useState("Medico");
  const { setUser } = useContext(LoginContext);

  return (
    <Box h={'100%'} w={'100%'} bg="blue.50">
      <Box marginX={'10'} marginTop={"20"}>
        <Heading fontSize={"5xl"} color={'dark.300'}>Clinic Schedule</Heading>
        <Container marginTop={"2"}>
          <Text color={"dark.300"}>Escolha a função</Text>
        </Container>
        <Dropdown select={select} setSelect={setSelect}/>
        <Form
          email
          password
          password_confirm
          authentication={"login"}
          formSubmit={
            (data) => {
            authetication.handleNewAccount(
            data.email,
            data.password, 
            () => {
              setUser(data.email);
            }, 
            (error) => console.log(error)
            )}}
            textButtonSubmit="Entrar"
        />
      </Box>
    </Box>
  );
}

export default Register;
import React, { useContext, useEffect, useState } from "react";
import {Box, Text, Fab, Icon, Modal, Button, HStack, Pressable, VStack, useToast} from 'native-base';
import Calendar from "../components/calendar/calendar";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { post, get } from "../api/firebase";
import LoginContext from "../context/loginContext";


const HomePaciente = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [dates, setDates] = useState([]);
    const [dateChoosed, setDateChoosed] = useState(new Date());
    const {user} = useContext(LoginContext);

    console.log(dates)
    const toast = useToast();

    const toggleModal = () => setModalVisible(!modalVisible);

    const addDate = async () => {
        const response = await post(user, dateChoosed);
        toast.show({
            description: "Horário adicionado com sucesso"
          })
        setList([...list, dateChoosed]);
        console.log(response)
    };

    const getDate = async () => {
        const response = await get(user);
        setDates(response);
        return response;
    }
    
    console.log(dateChoosed)
    useEffect(() => {
        getDate();        
    }, []);

    console.log(dates)
    return (
        <Box h="100%" w="100%" bg="blue.50">

            <Box marginTop={10} marginX="10">
                <Text color={"dark.300"} fontWeight={'bold'} letterSpacing="xl" fontSize="4xl" marginBottom={"1"}>Agenda</Text>
                <Text color={"dark.300"}>Defina os dias e horarios </Text>
                <Text color={"dark.300"}>que você está disponível para consulta</Text>
                <VStack height={"full"} marginTop={10}>
                    <Box >
                        <Text color={"dark.300"} fontWeight={'bold'} fontSize="md">Horário Sugerido:</Text>
                    </Box>
                    <Box>
                        <Text color={"dark.300"} fontWeight={'bold'} fontSize="md">Horários Marcado:</Text>
                        {dates.map((data, key) => (
                            <Text key={key}>{data}</Text>
                        ))}
                    </Box>
                </VStack>


                <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                    <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Escolha a Melhor Data</Modal.Header>
                        <Modal.Body>
                            <Calendar dateChoosed={dateChoosed} setDateChoosed={setDateChoosed}/>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button.Group space={2}>
                            <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                            setModalVisible(false);
                            }}>
                                Cancelar
                            </Button>
                            <Button onPress={() => {
                            setModalVisible(false);
                            addDate();
                            }}>
                                Salvar
                            </Button>
                        </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>

                <Fab onPress={toggleModal} renderInPortal={true} marginBottom="10" marginRight="1" shadow={2} size="xs" icon={<Icon color="white" as={MaterialIcons} name="add" size="xl" />} />
            </Box>
        </Box>
    );
}

export default HomePaciente;
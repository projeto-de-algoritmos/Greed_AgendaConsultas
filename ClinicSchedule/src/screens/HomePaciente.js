import React, { useContext, useEffect, useState } from "react";
import {Box, Text, Fab, Icon, Modal, Button, HStack, Pressable, VStack, useToast, ScrollView, Input} from 'native-base';
import Calendar from "../components/calendar/calendar";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { post, get, getSchedule, authetication } from "../api/firebase";
import LoginContext from "../context/loginContext";
import { formatDate } from "../utils/formatDate";

const HomePaciente = () => {

    const [modalVisibleStart, setModalVisibleStart] = useState(false);
    const [modalVisibleEnd, setModalVisibleEnd] = useState(false);
    const [modalVisibleTime, setModalVisibleTime] = useState(false);
    const [dates, setDates] = useState([]);
    const [dateChoosedStart, setDateChoosedStart] = useState(new Date());
    const [dateChoosedEnd, setDateChoosedEnd] = useState(new Date(1));
    const [timeSchedule, setTimeSchedule] = useState(0);
    const [schedule, setSchedule] = useState(null);
    const {user} = useContext(LoginContext);

    const {setUser, setTypeUser} = useContext(LoginContext);
    const toast = useToast();

    const toggleModal = () => setModalVisibleStart(!modalVisibleStart);

    const addDate = async () => {
        const response = await post(user, formatDate(dateChoosedStart), formatDate(dateChoosedEnd), timeSchedule);
        toast.show({
            description: "Horário adicionado com sucesso"
          })
        getDate();  
    };

    const getDate = async () => {
        const response = await get(user);
        setDates(response);
        return response;
    }
    
    const getDateSchedule = async () => {
        const response = await getSchedule(user);
        console.log(response)
        setSchedule(response);
        return response;
    }

    useEffect(() => {
        getDate();
        getDateSchedule();     
    }, []);

    return (
        <Box h="100%" w="100%" bg="blue.50">
                <Button
                    position={"absolute"}
                    right="2"
                    top={12}
                    borderRadius="2xl"
                    onPress={() =>
                        authetication.logOut(() => {
                        setUser("");
                        setTypeUser("");
                    })}
                    >LogOut
                </Button>
            <Box marginTop={10} marginX="10">
                <Text color={"dark.300"} fontWeight={'bold'} letterSpacing="xl" fontSize="4xl" marginBottom={"1"}>Agenda</Text>
                <Text color={"dark.300"}>Defina os dias e horarios </Text>
                <Text color={"dark.300"}>que você está disponível para consulta</Text>
                <VStack marginTop={10}>
                    <Box h="45%">
                    <HStack>
                        <Text w="50%" color={"dark.300"} fontWeight={'bold'} fontSize="md">Horário Sugerido:</Text>        
                        <Text color={"dark.300"} fontWeight={'bold'} fontSize="md">Tempo de Consulta:</Text>        
                    </HStack>
                        <ScrollView>
                            {dates.map((data, key) => (
                                <HStack key={key}>
                                    <Box w="50%">
                                        <HStack >
                                            <Text marginY="2" >{data.dateStart}</Text>
                                                <Text marginY="2">  até  </Text>
                                            <Text marginY="2" >{data.dateEnd}</Text>
                                        </HStack>
                                    </Box>
                                    <Box w="50%">
                                        <Text textAlign={"center"} marginY="2" >{data.timeSchedule}</Text>
                                    </Box>
                                </HStack>
                            ))}
                        </ScrollView>
                    </Box >
                    <Box h={"45%"}>
                        <Text color={"dark.300"} fontWeight={'bold'} fontSize="md">Horários Marcados:</Text>
                        {schedule?.map((data, key) => (
                                <HStack key={key}>
                                    <Box w="50%">
                                        <HStack >
                                            <Text marginY="2" >{data.dateStart}</Text>
                                                <Text marginY="2">  até  </Text>
                                            <Text marginY="2" >{data.dateEnd}</Text>
                                        </HStack>
                                    </Box>
                                </HStack>
                            ))}
                    </Box>  
                </VStack>


                <Modal isOpen={modalVisibleStart} onClose={() => setModalVisibleStart(false)}>
                    <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>A Partir De:</Modal.Header>
                        <Modal.Body>
                            <Calendar dateChoosed={dateChoosedStart} setDateChoosed={setDateChoosedStart}/>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button.Group space={2}>
                            <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                            setModalVisibleStart(false);
                            }}>
                                Cancelar
                            </Button>
                            <Button onPress={() => {
                            setModalVisibleStart(false);
                            setModalVisibleEnd(true);
                            }}>
                                Salvar
                            </Button>
                        </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>

                <Modal isOpen={modalVisibleEnd} onClose={() => setDateChoosedEnd(false)}>
                    <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Até :</Modal.Header>
                        <Modal.Body>
                            <Calendar dateChoosed={dateChoosedEnd} setDateChoosed={setDateChoosedEnd}/>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button.Group space={2}>
                            <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                            setModalVisibleStart(false);
                            setModalVisibleEnd(false);
                            }}>
                                Cancelar
                            </Button>
                            <Button onPress={() => {
                            setModalVisibleStart(false);
                            setModalVisibleEnd(false);
                            setModalVisibleTime(true)
                            }}>
                                Salvar
                            </Button>
                        </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>

                <Modal isOpen={modalVisibleTime} onClose={() => setModalVisibleTime(false)}>
                    <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Até :</Modal.Header>
                        <Modal.Body>
                            <Input value={timeSchedule} onChangeText={(value) => setTimeSchedule(value)}/>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button.Group space={2}>
                            <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                            setModalVisibleStart(false);
                            setModalVisibleEnd(false);
                            setModalVisibleTime(false);
                            }}>
                                Cancelar
                            </Button>
                            <Button onPress={() => {
                            setModalVisibleStart(false);
                            setModalVisibleEnd(false);
                            setModalVisibleTime(false);
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
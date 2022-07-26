import React, { useRef, useState, useEffect, useContext } from "react";
import { Box, Button, Fab, Text, Modal, Icon, HStack } from 'native-base'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { formatDate, convertdata, returntimes } from "../utils/formatDate";
import {greed} from "../utils/greed";
import { get, postSchedule, authetication } from "../api/firebase";
import LoginContext from "../context/loginContext";

const HomeMedico = () => {

    const [data, setData] = useState([]);
    const [schedule, setschedule] = useState([]);
    const [modal, setModal] = useState(false);
    const {setUser, setTypeUser} = useContext(LoginContext);
    const getDate = async () => {
        const response = await get();
        setData(response);
    }

    const postData = async () => {
        schedule.map((data) => {
            postSchedule(data.user, data.dateStart, data.dateEnd)
        })
    }
    
    useEffect(( ) => {
        postData()
    }, [schedule])
    
    useEffect(( ) => {
        getDate();
    }, [])

    const scheduleData = () => {
       setschedule(greed(data))
    }

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
            <Box marginTop={20} marginX="10">

                <Text textAlign={"center"} color={"dark.300"} fontWeight={'bold'} fontSize="2xl">Organizar Agenda</Text>
                <HStack marginTop={10}>
                    <Text w="50%" textAlign={"center"} color={"dark.300"} fontWeight={'bold'} fontSize="md">Paciente</Text>        
                    <Text w="50%" color={"dark.300"} fontWeight={'bold'} fontSize="md">Horário</Text>        
                </HStack>
                    {schedule.map((data, key) => (
                        <HStack key={key}>
                            <Box w="50%">
                                <Text textAlign={"center"} marginY="2" >{data.user}</Text>
                            </Box>
                           <Box w="50%">
                                <HStack >
                                    <Text textAlign={"center"}marginY="2" >{data.dateStart}</Text>
                                        <Text textAlign={"center"} marginY="2" >  até  </Text>
                                    <Text textAlign={"center"} marginY="2" >{data.dateEnd}</Text>
                                </HStack>
                            </Box>
                        </HStack>
                    ))}

                <Modal isOpen={modal} onClose={() => setModal(false)}>
                    <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Gerar Agenda Organizada</Modal.Header>
                        <Modal.Body>
                        <Button onPress={scheduleData}>Gerar agenda</Button>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>

                <Fab onPress={() =>setModal(true)} renderInPortal={true} marginBottom="10" marginRight="1" shadow={2} size="xs" icon={<Icon color="white" as={MaterialIcons} name="add" size="xl" />} />
            </Box>
        </Box>
    );
}

export default HomeMedico;
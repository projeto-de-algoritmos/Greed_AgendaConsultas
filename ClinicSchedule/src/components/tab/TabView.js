import React, { useRef, useState } from "react";
import {Box, Text, HStack, Button} from 'native-base';
import SwipeList from "../list/SwipeList";

const data1 = [{
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    fullName: 'Afreen Khan',
    timeStamp: '12:47 PM',
    recentText: 'Good Day!',
    avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
  }
];

const TabView = () => {
    const [viewTab, setViewTab] = useState(1);
    console.log(viewTab === 2);
    
    return (
        <Box bg="blue.50">
            <HStack marginTop={"10"} width={"full"} justifyContent="space-around">
                <Button onPress={() => setViewTab(1)}>
                    <Text color={"dark.300"} fontWeight={'bold'} fontSize="md" marginBottom={"1"}>Pedidos</Text>
                </Button>
                <Button onPress={() => setViewTab(2)}>
                    <Text color={"dark.300"} fontWeight={'bold'} fontSize="md" marginBottom={"1"}>Agendados</Text>
                </Button>
            </HStack>
            <Box>
                {viewTab === 1 ?
                    <Box>
                        <SwipeList data={data}/>
                    </Box>
                    :
                    (
                    <Box>
                        <SwipeList data={data1}/>
                    </Box>
                    )
                }
            </Box>
        </Box>
    );
}

export default TabView;
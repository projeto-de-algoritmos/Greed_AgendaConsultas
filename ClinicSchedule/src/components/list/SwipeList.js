import React, { useRef, useState } from "react";
import { Center, HStack, Avatar, Box, Pressable, VStack, Text, Icon, ScrollView, Heading, Spacer } from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';

function Basic({data}) {

    const [listData, setListData] = useState(data);
  
    const closeRow = (rowMap, rowKey) => {
      if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
      }
    };
  
    const deleteRow = (rowMap, rowKey) => {
      closeRow(rowMap, rowKey);
      const newData = [...listData];
      const prevIndex = listData.findIndex(item => item.key === rowKey);
      newData.splice(prevIndex, 1);
      setListData(newData);
    };
  
    const onRowDidOpen = rowKey => {
      console.log('This row opened', rowKey);
    };
  
    const renderItem = ({
      item,
      index
    }) => {
        return (
            <Box>
            <Pressable onPress={() => console.log('You touched me')} bg="blue.50">
            <Box pl="4" pr="5" py="2">
                <HStack alignItems="center" space={3}>
                <Avatar size="48px" source={{
                uri: item.avatarUrl
                }} />
                <VStack>
                    <Text color="coolGray.800" _dark={{
                    color: 'warmGray.50'
                }} bold>
                    {item.fullName}
                    </Text>
                    <Text color="coolGray.600" _dark={{
                    color: 'warmGray.200'
                }}>
                    {item.recentText}
                    </Text>
                </VStack>
                <Spacer />
                <Text fontSize="xs" color="coolGray.800" _dark={{
                color: 'warmGray.50'
                }} alignSelf="flex-start">
                    {item.timeStamp}
                </Text>
                </HStack>
            </Box>
            </Pressable>
        </Box>
        )
    };
  
    const renderHiddenItem = (data, rowMap) => {

        return (
            <HStack flex="1" pl="2">
            <Pressable w="70" ml="auto" cursor="pointer" bg="coolGray.200" justifyContent="center" onPress={() => closeRow(rowMap, data.item.key)} _pressed={{
            opacity: 0.5
            }}>
              <VStack alignItems="center" space={2}>
                <Icon as={<Entypo name="dots-three-horizontal" />} size="xs" color="coolGray.800" />
                <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
                  More
                </Text>
              </VStack>
            </Pressable>
            <Pressable w="70" cursor="pointer" bg="red.500" justifyContent="center" onPress={() => deleteRow(rowMap, data.item.key)} _pressed={{
            opacity: 0.5
            }}>
              <VStack alignItems="center" space={2}>
                <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
                <Text color="white" fontSize="xs" fontWeight="medium">
                  Delete
                </Text>
              </VStack>
            </Pressable>
          </HStack>
        );
}
  
    return <Box bg="blue.50" safeArea flex="1">
        <SwipeListView data={listData} renderItem={renderItem} renderHiddenItem={renderHiddenItem} rightOpenValue={-130} previewRowKey={'0'} previewOpenValue={-40} previewOpenDelay={3000} onRowDidOpen={onRowDidOpen} />
      </Box>;
}

function SwipeElement({data}) {
  
    return <Center bg="blue.50" h="100%">
        <Box _bg="blue.50" flex="1" safeAreaTop maxW="400px" w="100%">
            <Basic data={data} />
        </Box>
      </Center>;
  }

export default SwipeElement;
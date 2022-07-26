import React, { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Button, Text } from "native-base";

const data = new Date();

const Calendar = ({dateChoosed, setDateChoosed}) => {
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDateChoosed(currentDate);
    };
  
    const showMode = (currentMode) => {  
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };
  
    return (
      <View>
        <View>
            <Text>Selecione o Dia:</Text>
          <Button onPress={showDatepicker} title="Show date picker!">Selecione</Button>
        </View>
        <View marginTop={10}>
            <Text>Selecione o horário:</Text>
          <Button onPress={showTimepicker} title="Show time picker!">Selecione</Button>
        </View>
        <Text marginTop={5}>Data Selcionada:</Text> 
        <Text color="red.400">{dateChoosed.toLocaleString()}</Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateChoosed}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </View>
    );
}

export default Calendar;
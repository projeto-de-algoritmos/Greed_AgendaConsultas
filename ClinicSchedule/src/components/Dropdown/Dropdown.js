import React, { useContext, useState } from "react";
import {Box, Select, CheckIcon} from 'native-base';
import LoginContext from "../../context/loginContext";

const Dropdown = ({select, setSelect}) => {

    return (
        <Box w="100%">
        <Select  backgroundColor="light.100" placeholderTextColor={"light.900"} selectedValue={select} minWidth="200" accessibilityLabel="Choose Service" placeholder="Selecione" _selectedItem={{
        bg: "darkBlue.500",
        endIcon: <CheckIcon size="5" />
        }} mt={1} onValueChange={itemValue => setSelect(itemValue)}>
          <Select.Item label="Medico" value="Medico" />
          <Select.Item label="Paciente" value="Paciente" />
        </Select>
      </Box>
    );
}

export default Dropdown;
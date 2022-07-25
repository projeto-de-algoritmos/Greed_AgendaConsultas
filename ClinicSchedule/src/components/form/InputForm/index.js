import React, { useEffect } from "react";
import { Controller} from 'react-hook-form';
import InputText from '../Input/index'
import { Text, Box } from 'native-base';

const InputForm = ({control, name, error, styleInput, ...rest}) => {

    return (
        <Box h="20">
            <Controller
                name={name}
                control={control}
                render={ ({field: {onChange, value}}) => {
                    return <InputText
                        onChangeText={onChange}
                        value={value}
                        {...rest}
                    />
                }
                }
            />
            {error?.message ? <Text color="red.400">{error?.message}</Text>: <></>}
        </Box>
    );
}

export default InputForm;
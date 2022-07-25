import React from "react";
import { Button, Box } from "native-base";

const ButtonForm = ({title, onPress, loading}) => {
    return (
        <Box  width={"full"} marginTop="60%">
            <Button height={10} _loading={loading} onPress={() => onPress()} bg={"darkBlue.500"} _pressed={ {bg: "darkBlue.600"}}>{title}</Button>    
        </Box>
    );
}

export default ButtonForm;
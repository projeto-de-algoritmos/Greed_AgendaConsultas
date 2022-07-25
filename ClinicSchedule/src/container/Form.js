import React from "react";
import FormComponent from "../components/form";
import { Box } from "native-base";
import { Factory } from 'native-base';

const Form = ({email, password, password_confirm, formSubmit, textButtonSubmit, authentication}) => {
    return (
        <Box>
            <FormComponent
                email={email}
                password={password}
                password_confirm={password_confirm}
                textButtonSubmit={textButtonSubmit}
                formSubmit={formSubmit}
                authentication={authentication}
            />
        </Box>
    );
};

export default Form;
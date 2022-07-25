import React from 'react';

import InputForm  from './InputForm/index';
import { Box } from 'native-base';
import { useForm } from 'react-hook-form';
import listAthentication from './validationFormConfig';
import { yupResolver } from '@hookform/resolvers/yup';
import ButtonForm from '../button/ButtonForm';

const Form = ({
  formSubmit,
  email, 
  password, 
  password_confirm, 
  textButtonSubmit, 
  authentication,
  loading
  }) =>  {
  
  const {control, handleSubmit, formState : {errors}} = useForm({resolver: yupResolver(listAthentication[authentication])});

  return (
    <Box marginTop={"10"} w={"full"}>
      { email &&
        <InputForm
          name="email" 
          control={control}
          icon="mail"
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize='none'
          error={errors.email}
        />
      }

      { password &&
        <InputForm
          name="password" 
          control={control}
          icon="lock"
          placeholder="Password"
          secureTextEntry
          error={errors.password}
        /> 
      }

      { password_confirm &&
        <InputForm
          name="password_confirm" 
          control={control}
          icon="lock"
          placeholder="Confirm Password"
          secureTextEntry
          error={errors.password_confirm}
        />
      }
      <ButtonForm
        title={textButtonSubmit}
        onPress={handleSubmit(formSubmit)}
        loading={loading}
      />
    </Box>
  );
}

export default Form;
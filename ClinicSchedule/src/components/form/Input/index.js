import React, { useState } from 'react';
import { Box, Input } from 'native-base';

const InputText = ({ value, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value)
  }

  return (
    <Box>
      <Input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        value={value}
        isFocused={isFocused}
        w={'full'}
        {...rest}
      />
    </Box>
  );
}

export default InputText;
import React from 'react';
import Toast, {ErrorToast} from 'react-native-toast-message';

export default {
  config: {
    error: ({text1, ...rest}) => (
      <ErrorToast
        {...rest}
        text1Style={{
          fontSize: 14,
          fontWeight: 'bold',
        }}
        text1={text1}
      />
    ),
  },
  use(message) {
    Toast.show({
      type: "error",
      text1: message,
      visibilityTime: 2000,
      position: 'bottom',
    });
  },
};
/* eslint-disable react-hooks/exhaustive-deps */
import { Dimensions, View } from 'react-native';
import React from 'react';
import Text from '@Component/Text';
import Animated, {
  Layout,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated';
import { useStoreGlobal } from '@zustand/global';
const { width } = Dimensions.get('window');

const ToastType = {
  danger: '#ee6969',
  warning: '#FBF0B2',
  success: '#B0D9B1',
};

const Toast = () => {
  const { showToast, toastMsg, toastType } = useStoreGlobal();
  if (!showToast) return null;
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 100,
        width,
        alignItems: 'center',
        zIndex: 100,
      }}
    >
      <Animated.View
        entering={SlideInDown.springify()}
        exiting={SlideOutDown.springify()}
        style={{
          backgroundColor: '#61677A',
          width: 250,
          borderRadius: 5,
          elevation: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        layout={Layout}
      >
        <Text
          color="white"
          fw="600"
          textAlign="center"
          style={{
            flex: 1,
            textAlignVertical: 'center',
            alignSelf: 'center',
            paddingVertical: 5,
            paddingHorizontal: 5,
          }}
        >
          {toastMsg}
        </Text>
        <View
          style={{
            width: 10,
            backgroundColor: ToastType[toastType],
            height: '100%',
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
          }}
        />
      </Animated.View>
    </View>
  );
};

export default Toast;

export const useToast = () => {
  const { setToast } = useStoreGlobal();
  const toast = ({ msg, type, duration = 2000 }: ToastParam) => {
    setToast({
      msg,
      show: true,
      type,
    });
    setTimeout(() => {
      setToast({
        msg: '',
        show: false,
        type: type,
      });
    }, duration);
  };
  return { toast };
};

export type ToastType = 'success' | 'danger' | 'warning';

export type ToastParam = { msg: string; type: ToastType; duration?: number };

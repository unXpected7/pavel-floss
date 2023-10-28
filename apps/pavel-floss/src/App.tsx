/* eslint-disable jsx-a11y/accessible-emoji */
import Text, { FontWeight } from '@Component/Text';
import Toast, { useToast } from '@widgets/Toast';
import { useStoreGlobal } from '@zustand/global';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  StatusBar,
  View,
  Pressable,
} from 'react-native';
import Animated, {
  Layout,
  SlideInLeft,
  ZoomOutRight,
} from 'react-native-reanimated';

const figmaBlue = '#6C91D9';

export const App = () => {
  const { loading, setLoading } = useStoreGlobal();
  const { toast } = useToast();

  const { data, fetchData } = useFakeApiCall();

  const RenderItem = ({ item, index }: { item: FontWeight; index: number }) => (
    <Animated.View
      entering={SlideInLeft.delay((index + 1) * 20).springify()}
      exiting={ZoomOutRight}
      layout={Layout}
    >
      <Text
        fw={item}
        fs={20}
        color={figmaBlue}
        mt={index === 0 ? 50 : 10}
        p={10}
        textAlign="center"
      >
        Poppins-{item}
      </Text>
    </Animated.View>
  );

  const ListEmptyComponent = () => {
    if (loading) {
      return (
        <View
          style={{
            height: Dimensions.get('window').height,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text text="Calling Api . . ." color={figmaBlue} />
        </View>
      );
    }
    return null;
  };

  return (
    <>
      <View style={{ flex: 1, zIndex: 0 }}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <FlatList
            contentContainerStyle={{ flex: 1 }}
            data={data}
            renderItem={RenderItem}
            ListEmptyComponent={ListEmptyComponent}
          />
          <Pressable
            style={{
              marginVertical: 10,
              width: '60%',
              backgroundColor: loading ? '#61677A' : figmaBlue,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
              alignSelf: 'center',
              borderRadius: 10,
              elevation: 5,
            }}
            onPress={fetchData}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size={'small'} color={'white'} />
            ) : (
              <Text color="white" textAlign="center" fw="600" mr={5}>
                Refetch API
              </Text>
            )}
          </Pressable>
          <Pressable
            disabled={loading}
            style={{
              marginVertical: 10,
              width: '60%',
              backgroundColor: figmaBlue,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
              alignSelf: 'center',
              borderRadius: 10,
              elevation: 5,
            }}
            onPress={() => {
              setLoading(true);
              fetch('https://whatthecommit.com/index.txt')
                .then((res) => res.text())
                .then((msg) => {
                  toast({
                    msg,
                    type: 'success',
                  });
                })
                .catch((err) => {
                  toast({
                    msg: err?.message,
                    type: 'success',
                  });
                })
                .finally(() => {
                  setLoading(false);
                });
            }}
          >
            {loading ? (
              <ActivityIndicator size={'small'} color={'white'} />
            ) : (
              <Text color="white" textAlign="center" fw="600" mr={5}>
                Test Toast
              </Text>
            )}
          </Pressable>
        </SafeAreaView>
      </View>
      <Toast />
    </>
  );
};
export default App;

const useFakeApiCall = () => {
  const [data, setData] = useState<FontWeight[]>();
  const { setLoading } = useStoreGlobal();

  const fetchData = () => {
    setLoading(true);
    setData([]);
    setTimeout(() => {
      const fw = Array(9)
        .fill(0)
        .map((_, i) => {
          return ((i + 1) * 100).toString() as FontWeight;
        });
      setData(fw);
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, fetchData };
};

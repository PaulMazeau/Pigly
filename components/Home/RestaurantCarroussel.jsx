import React from 'react';
import { View, Dimensions } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import ImageCarroussel from './ImageCarroussel';
import { main } from '../../constants/color';

const PAGE_WIDTH = Dimensions.get('window').width;
const colors = [
  "#26292E",
  "#899F9C",
  "#B3C680",
  "#5C6265",
  "#F5D399",
  "#F1F1F1",
];

function RestaurantCarroussel() {
  const progressValue = useSharedValue(0);

  return (
    <View style={{ alignItems: "center" }}>
      <Carousel
        style={{ width: PAGE_WIDTH }}
        loop
        width={PAGE_WIDTH}
        height={PAGE_WIDTH}
        onProgressChange={(_, absoluteProgress) => progressValue.value = absoluteProgress}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        data={colors}
        renderItem={({ index }) => (
          <ImageCarroussel/>
        )}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: 100,
          alignSelf: "center",
          position: "relative",
        }}
      >
        {colors.map((_, index) => (
          <PaginationItem
            key={index}
            animValue={progressValue}
            index={index}
            length={colors.length}
          />
        ))}
      </View>
    </View>
  );
}

function PaginationItem(props) {
  const { animValue, index, length } = props;
  const width = 10;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [animValue, index, length]);

  return (
    <View
      style={{
        backgroundColor: 'gray',
        width,
        height: width,
        borderRadius: 50,
        overflow: 'hidden',
      }}
    >
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor: main.LogoBlack, // La couleur du point
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
}

export default RestaurantCarroussel;

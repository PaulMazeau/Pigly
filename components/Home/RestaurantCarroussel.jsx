import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

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
  const [isVertical, setIsVertical] = useState(false);
  const progressValue = useSharedValue(0);

  return (
    <View style={{ alignItems: "center" }}>
      <Carousel
        style={{ width: PAGE_WIDTH * 0.86 }}
        loop
        vertical={isVertical}
        width={PAGE_WIDTH}
        height={PAGE_WIDTH * 0.6}
        onProgressChange={(_, absoluteProgress) => progressValue.value = absoluteProgress}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        data={colors}
        renderItem={({ index }) => (
          <View
            key={index}
            style={{
              backgroundColor: colors[index],
              width: PAGE_WIDTH * 0.8,
              height: PAGE_WIDTH * 0.5,
              borderRadius: 16
            }}
          />
        )}
      />

      <View
        style={{
          flexDirection: isVertical ? "column" : "row",
          justifyContent: "space-between",
          width: isVertical ? 10 : 100,
          alignSelf: "center",
          position: isVertical ? "absolute" : "relative",
          right: isVertical ? 5 : undefined,
          top: isVertical ? 40 : undefined,
        }}
      >
        {colors.map((backgroundColor, index) => (
          <PaginationItem
            key={index}
            backgroundColor={backgroundColor}
            animValue={progressValue}
            index={index}
            length={colors.length}
            isRotate={isVertical}
          />
        ))}
      </View>
    </View>
  );
}

function PaginationItem(props) {
  const { animValue, index, length, backgroundColor, isRotate } = props;
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
        backgroundColor: 'white',
        width,
        height: width,
        borderRadius: 50,
        overflow: 'hidden',
        transform: [{ rotateZ: isRotate ? '90deg' : '0deg' }]
      }}
    >
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
}

export default RestaurantCarroussel;

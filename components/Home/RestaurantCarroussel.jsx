import React, { useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { FB_DB } from '../../firebaseconfig';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import ImageCarroussel from './ImageCarroussel';
import { main } from '../../constants/color';

const PAGE_WIDTH = Dimensions.get('window').width;

function RestaurantCarroussel() {
  const [restaurants, setRestaurants] = useState([]);
  const progressValue = useSharedValue(0);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const querySnapshot = await getDocs(collection(FB_DB, 'restaurants'));
        const fetchedRestaurants = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRestaurants(fetchedRestaurants);
      } catch (error) {
        console.error("Erreur de récupération des restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

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
        data={restaurants}
        renderItem={({ item }) => <ImageCarroussel restaurant={item} />}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10, // Adjust as needed
        }}
      >
        {restaurants.map((_, index) => (
          <PaginationItem
            key={index}
            animValue={progressValue}
            index={index}
            length={restaurants.length}
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
        marginHorizontal: 2
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

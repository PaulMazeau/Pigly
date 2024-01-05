import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { main } from '../../constants/color';
import { useMenu } from '../../context/MenuContext';

const RestaurantMenu = ({ categories, restaurantId }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const { categoryItems, fetchCategoryItems } = useMenu();

  const SLIDER_WIDTH = Dimensions.get('window').width * 0.85;
  const ITEM_WIDTH = SLIDER_WIDTH * 0.8; // 80% de la largeur de l'écran
  console.log('Largeur du slider', SLIDER_WIDTH);
  console.log('Largeur de l\'item', ITEM_WIDTH);
  useEffect(() => {
    if (categories.length > 0) {
      // Initialiser avec la première catégorie
      setSelectedCategoryIndex(0);
      const firstCategory = categories[0].id;
      fetchCategoryItems(restaurantId, firstCategory);
    }
  }, [categories, restaurantId, fetchCategoryItems]);

  // Fonction pour changer de catégorie
  const selectCategory = (index) => {
    setSelectedCategoryIndex(index);
    const category = categories[index].id;
    fetchCategoryItems(restaurantId, category);
    console.log('Changement de catégorie', category);
    console.log('Items de la catégorie', categoryItems);
  };

  // Afficher les éléments de la catégorie sélectionnée
  const renderCategory = ({item, index}) => {
    return (
      <View key={index} style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>{item.nomCategorie}</Text>
        <View style={styles.itemsList}>
        {categoryItems.map(item => (
        <View style={styles.RowMenu} key={item.id}>
          <View style={styles.DetailsContainer}>
            <Text style={styles.TitrePlat}>{item.titre}</Text>
            <Text style={styles.DescriptionPlat}>{item.description}</Text>
          </View>
          <Text style={styles.Prix}>{`${item.prix} €`}</Text>
        </View>
      ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesScroll}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              index === selectedCategoryIndex && styles.categoryButtonSelected,
            ]}
            onPress={() => selectCategory(index)}
          >
            <Text
              style={[
                styles.Title,
                index === selectedCategoryIndex && styles.TitleSelected,
              ]}
            >
              {category.id}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Utiliser un Carousel pour les plats de la catégorie sélectionnée */}
      <Carousel
        data={categories} // Les données sont les items de la catégorie sélectionnée
        renderItem={renderCategory}
        width={SLIDER_WIDTH} // Définissez la largeur du curseur (généralement la largeur de l'écran
        height={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH} // Définissez la largeur de l'élément
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: main.LogoBlack,
    borderRadius: 14,
    padding: 8,
    marginBottom: 10
  },
  Title: {
    fontSize: 20,
    fontWeight: '600'
  },
  categoriesScroll: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  RowMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 10,
  },
  DetailsContainer: {
    flex: 1, 
    marginRight: 12, 
  },
  TitrePlat: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold', 
    marginBottom: 4, 
  },
  DescriptionPlat: {
    color: 'rgba(0, 0, 0, .6)',
    flexWrap: 'wrap', 
  },
  Prix: {
    width: 60, 
    fontSize: 16,
    color: 'black',
    textAlign: 'right', 
  },
  categoryButton: {
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  categoryButtonSelected: {
    borderBottomWidth: 2,
    borderBottomColor: main.LogoBlack
  },
  TitleSelected: {
    textDecorationLine: 'underline'
  }
})
export default RestaurantMenu;
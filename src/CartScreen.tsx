import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ListRenderItem } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/store';
import { addItem, removeItem } from './store/cartSlice';
import { Product } from './ProductModal';

const CartScreen: React.FC = () => {
  const cartItems = useSelector((state: RootState) => Object.values(state.cart));
  const dispatch = useDispatch();

  const incrementQuantity = (product: Product) => {
    dispatch(addItem(product));
  };

  const decrementQuantity = (productId: number) => {
    dispatch(removeItem(productId));
  };

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemPrice}>${item.price}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => decrementQuantity(item.id)}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.itemQuantity}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => incrementQuantity(item)}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <Text style={styles.cartTotal}>
        Total Items in Cart: {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cartItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#333',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: '#ccc',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  cartTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default CartScreen;

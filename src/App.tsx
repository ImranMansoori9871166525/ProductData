import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, RootState } from "./store/store";
import { addItem, removeItem } from "./store/cartSlice";
import ProductModal from "./ProductModal";
import CartScreen from "./CartScreen"; 
import { createSelector } from 'reselect';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity?: number;
}

const selectCartState = (state: RootState) => state.cart;
const selectCartItems = createSelector(
  [selectCartState],
  (cart) => Object.values(cart)
);

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [cartModalVisible, setCartModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems); // Use the memoized selector

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalVisible(false);
  };

  const openCartModal = () => {
    setCartModalVisible(true);
  };

  const closeCartModal = () => {
    setCartModalVisible(false);
  };

  const addToCart = (product: Product) => {
    dispatch(addItem(product));
    closeModal();
  };

  const incrementQuantity = (product: Product) => {
    dispatch(addItem(product));
  };

  const decrementQuantity = (productId: number) => {
    dispatch(removeItem(productId));
  };

  const getTotalItems = () => {
    return cartItems.reduce(
      (total, item) => total + (item.quantity || 0),
      0
    );
  };

  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={80} color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openCartModal}>
        <Text style={styles.cartTotal}>
          Total Items in Cart: {getTotalItems()}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={products}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productItem}
            onPress={() => openModal(item)}
          >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {selectedProduct && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <ProductModal
            selectedProduct={selectedProduct}
            modalVisible={modalVisible}
            closeModal={closeModal}
            addToCart={addToCart}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
          />
        </Modal>
      )}

      <Modal
        animationType="slide"
        transparent={false}
        visible={cartModalVisible}
        onRequestClose={closeCartModal}
      >
        <CartScreen />
        <Button title="Close" onPress={closeCartModal} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cartTotal: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  productItem: {
    flexDirection: "row",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "#888",
  },
});

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);

import React from 'react';
import { View, Text, Image, Button, Modal, TouchableOpacity, StyleSheet } from 'react-native';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity?: number;
}

interface ProductModalProps {
  selectedProduct: Product | null;
  modalVisible: boolean;
  closeModal: () => void;
  addToCart: (product: Product) => void;
  incrementQuantity: (product: Product) => void;
  decrementQuantity: (productId: number) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  selectedProduct,
  modalVisible,
  closeModal,
  addToCart,
  incrementQuantity,
  decrementQuantity,
}) => {
  if (!selectedProduct) return null; 

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Image
            source={{ uri: selectedProduct.image }}
            style={styles.modalImage}
          />
          <View style={styles.productDetails}>
            <Text style={styles.modalTitle}>{selectedProduct.title}</Text>
            <Text style={styles.modalDescription}>
              {selectedProduct.description}
            </Text>
            <Text style={styles.modalPrice}>${selectedProduct.price}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => decrementQuantity(selectedProduct.id)}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => incrementQuantity(selectedProduct)}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
            <Button
              title="Add to Cart"
              onPress={() => addToCart(selectedProduct)}
            />
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'lightskyblue',
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: 150,
    height: 150,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginBottom: 20,
  },
  productDetails: {
    alignItems: 'center',
    width: '100%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 20,
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default ProductModal;

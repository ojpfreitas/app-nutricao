import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import PropTypes from "prop-types";

const OrangeButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ff9100ff',  // Cor de fundo laranja
    borderRadius: 8,            // Bordas arredondadas
    paddingVertical: 12,        // Espaçamento vertical
    paddingHorizontal: 20,      // Espaçamento horizontal
    alignItems: 'center',       // Centraliza o texto
    shadowColor: '#000',        // Cor da sombra
    shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
    shadowOpacity: 0.1,         // Opacidade da sombra
    shadowRadius: 5,            // Raio da sombra
    elevation: 3,               // Sombra no Android
    borderWidth: 1,             // Borda de 1px
    borderColor: '#969696ff',       // Cor da borda
  },
  buttonText: {
    color: 'white',              // Cor do texto preta
    fontSize: 16,               // Tamanho da fonte
    fontWeight: 'bold',         // Negrito
  },
});

export default OrangeButton;

OrangeButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};
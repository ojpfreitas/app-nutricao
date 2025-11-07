import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";
import {nutritionistIcon, patientIcon} from "../../assets/index.js"

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bem-vindo!</Text>
      <Text style={styles.subtitulo}>Escolha uma opção para continuar</Text>

      <View style={styles.opcoesContainer}>
        {/* Botão Nutricionista */}
        <TouchableOpacity
          style={styles.opcao}
          onPress={() => navigation.navigate("HomeNutri")}
        >
          <Image
            source={nutritionistIcon} 
            style={styles.icone}
          />
          <Text style={styles.textoOpcao}>Nutricionista</Text>
        </TouchableOpacity>

        {/* Botão Paciente */}
        <TouchableOpacity
          style={styles.opcao}
          onPress={() => navigation.navigate("Login")}
        >
          <Image
            source={patientIcon} 
            style={styles.icone}
          />
          <Text style={styles.textoOpcao}>Paciente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

StartScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitulo: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 30,
  },
  opcoesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "30%",
    paddingHorizontal: 20,
  },
  opcao: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    width: "45%",
  },
  icone: {
    width: 80,
    height: 80,
    marginBottom: 10,
    resizeMode: "contain",
  },
  textoOpcao: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

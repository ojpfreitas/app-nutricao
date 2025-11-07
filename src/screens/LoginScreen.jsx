import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types"; 


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    if (!email || !senha) {
      alert("Atenção, Preencha todos os campos!");
      return;
    }

    // Aqui você pode colocar sua lógica de autenticação (API, banco, etc)
    if (email === "teste" && senha === "123") {
      navigation.navigate("Home"); // ou outra tela do app
    } else {
      alert("Erro, E-mail ou senha incorretos!");
    }
  };

  return (
    <View style={styles.container}>

        <Text style={styles.titulo}>Bem-vindo!</Text>
        <Text style={styles.subtitulo}>Faça login para continuar</Text>

        <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
        />

        <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#888"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
        />
        {/* <View style={styles.orangeButton}>
        <OrangeButton title="Entrar" onPress={handleLogin}/>
        </View> */}
        <TouchableOpacity style={styles.botao} onPress={handleLogin}>
            <Text style={styles.textoBotao}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
            <Text style={styles.link}>Criar uma conta</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    orangeButton: {
        marginTop: 20,
        width: "100%"
    },
    container: {
        flex: 1,
        backgroundColor: "orange",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
        resizeMode: "contain",
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
    input: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    botao: {
        width: "100%",
        backgroundColor: "#2e7d32",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    textoBotao: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    link: {
        color: "#fff",
        marginTop: 20,
        fontSize: 16,
        textDecorationLine: "underline",
    },
});

LoginScreen.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

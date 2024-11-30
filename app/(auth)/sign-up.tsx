import React, { useState, useRef } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  View,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router"; // Usando o hook do Expo Router
import { Colors, messageBoxStyle } from "@/constants/Style";
import { createUser } from "../../lib/appwrite"; // Certifique-se de importar a função de criação corretamente

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter(); 

  const handleSignUp = async () => {
    try {
      await createUser(email, password, username);
      showMessage({
        text: "Cadastro realizado com sucesso!",
        style: MessageBoxStyle.successMessage,
      });
      setTimeout(() => router.push("/sign-in"), 3000);
    } catch (error) {
      showMessage({
        text: error.message,
        style: MessageBoxStyle.errorMessage,
      });
    }
  };

  const showMessage = (message) => {
    setMessage(message);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => setMessage(null));
      }, 3000);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.title}>Crie sua conta!</Text>
          <Text style={styles.subtitle}>Preencha os campos para se registrar</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome de usuário"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="words"
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#aaa"
          />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

          <Text style={styles.footerText}>
            Já tem uma conta?{" "}
            <Text style={styles.link} onPress={() => router.push("/sign-in")}>
              Faça login
            </Text>
          </Text>

      {message?.text && (
        <Animated.View
          style={[messageBoxStyle.messageContainer, { opacity: fadeAnim }]}
        >
          <Text style={message.style}>{message.text}</Text>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 15,
    width: "90%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    color: Colors.accent,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: Colors.white,
    color: "#000",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: Colors.accent,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: "#ccc",
  },
  link: {
    color: Colors.accent,
    fontWeight: "bold",
  },
});

export default SignUp;



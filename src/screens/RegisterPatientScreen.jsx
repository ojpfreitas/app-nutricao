import { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { setPatient } from "../store/patientSlice";
import Header from "../components/Header";
import OrangeButton from "../components/OrangeButton";
import Footer from "../components/Footer";
import PropTypes from "prop-types";

// 🔹 API e Storage
import { savePatient, loadPatient, removePatient } from "../api/storage";
import { syncPatientWithServer } from "../api/patientApi";
import { addToQueue } from "../api/syncQueue";

// ✅ Schema de validação (zod)
const schema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().optional(),
  age: z.string().optional(),
  gender: z.string().optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  observations: z.string().optional(),
});

export default function RegisterPatientScreen({ navigation }) {
  const dispatch = useDispatch();

  const { control, handleSubmit, setValue, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      age: "",
      gender: "",
      height: "",
      weight: "",
      observations: "",
    },
  });

  // 🔸 Carrega paciente salvo localmente (offline)
  useEffect(() => {
    (async () => {
      const saved = await loadPatient();
      if (saved) {
        Object.entries(saved).forEach(([key, value]) => setValue(key, value));
      }
    })();
  }, []);

  // 🔸 Ao enviar o formulário
  const onSubmit = async (data) => {
    console.log("📦 Dados do paciente:", data);
    dispatch(setPatient(data)); // salva no Redux

    try {
      const synced = await syncPatientWithServer();

      if (synced) {
        Alert.alert("✅ Sucesso", "Paciente cadastrado no servidor!");
        await removePatient();
        reset();
      } else {
        await savePatient(data);
        await addToQueue(data);
        Alert.alert("📶 Offline", "Sem conexão. Paciente salvo localmente.");
      }
    } catch (err) {
      console.error("❌ Erro ao salvar paciente:", err);
      Alert.alert("Erro", "Não foi possível cadastrar o paciente.");
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Cadastro de Paciente" navigation={navigation} />

      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          <ScrollView contentContainerStyle={styles.scroll}>
            <Text style={styles.sectionTitle}>Informações Pessoais</Text>

            <Field label="Nome Completo" name="name" control={control} placeholder="Ex: João Silva" />
            <Field label="E-mail" name="email" control={control} keyboardType="email-address" />
            <Field label="Telefone" name="phone" control={control} keyboardType="phone-pad" />
            <Field label="Idade" name="age" control={control} keyboardType="numeric" />
            <Field label="Sexo" name="gender" control={control} placeholder="Masculino / Feminino / Outro" />

            <Text style={styles.sectionTitle}>Informações Físicas</Text>
            <Field label="Altura (cm)" name="height" control={control} keyboardType="numeric" />
            <Field label="Peso (kg)" name="weight" control={control} keyboardType="numeric" />

            <Text style={styles.sectionTitle}>Observações</Text>
            <Field label="Observações" name="observations" control={control} multiline />

            <View style={styles.orangeButton}>
              <OrangeButton title="Salvar Cadastro" onPress={handleSubmit(onSubmit)} />
            </View>
          </ScrollView>
        </View>
      </View>

      <Footer navigation={navigation} />
    </View>
  );
}

function Field({ label, name, control, ...props }) {
  return (
    <View style={styles.fieldRow}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, props.multiline && { height: 90, textAlignVertical: "top" }]}
            value={value}
            onChangeText={onChange}
            placeholder={label}
            {...props}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
  },
  cardWrapper: {
    flex: 1,
    padding: 20,
    paddingBottom: 80,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  scroll: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  fieldRow: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  orangeButton: {
    marginTop: 20,
  },
});

RegisterPatientScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

import { Platform, Alert } from "react-native";
import axios from "axios";
import { savePatient, loadPatient, removePatient } from "./storage";

// Define baseURL de acordo com a plataforma
const baseURL = "http://localhost:3001";

const API = axios.create({ baseURL });

/* 🔹 API SERVER */
export async function getPatients() {
  try {
    const res = await API.get("/patients");
    return res.data;
  } catch (err) {
    console.error("Erro ao buscar pacientes:", err.message);
    return [];
  }
}

export async function createPatient(data) {
  try {
    const res = await API.post("/patients", data);
    return res.data;
  } catch (err) {
    console.error("Erro ao criar paciente:", err.message);
    throw err;
  }
}

export async function updatePatient(id, data) {
  try {
    const res = await API.put(`/patients/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Erro ao atualizar paciente:", err.message);
    throw err;
  }
}

export async function deletePatient(id) {
  try {
    const res = await API.delete(`/patients/${id}`);
    return res.data;
  } catch (err) {
    console.error("Erro ao deletar paciente:", err.message);
    throw err;
  }
}

/* 🔹 LOCAL STORAGE */
export async function savePatientLocal(data) {
  try {
    await savePatient(data);
    console.log("Dados do paciente salvos localmente.");
  } catch (err) {
    console.error("Erro ao salvar paciente localmente:", err);
    Alert.alert("Erro", "Não foi possível salvar localmente.");
  }
}

export async function loadPatientLocal() {
  try {
    const data = await loadPatient();
    return data;
  } catch (err) {
    console.error("Erro ao carregar paciente local:", err);
    return null;
  }
}

export async function removePatientLocal() {
  try {
    await removePatient();
  } catch (err) {
    console.error("Erro ao remover paciente local:", err);
  }
}

/* 🔹 SYNC LOCAL ↔ SERVER */
export async function syncPatientWithServer() {
  const local = await loadPatientLocal();
  if (!local) {
    console.log("Nenhum paciente local para sincronizar.");
    return null;
  }

  console.log("Tentando sincronizar paciente com servidor:", local);

  try {
    const synced = await createPatient(local);
    console.log("Sincronização bem-sucedida:", synced);
    await removePatientLocal();
    return synced;
  } catch (err) {
    console.warn("Falha ao sincronizar paciente:", err.message);
    return null;
  }
}

/* 🔹 Função principal usada no onSubmit */
export async function handleSavePatient(data, reset, dispatch, setRedux) {
  console.log("==== Iniciando cadastro de paciente ====");
  console.log("Dados do formulário:", data);

  dispatch(setRedux(data)); // Atualiza Redux sempre

  try {
    const synced = await syncPatientWithServer();

    if (synced) {
      Alert.alert("Sucesso", "Paciente cadastrado com sucesso!");
      reset();
      await removePatientLocal();
      dispatch(setRedux({})); // limpa Redux
    } else {
      console.warn("⚠️ Sem conexão. Salvando paciente localmente...");
      await savePatient(data);
      Alert.alert("Offline", "Sem conexão. Paciente salvo localmente.");
      reset();
    }
  } catch (err) {
    console.error("Erro ao salvar paciente:", err);
    Alert.alert("Erro", "Não foi possível salvar o cadastro do paciente.");
  }

  console.log("===== Cadastro de paciente finalizado =====");
}

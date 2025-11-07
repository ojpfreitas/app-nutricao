import { Platform, Alert } from "react-native";
import axios from "axios";
import {saveAnthropometry, loadAnthropometry, removeAnthropometry } from "./storage";

// Define baseURL de acordo com a plataforma
const baseURL = "http://localhost:3001";

const API = axios.create({ baseURL });

// 🔹 API SERVER
export async function getAnthropometries() {
  try {
    const res = await API.get("/anthropometries");
    return res.data;
  } catch (err) {
    console.error("Erro ao buscar antropometrias:", err.message);
    return [];
  }
}

export async function createAnthropometry(data) {
  try {
    const res = await API.post("/anthropometries", data);
    return res.data;
  } catch (err) {
    console.error("Erro ao criar antropometria:", err.message);
    throw err;
  }
}

export async function updateAnthropometry(id, data) {
  try {
    const res = await API.put(`/anthropometries/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Erro ao atualizar antropometria:", err.message);
    throw err;
  }
}

export async function deleteAnthropometry(id) {
  try {
    const res = await API.delete(`/anthropometries/${id}`);
    return res.data;
  } catch (err) {
    console.error("Erro ao deletar antropometria:", err.message);
    throw err;
  }
}

// 🔹 LOCAL STORAGE usando módulo universal
export async function saveAnthropometryLocal(data) {
  try {
    await saveAnthropometry(data);
    console.log("Dados salvos localmente.");
  } catch (err) {
    console.error("Erro ao salvar localmente:", err);
    Alert.alert("Erro", "Não foi possível salvar localmente.");
  }
}

export async function loadAnthropometryLocal() {
  try {
    const data = await loadAnthropometry();
    return data;
  } catch (err) {
    console.error("Erro ao carregar dados locais:", err);
    return null;
  }
}

export async function removeAnthropometryLocal() {
  try {
    await removeAnthropometry();
  } catch (err) {
    console.error("Erro ao remover dados locais:", err);
  }
}

// 🔹 SYNC LOCAL ↔ SERVER
export async function syncAnthropometryWithServer() {
  const local = await loadAnthropometryLocal();
  if (!local) {
    console.log("Nenhum dado local para sincronizar.");
    return null;
  }

  console.log("Tentando sincronizar com servidor:", local);

  try {
    const synced = await createAnthropometry(local);
    console.log("Sincronização bem-sucedida:", synced);
    await removeAnthropometryLocal(); // limpa local após sync
    return synced;
  } catch (err) {
    console.warn("Falha ao sincronizar com servidor:", err.message);
    return null;
  }
}

// 🔹 Função principal usada no onSubmit
export async function handleSaveAnthropometry(data, reset, dispatch, setRedux) {
  console.log("==== onSubmit iniciado ====");
  console.log("Dados do formulário:", data);

  dispatch(setRedux(data)); // Atualiza Redux sempre

  try {
    const synced = await syncAnthropometryWithServer();

    if (synced) {
      Alert.alert("Sucesso", "Dados enviados para o servidor!");
      reset(); // Limpa inputs
      await removeAnthropometryLocal(); // Limpa local também
      dispatch(setRedux({})); // limpa redux
    } else {
      console.warn("⚠️ Sem conexão. Salvando localmente...");
      await saveAnthropometry(data);
      Alert.alert("Offline", "Sem conexão. Dados salvos localmente.");
      reset(); // Limpa inputs mesmo offline
    }
  } catch (err) {
    console.error("Erro ao salvar avaliação:", err);
    Alert.alert("Erro", "Não foi possível salvar os dados.");
  }

  console.log("===== onSubmit finalizado =====");
}

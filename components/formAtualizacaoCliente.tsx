import { Cliente } from "@/interfaces/Cliente";
import { putCliente } from "@/services/clienteService";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import MaskInput, { Masks } from "react-native-mask-input";
import ButtonSave from "./ui/buttonSave";

type FormPros = {
  onSucess: () => void;
  cliente: Cliente;
};

export default function FormAtualizacaoCliente({
  onSucess,
  cliente,
}: FormPros) {
  const svgPath =
    "M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z";
  const [id, setId] = useState(cliente._id);
  const [nome, setNome] = useState(cliente.nome);
  const [email, setEmail] = useState(cliente.email);
  const [telefone, setTelefone] = useState(cliente.telefone);
  const [statusPlano, setStatusPlano] = useState(cliente.status);

  const [salvando, setSalvando] = useState(false);

  const handleSalvar = async () => {
    if (!nome || !telefone) {
      Alert.alert("Atencao", "Faltou preencher o nome e o telefone!");
      return;
    }

    const atualizacaoCliente: Cliente = {
      _id: id,
      nome: nome,
      telefone: telefone,
      email: email,
      status: statusPlano,
    };

    try {
      setSalvando(true);
      await putCliente(atualizacaoCliente);

      Alert.alert("Sucesso!", "Cliente atualizado com sucesso.");
      onSucess();
    } catch (err) {
      Alert.alert("Erro!", "Houve um erro ao cadastrar o cliente.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.font_title}>Cadastrar Novo Cliente</Text>

      <Text style={style.font_label}>Nome</Text>
      <View style={style.container_form}>
        <TextInput
          style={style.font_input}
          placeholder="Nome"
          value={nome}
          placeholderTextColor={"#A0AEC0"}
          onChangeText={setNome}
        />
      </View>

      <Text style={style.font_label}>Telefone</Text>
      <View style={style.container_form}>
        <MaskInput
          style={style.font_input}
          onChangeText={(masked) => {
            setTelefone(masked);
          }}
          mask={Masks.BRL_PHONE}
          placeholder="(00) 0000-0000"
          value={telefone}
          placeholderTextColor={"#A0AEC0"}
        />
      </View>

      <Text style={style.font_label}>E-mail</Text>
      <View style={style.container_form}>
        <TextInput
          style={style.font_input}
          placeholder="exemplo@gmail.com"
          placeholderTextColor={"#A0AEC0"}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <Text style={style.font_label}>Status do cliente</Text>
      <View style={style.container_form}>
        <View style={style.pickerWrapper}>
          <Picker
            selectedValue={statusPlano}
            onValueChange={(itemValue) => setStatusPlano(itemValue)}
            style={{
              borderWidth: 0,
              backgroundColor: "transparent",
              color: "#1A202C",
            }}
            mode="dropdown"
          >
            <Picker.Item label="Em Negociação" value="EM_NEGOCIACAO" />
            <Picker.Item label="Contrato Assinado" value="CONTRATO_ASSINADO" />
            <Picker.Item label="Cancelado" value="CANCELADO" />
          </Picker>
        </View>
      </View>
      <View style={style.container_button}>
        {salvando ? (
          <ActivityIndicator size="large" color="#0F2B5B" />
        ) : (
          <ButtonSave
            svg={svgPath}
            title={"Salvar cliente"}
            onPress={handleSalvar}
          />
        )}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: 338,
    borderRadius: 15,
    backgroundColor: "#FFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    paddingBottom: 25,
  },

  container_form: {
    paddingLeft: 20,
    paddingRight: 20,
  },

  container_button: {
    paddingTop: 10,
    paddingLeft: 20,
  },

  font_title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0A1628",
    paddingTop: 12,
    paddingLeft: 20,
  },

  font_label: {
    fontSize: 14,
    color: "#0A1628",
    paddingTop: 10,
    paddingLeft: 20,
    marginBottom: 4,
  },

  font_input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 40,
    fontSize: 14,
    color: "#1A202C",
  },

  pickerWrapper: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    height: 40,
    justifyContent: "center",
  },
});

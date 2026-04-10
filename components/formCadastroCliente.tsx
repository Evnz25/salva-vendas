import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import MaskInput, { Masks } from "react-native-mask-input";
import ButtonSaveCliente from "./ui/buttonSaveCliente";

export default function FormCadastroCliente() {
  const [telefone, setTelefone] = useState("");
  const [statusPlano, setStatusPlano] = useState("PROSPECCAO");

  return (
    <View style={style.container}>
      <Text style={style.font_title}>Cadastrar Novo Cliente</Text>

      <Text style={style.font_label}>Nome</Text>
      <View style={style.container_form}>
        <TextInput
          style={style.font_input}
          placeholder="Nome"
          placeholderTextColor={"#A0AEC0"}
        />
      </View>

      <Text style={style.font_label}>Telefone</Text>
      <View style={style.container_form}>
        <MaskInput
          style={style.font_input}
          value={telefone}
          onChangeText={(masked) => {
            setTelefone(masked);
          }}
          mask={Masks.BRL_PHONE}
          placeholder="(00) 0000-0000"
          placeholderTextColor={"#A0AEC0"}
        />
      </View>

      <Text style={style.font_label}>E-mail</Text>
      <View style={style.container_form}>
        <TextInput
          style={style.font_input}
          placeholder="exemplo@gmail.com"
          placeholderTextColor={"#A0AEC0"}
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
            <Picker.Item label="Prospecção" value="PROSPECCAO" />
            <Picker.Item label="Em Negociação" value="EM_NEGOCIACAO" />
            <Picker.Item label="Contrato Assinado" value="CONTRATO_ASSINADO" />
            <Picker.Item label="Cancelado" value="CANCELADO" />
          </Picker>
        </View>
      </View>
      <View style={style.container_button}>
        <ButtonSaveCliente />
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

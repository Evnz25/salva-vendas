import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import MaskInput, { Masks } from "react-native-mask-input";
import ButtonSave from "./ui/buttonSave";

export default function FormCadastroMeta() {
  const [valor, setValor] = useState("");
  const [dataMeta, setDataMeta] = useState(new Date());
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  const svgPath =
    "M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0";
  const dataFormatada = dataMeta.toLocaleDateString("pt-BR");

  const aoMudarData = (evento: any, dataSelecionada?: Date) => {
    if (Platform.OS === "android") {
      setMostrarCalendario(false);
    }

    if (dataSelecionada) {
      setDataMeta(dataSelecionada);
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.font_title}>Cadastrar Nova Meta</Text>
      <Text style={style.font_label}>Valor da Meta</Text>
      <View style={style.container_form}>
        <MaskInput
          style={style.font_input}
          value={valor}
          onChangeText={(masked) => {
            setValor(masked);
          }}
          mask={Masks.BRL_CURRENCY}
          placeholder="R$ 0,00"
          placeholderTextColor={"#A0AEC0"}
        />
      </View>
      <Text style={style.font_label}>Prazo da Meta</Text>
      <View style={style.container_form}>
        <TouchableOpacity
          style={style.font_input}
          onPress={() => setMostrarCalendario(true)}
          activeOpacity={0.7}
        >
          <Text style={style.font_data}>{dataFormatada}</Text>
        </TouchableOpacity>
        {mostrarCalendario && (
          <DateTimePicker
            value={dataMeta}
            mode="date"
            display="default"
            onChange={aoMudarData}
            minimumDate={new Date()}
          />
        )}
      </View>
      <View style={style.container_button}>
        <ButtonSave svg={svgPath} title={"Salvar Meta"} />
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
    marginBottom: 10,
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
    justifyContent: "center",
    fontSize: 14,
    color: "#1A202C",
  },

  font_data: {
    fontSize: 14,
    color: "#1A202C",
  },
});

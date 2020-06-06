import React from "react";
import { Feather as Icon } from "@expo/vector-icons";
import { View, Image, Text, ImageBackground } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import styles from "./styles";
// hooks
import { ufsHook } from "./../../hooks/cities-ufs";

const Home = () => {
  const navigation = useNavigation();
  const ufs = ufsHook();

  const handleNavigateToPoints = () => {
    navigation.navigate("Points");
  };

  return (
    <ImageBackground
      source={require("../../assets/home-background.png")}
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={require("../../assets/logo.png")} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>
          Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
        </Text>
      </View>

      <View style={styles.footer}>
        <RNPickerSelect
          onValueChange={() => {}}
          items={ufs.map((uf) => {
            return { label: uf, value: uf };
          }, [])}
        />

        <RectButton style={styles.button} onPress={handleNavigateToPoints}>
          <View style={styles.buttonIcon}>
            <Text>
              <Icon name="log-in" color="#FFF" size={24} />
            </Text>
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
};

export default Home;

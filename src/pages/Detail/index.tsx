import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Linking,
} from "react-native";
import { Feather as Icon, FontAwesome } from "@expo/vector-icons";
import * as MailComposer from "expo-mail-composer";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import styles from "./styles";
import pointDetailHook from "./../../hooks/point-detail";

interface Params {
  point_id: number;
}

const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { point_id } = route.params as Params;
  const data = pointDetailHook(point_id);

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  const handleComposeMail = () => {
    MailComposer.composeAsync({
      subject: "Coleta de resíduos",
      recipients: [`${data?.point.email}`],
    });
  };

  const handleWhatsapp = () => {
    Linking.openURL(
      `whatsapp://send?phone=${data?.point.whatsapp}&text=Interesse na coleta de resíduos`
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Image
          style={styles.pointImage}
          source={{
            uri: data?.point.image_url,
          }}
        />

        <Text style={styles.pointName}>{data?.point.name}</Text>
        <Text style={styles.pointItems}>
          {data?.items.map((item) => item.title).join(", ")}
        </Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>
            {data?.point.city}, {data?.point.uf}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleWhatsapp}>
          <FontAwesome name="whatsapp" size={20} color="#FFF" />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>
        <RectButton style={styles.button} onPress={handleComposeMail}>
          <Icon name="mail" size={20} color="#FFF" />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
};

export default Detail;

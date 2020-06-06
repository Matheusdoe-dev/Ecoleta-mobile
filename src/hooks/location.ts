import { Alert } from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";

const locationHook = () => {
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  useEffect(() => {
    const loadPosition = async () => {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Oooops",
          "Precisamos de sua permissão para obter a sua localização"
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      console.log(latitude, longitude);

      setInitialPosition([latitude, longitude]);
    };

    loadPosition();
  }, []);

  return initialPosition;
};

export default locationHook;

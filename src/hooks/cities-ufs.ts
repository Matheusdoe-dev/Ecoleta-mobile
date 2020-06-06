import { useState, useEffect, ChangeEvent } from "react";
import ibgeApi from "../services/ibge-api";

interface UF {
  name: string;
}

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

export const citiesHook = () => {
  const [cities, setCities] = useState<string[]>([]);
};

export const ufsHook = () => {
  const [ufs, setUfs] = useState<string[]>([]);

  useEffect(() => {
    ibgeApi.get<IBGEUFResponse[]>("/").then((response) => {
      const ufInitials = response.data.map((uf) => uf.sigla);

      setUfs(ufInitials);
    });
  }, []);

  return ufs;
};

export const hookUf = () => {
  const [selectedUf, setSelectedUf] = useState("0");

  const handleSelectedUf = (event: ChangeEvent<HTMLSelectElement>) => {
    const uf = event.target.value;

    setSelectedUf(uf);
  };

  return { selectedUf, handleSelectedUf };
};

export const hookCity = (selectedUf: string) => {
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState("0");

  useEffect(() => {
    if (selectedUf === "0") {
      return;
    }

    ibgeApi
      .get<IBGECityResponse[]>(`/${selectedUf}/municipios`)
      .then((response) => {
        const cityNames = response.data.map((city) => city.nome);

        setCities(cityNames);
      });
  }, [selectedUf]);
};

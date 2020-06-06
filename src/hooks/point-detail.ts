import { useState, useEffect } from "react";
import ecoletaApi from "../services/ecoleta-api";

interface Data {
  point: {
    image: string;
    image_url: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  items: {
    title: string;
  }[];
}

const pointDetailHook = (params: number) => {
  const [data, setData] = useState<Data>({} as Data);

  useEffect(() => {
    ecoletaApi.get(`points/${params}`).then((response) => {
      setData(response.data);
    });
  }, []);

  if (!data.point) {
    return null;
  }

  return data;
};

export default pointDetailHook;

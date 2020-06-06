import { useState, useEffect } from "react";
import ecoletaApi from "../services/ecoleta-api";

interface Point {
  id: number;
  image: string;
  image_url: string;
  nome: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;
  items: {
    title: string;
  }[];
}

const pointsHook = () => {
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    ecoletaApi
      .get("points", {
        params: {
          city: "Salvador",
          uf: "BA",
          items: [1, 2, 3, 4, 5, 6],
        },
      })
      .then((response) => {
        setPoints(response.data);
      });
  });
  return points;
};

export default pointsHook;

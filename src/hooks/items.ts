import { useState, useEffect } from "react";
import ecoletaApi from "../services/ecoleta-api";

interface Item {
  id: number;
  title: string;
  image_url: string;
}

const itemsHook = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  useEffect(() => {
    ecoletaApi.get("items").then((response) => {
      setItems(response.data);
    });
  }, []);

  const handleSelectedItem = (id: number) => {
    const alreadySelected = selectedItems.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== id);

      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return {
    items: items,
    selectedItems: selectedItems,
    handleSelectedItem: handleSelectedItem,
  };
};

export default itemsHook;

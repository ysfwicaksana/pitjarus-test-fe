import api from "../api";

const getStoreArea = async () => {
  try {
    const storeArea = await api.get("/store-area");

    const { data } = storeArea;

    return data;
  } catch (err) {
    console.error(err);
  }
};

export { getStoreArea };

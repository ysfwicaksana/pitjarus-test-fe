import api from "../api";

const report = async (data) => {
  const { area, dateFrom, dateTo } = data;
  try {
    const form = new FormData();
    form.append("area", area);
    form.append("dateFrom", dateFrom);
    form.append("dateTo", dateTo);
    const generate = await api.post("/report", form);

    return generate.data;
  } catch (err) {
    console.log(err);
  }
};

export { report };

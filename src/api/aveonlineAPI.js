const baseUrl = "http://localhost:9092/v1";
export const getMedicamentos = async () => {
  const url = `${baseUrl}/medicamento`;
  return fetch(url).then((response) => {
    return response.json();
  });
};

export const saveMedicamento = async (data) => {
  const url = `${baseUrl}/medicamento`;
  return fetch(url, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};

export const getPromociones = async () => {
  const url = `${baseUrl}/promocion`;
  return fetch(url).then((response) => {
    return response.json();
  });
};

export const savePromocion = async (data) => {
  const url = `${baseUrl}/promocion`;
  return fetch(url, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};

export const getFacturas = async (from, to) => {
  const url = `${baseUrl}/factura?fecha_inicio=${from}&fecha_fin=${to}`;
  return fetch(url).then((response) => {
    return response.json();
  });
};

export const saveFactura = async (data) => {
  const url = `${baseUrl}/factura`;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};

export const simularCompra = async (fechaCompra, ids) => {
  const queryids = ids.join("&");
  const url = `${baseUrl}/factura/simular?fecha_compra=${fechaCompra}&id_medicamentos=${queryids}`;
  return fetch(url).then((response) => {
    return response.json();
  });
};

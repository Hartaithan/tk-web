export const encodeLoginForm = (object: Object): URLSearchParams => {
  const form = new URLSearchParams();
  const fields = Object.entries(object);
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    if (field[0] === "username") {
      const value = field[1].replace(/[^0-9+]/g, "");
      form.append(field[0], "+" + value);
    } else {
      form.append(field[0], field[1]);
    }
  }
  form.append("grant_type", "phone");
  form.append("resource", "TransportCard");
  form.append("scope", "openid profile roles offline_access");
  return form;
};

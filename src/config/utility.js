export const utilityFunctions = {
  async saveKey(key, value) {
    try {
      await window.sessionStorage.setItem(key, value);
    } catch (error) {
      error.response();
    }
  },
  async getValue(key) {
    try {
      const token = await window.sessionStorage.getItem(key);
      return token;
    } catch (err) {
      err.response();
    }
  },
};

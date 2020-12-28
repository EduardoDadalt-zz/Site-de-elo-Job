import fire from "../config/fire";

export const getDataFromDatabase = async (url) => {
  return (
    await fire
      .database()
      .ref(url)
      .once("value", (e) => e.val())
  ).toJSON();
};

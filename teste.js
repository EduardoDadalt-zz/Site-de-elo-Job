(async () => {
  try {
    await new Promise((resolve, reject) => setTimeout(reject, 2000));
    console.log("Deu bom");
  } catch (error) {
    console.log("Deu erro");
  }
})();

require("./db.js");
const app = require('./app');

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на порту ${PORT}`);
});

const app = require("./app");
require('dotenv').config();

if (process.env.NODE_ENV === "Localhost") {
  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} else {
  module.exports = app;
}

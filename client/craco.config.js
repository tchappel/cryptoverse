const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
      "@services": path.resolve(__dirname, "src/services/"),
      "@images": path.resolve(__dirname, "src/images/"),
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        "^@components(.*)$": "<rootDir>/src/components$1",
        "^@services(.*)$": "<rootDir>/src/services$1",
        "^@images(.*)$": "<rootDir>/src/images$1",
      },
    },
  },
};

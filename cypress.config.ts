import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200",

    specPattern: "cypress/E2E/**/*.cy.{js,ts}",  // ✅ ICI LA SOLUTION

    env: {
      apiUrl: "http://localhost:8081",
      username: "test2@test.fr",
      password: "testtest",
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});

module.exports = {
  apps: [
    {
      name: "MrChoffer-Back",
      script: "./src/index.js",
      env: {
        NODE_ENV: "production",
      },
      exec_mode: "cluster",
      instances: 1,
    },
  ],
};

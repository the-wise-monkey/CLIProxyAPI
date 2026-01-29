const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const REPO_URL = "https://github.com/edlsh/ai-cli-proxy-api.git";
const REPO_DIR = path.join(__dirname, "..", "CLIProxyAPI");

function run(cmd) {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
}

console.log("🚀 CLIProxyAPI Starter");

// Clone repo if missing
if (!fs.existsSync(REPO_DIR)) {
  console.log("📥 CLIProxyAPI repo not found. Cloning...");
  run(`git clone ${REPO_URL} CLIProxyAPI`);
} else {
  console.log("✅ Repo already exists");
}

// Copy config + compose
console.log("⚙️ Copying config + compose...");
fs.copyFileSync(
  path.join(__dirname, "..", "config.yaml"),
  path.join(REPO_DIR, "config.yaml")
);

fs.copyFileSync(
  path.join(__dirname, "..", "docker-compose.yml"),
  path.join(REPO_DIR, "docker-compose.yml")
);

// Ensure persistent data folder
const dataDir = path.join(REPO_DIR, "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Start docker compose
console.log("🐳 Starting Docker Compose...");
run(`cd CLIProxyAPI && docker compose up -d --build`);

console.log("\n✅ CLIProxyAPI running at http://localhost:8317");
console.log("Next step: login once:");
console.log("docker exec -it cliproxyapi ./CLIProxyAPI --claude-login");

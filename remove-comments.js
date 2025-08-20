
import fs from "fs";
import path from "path";


const exts = [".js", ".ts", ".jsx", ".tsx", ".css", ".html"];


const regex = {
  js: /\/\/.*$|\/\*[\s\S]*?\*\
  css: /\/\*[\s\S]*?\*\
  html: /<!--[\s\S]*?-->/gm
};

function processFile(file) {
  const ext = path.extname(file).toLowerCase();
  if (!exts.includes(ext)) return;

  let content = fs.readFileSync(file, "utf8");
  let newContent = content;

  if ([".js", ".ts", ".jsx", ".tsx"].includes(ext)) {
    newContent = newContent.replace(regex.js, "");
  }
  if (ext === ".css") {
    newContent = newContent.replace(regex.css, "");
  }
  if (ext === ".html") {
    newContent = newContent.replace(regex.html, "");
  }

  if (newContent !== content) {
    fs.writeFileSync(file, newContent, "utf8");
    console.log(`🧹 Limpieza: ${file}`);
  }
}

function walk(dir) {
  fs.readdirSync(dir).forEach((f) => {
    const fullPath = path.join(dir, f);
    if (fs.statSync(fullPath).isDirectory()) {
      if (f === "node_modules" || f === ".git") return;
      walk(fullPath);
    } else {
      processFile(fullPath);
    }
  });
}

walk(process.cwd());
console.log("✅ Todos los comentarios eliminados.");

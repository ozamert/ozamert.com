#!/usr/bin/env node
/**
 * Local LLM prompt runner — Ollama-compatible
 * Usage: node scripts/prompt.mjs <prompt-name> [variable=value ...]
 * Example: node scripts/prompt.mjs ideation TRACK=DevOps
 *
 * Requires Ollama running: ollama serve
 * Set MODEL env var to override default: MODEL=deepseek-coder node scripts/prompt.mjs ...
 */

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));

const MODEL = process.env.MODEL ?? "qwen2.5-coder";
const OLLAMA_URL = process.env.OLLAMA_URL ?? "http://localhost:11434";

const [, , promptName, ...vars] = process.argv;

if (!promptName) {
  console.error("Usage: node scripts/prompt.mjs <prompt-name> [KEY=value ...]");
  console.error("Prompts:", [
    "ideation", "seo-brief", "outline-to-draft", "bug-diary",
    "code-explain", "case-study", "travel-guide", "music-plan",
    "language-plan", "social-repurpose", "og-brief"
  ].join(", "));
  process.exit(1);
}

const promptFile = join(__dir, "prompts", `${promptName}.txt`);
let prompt;
try {
  prompt = readFileSync(promptFile, "utf8");
} catch {
  console.error(`Prompt file not found: ${promptFile}`);
  process.exit(1);
}

// Replace [KEY] placeholders from CLI args
for (const v of vars) {
  const [key, ...rest] = v.split("=");
  prompt = prompt.replaceAll(`[${key}]`, rest.join("="));
}

console.error(`\n→ Model: ${MODEL} | Prompt: ${promptName}\n`);

const res = await fetch(`${OLLAMA_URL}/api/generate`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ model: MODEL, prompt, stream: true }),
});

if (!res.ok) {
  const text = await res.text();
  console.error(`Ollama error ${res.status}: ${text}`);
  process.exit(1);
}

// Stream output
for await (const chunk of res.body) {
  const lines = Buffer.from(chunk).toString().split("\n").filter(Boolean);
  for (const line of lines) {
    try {
      const { response, done } = JSON.parse(line);
      if (response) process.stdout.write(response);
      if (done) process.stdout.write("\n");
    } catch {}
  }
}

/**
 * Run once to generate embeddings:
 * OPENAI_API_KEY=sk-... npx tsx scripts/generate-embeddings.ts
 */

import { knowledgeChunks } from "../src/data/knowledge";
import fs from "fs";
import path from "path";

async function getEmbedding(text: string, apiKey: string): Promise<number[]> {
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: text,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI error: ${err}`);
  }
  const data = await res.json();
  return data.data[0].embedding;
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("❌ OPENAI_API_KEY not set");
    console.error(
      "Usage: OPENAI_API_KEY=sk-... npx tsx scripts/generate-embeddings.ts",
    );
    process.exit(1);
  }

  console.log(
    `🔄 Generating embeddings for ${knowledgeChunks.length} chunks...`,
  );

  const embedded = [];
  for (const chunk of knowledgeChunks) {
    process.stdout.write(`  → ${chunk.id}...`);
    const embedding = await getEmbedding(chunk.content, apiKey);
    embedded.push({ ...chunk, embedding });
    console.log(" ✓");

    // Small delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 100));
  }

  const outputPath = path.join(process.cwd(), "src/data/embeddings.json");
  fs.writeFileSync(outputPath, JSON.stringify(embedded, null, 2));

  console.log(`\n✅ Done! Saved to src/data/embeddings.json`);
  console.log(`   ${embedded.length} chunks embedded`);
  console.log(`   Model: text-embedding-3-small`);
  console.log(
    `   Cost: ~$0.000002 per chunk = ~$0.00004 total (basically free)`,
  );
}

main().catch(console.error);

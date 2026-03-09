import { knowledgeChunks, KnowledgeChunk } from "@/data/knowledge";
import embeddingsData from "@/data/embeddings.json";

// ─── TYPES ───────────────────────────────────────────────────────────────────
export interface EmbeddedChunk extends KnowledgeChunk {
  embedding: number[];
}

// ─── COSINE SIMILARITY ───────────────────────────────────────────────────────
function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0,
    normA = 0,
    normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// ─── GET EMBEDDING FROM OPENAI ───────────────────────────────────────────────
export async function getEmbedding(
  text: string,
  apiKey: string,
): Promise<number[]> {
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
  if (!res.ok) throw new Error(`Embeddings API error: ${res.status}`);
  const data = await res.json();
  return data.data[0].embedding;
}

// ─── SEARCH ──────────────────────────────────────────────────────────────────
export async function searchKnowledge(
  query: string,
  apiKey: string,
  topK = 4,
): Promise<KnowledgeChunk[]> {
  // Static import — works in Next.js App Router
  const embeddedChunks = embeddingsData as EmbeddedChunk[];

  // Get query embedding
  const queryEmbedding = await getEmbedding(query, apiKey);

  // Score all chunks
  const scored = embeddedChunks.map((chunk) => ({
    chunk,
    score: cosineSimilarity(queryEmbedding, chunk.embedding),
  }));

  // Sort by score and return top K
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((s) => ({
      id: s.chunk.id,
      category: s.chunk.category,
      content: s.chunk.content,
    }));
}

// ─── BUILD CONTEXT STRING ────────────────────────────────────────────────────
export function buildContext(chunks: KnowledgeChunk[]): string {
  return chunks.map((c) => c.content).join("\n\n");
}

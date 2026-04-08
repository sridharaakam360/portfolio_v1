import { pipeline, env } from '@xenova/transformers';
import { knowledgeBase } from '../data/knowledge';

// Optional: Disable local models so it strictly fetches from Hugging Face Hub over CDN.
env.allowLocalModels = false;

// We will keep a global reference to the feature extraction pipeline
let extractor: any = null;

// The populated knowledge base with precomputed or dynamically computed embeddings
export interface EmbeddedContent {
  id: string;
  content: string;
  embedding: number[];
}

let embeddedKnowledge: EmbeddedContent[] = [];

/**
 * Initialize the embedding model. This downloads the weights
 * on the first run (cached in the browser thereafter).
 */
export async function initRAG(onProgress?: (progress: number) => void) {
  if (!extractor) {
    // using a highly capable small model for semantic search
    extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
      progress_callback: (data: any) => {
        if (data.status === 'progress' && onProgress) {
          // data.progress goes from 0 to 100
          onProgress(data.progress);
        }
      }
    });

    // Embed the knowledge base once
    for (const item of knowledgeBase) {
      const output = await extractor(item.content, { pooling: 'mean', normalize: true });
      embeddedKnowledge.push({
        id: item.id,
        content: item.content,
        // The output is a tensor, we convert the raw data to a standard array
        embedding: Array.from(output.data)
      });
    }
  }
}

/**
 * Calculates the cosine similarity between two 1D arrays/vectors.
 */
function cosineSimilarity(a: number[], b: number[]) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Query the embedded knowledge base and get exactly K chunks.
 */
export async function retrieveContext(query: string, k: number = 3): Promise<string> {
  if (!extractor || embeddedKnowledge.length === 0) {
    throw new Error('RAG not initialized yet.');
  }

  // Embed the user's query
  const queryOutput = await extractor(query, { pooling: 'mean', normalize: true });
  const queryEmbedding = Array.from(queryOutput.data) as number[];

  // Calculate similarities
  const similarities = embeddedKnowledge.map((doc) => ({
    ...doc,
    score: cosineSimilarity(queryEmbedding, doc.embedding)
  }));

  // Sort by score descending and take top K
  similarities.sort((a, b) => b.score - a.score);
  const topChunks = similarities.slice(0, k);

  // Join the selected text chunks as the formatted context
  return topChunks.map((chunk, index) => `[Doc ${index + 1}]: ${chunk.content}`).join("\\n\\n");
}

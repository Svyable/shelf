import assert from 'node:assert/strict';
import { rightsSummary } from './rights.js';

assert.deepEqual(rightsSummary({}), {
  rights: 'All Rights Reserved',
  aiUse: 'AI training, retrieval/grounding, indexing, and generative use reserved',
});

assert.deepEqual(rightsSummary({
  rights: '© 2026 Ada · All Rights Reserved',
  aiUse: 'Training, RAG, AI indexing, and generative reuse reserved',
}), {
  rights: '© 2026 Ada · All Rights Reserved',
  aiUse: 'Training, RAG, AI indexing, and generative reuse reserved',
});

console.log('rights tests ok');

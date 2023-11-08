import "dotenv/config";

import { COLLECTION_NAME } from "./saveFactsInDB.js";

import { Chroma } from "langchain/vectorstores/chroma";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { RetrievalQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

async function main() {
  const chatOpenAIModel = new ChatOpenAI();
  const chroma = await Chroma.fromExistingCollection(new OpenAIEmbeddings(), {
    collectionName: COLLECTION_NAME,
  });
  const retrievalQAChain = RetrievalQAChain.fromLLM(
    chatOpenAIModel,
    chroma.asRetriever()
  );
  const results = await retrievalQAChain.call({
    query: "What is an interesting fact about English language ?",
  });
  console.log({ results });
}

main().then(() => process.exit(0));

import "dotenv/config";

import { CONSTANTS } from "../constant.js";

import { Chroma } from "langchain/vectorstores/chroma";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { RetrievalQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

async function main() {
  const chatOpenAIModel = new ChatOpenAI();
  const chroma = await Chroma.fromExistingCollection(new OpenAIEmbeddings(), {
    collectionName: CONSTANTS.COLLECTION_NAME,
  });
  const retrievalQAChain = RetrievalQAChain.fromLLM(
    chatOpenAIModel,
    chroma.asRetriever(),
    {
      inputKey: "question",
      returnSourceDocuments: false,
    }
  );
  const results = await retrievalQAChain.call({
    question: "What is an interesting fact about English language ?",
  });
  console.log(results);
}

main()
  .then(() => process.exit(0))
  .catch((e) => console.log(e));

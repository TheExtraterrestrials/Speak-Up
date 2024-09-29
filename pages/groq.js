import Groq from "groq-sdk";

// Function to convert Blob to ArrayBuffer (no need for Buffer in the browser)
async function blobToArrayBuffer(blob) {
  return await blob.arrayBuffer();
}

async function main(blob) {
  // Initialize the Groq client
  const groq = new Groq({
    apiKey: "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",
    dangerouslyAllowBrowser: true,
  });

  // Convert Blob to ArrayBuffer
  const audioArrayBuffer = await blobToArrayBuffer(blob);
  console.log(audioArrayBuffer);
  // Create a transcription job by sending the blob directly (Blob is acceptable as file input)
  const transcription = await groq.audio.transcriptions.create({
    file: blob, // Send the Blob directly as the file
    model: "distil-whisper-large-v3-en", // Required model to use for transcription
    prompt: "Specify context or spelling", // Optional
    response_format: "json", // Optional
    language: "en", // Optional
    temperature: 0.0, // Optional
  });

  // Log and return the transcribed text
  console.log(transcription.text);
  return transcription.text;
}

export default main;

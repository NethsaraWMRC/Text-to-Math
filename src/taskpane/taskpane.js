/* eslint-disable no-undef */
/* global Word console */
export async function insertText(imageUrl) {
  // Ensure Office is fully loaded before calling Word API
  Office.onReady(() => {
    if (!imageUrl) {
      console.error("No image URL provided.");
      return;
    }

    Word.run(async (context) => {
      try {
        const body = context.document.body;

        // Insert the image from the URL
        const paragraph = body.insertParagraph("", Word.InsertLocation.end);
        paragraph.insertInlinePictureFromBase64(await fetchImageAsBase64(imageUrl), Word.InsertLocation.end);
        await context.sync();
        console.log("Image inserted successfully.");
      } catch (error) {
        console.log("Error: " + error);
      }
    });
  });
}

// Helper function to fetch image and convert it to base64
async function fetchImageAsBase64(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result.split(",")[1]); // Get base64 string
    };
    reader.readAsDataURL(blob);
  });
}

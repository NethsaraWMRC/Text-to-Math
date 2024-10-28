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
        // Get the current cursor selection range
        const range = context.document.getSelection();

        // Insert the image at the cursor location
        const picture = range.insertInlinePictureFromBase64(
          await fetchImageAsBase64(imageUrl),
          Word.InsertLocation.replace
        );

        // Set image layout properties as needed
        picture.wrap = Word.WrapType.none; // Set to appear in front of text
        picture.layoutInCell = false;
        picture.lockAspectRatio = true;

        await context.sync();
        console.log("Image inserted at the cursor location.");
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

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
import * as React from "react";
import { useState } from "react";
import { Button, Field, Textarea, tokens, makeStyles } from "@fluentui/react-components";
import PropTypes from "prop-types";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

const useStyles = makeStyles({
  instructions: {
    fontWeight: tokens.fontWeightSemibold,
    marginTop: "20px",
    marginBottom: "10px",
  },
  textPromptAndInsertion: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textAreaField: {
    marginLeft: "20px",
    marginTop: "30px",
    marginBottom: "20px",
    marginRight: "20px",
    maxWidth: "80%",
  },
});

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI("AIzaSyCGUGRP33olKY9nfBvtcaq9tMRmUzOLGSA"); // Replace with your actual API key
const model = genAI.getGenerativeModel({ model: "tunedModels/texttolatex-v4nyjr20sckb" });

const TextInsertion = (props) => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const styles = useStyles();

  const handleTextInsertion = async () => {
    try {
      // Generate LaTeX code using Google Generative AI
      setText("");
      setIsLoading(true);
      const result = await model.generateContent(text);
      const generatedText = result.response.text() || "";

      const imgUrl = getLatexImageUrl(generatedText);
      if (imgUrl) {
        // Insert the image URL directly into the Word document
        await props.insertText(imgUrl); // Pass only the URL
        console.log("Inserted LaTeX Image:", imgUrl);
      } else {
        console.error("Failed to retrieve image URL");
      }
    } catch (error) {
      console.error("Error generating LaTeX image:", error);
    }
    setIsLoading(false);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const getLatexImageUrl = (latexCode) => {
    // CodeCogs API base URL
    const baseUrl = "https://latex.codecogs.com/png.latex?";
    // Encode the LaTeX code to use in the URL
    const encodedCode = encodeURIComponent(latexCode);
    // Return the full image URL
    return `${baseUrl}${encodedCode}`;
  };

  return (
    <div className={styles.textPromptAndInsertion}>
      <Field
        className={styles.textAreaField}
        size="large"
        label="Enter text to generate and insert as a Latex-rendered equation."
      >
        <Textarea size="large" value={text} onChange={handleTextChange} />
      </Field>

      <Button appearance="primary" size="large" onClick={handleTextInsertion}>
        Insert Equation
      </Button>
      <div id="loading" className={styles.textAreaField} style={{ marginTop: "20px" }}>
        {isLoading && <div> Loading...</div>}
      </div>
    </div>
  );
};

TextInsertion.propTypes = {
  insertText: PropTypes.func.isRequired,
};

export default TextInsertion;

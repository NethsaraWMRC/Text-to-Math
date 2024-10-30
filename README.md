# Word Add-In: Math Expression Generator

This add-in allows you to easily generate LaTeX-style math expressions from natural language input directly within Word. Follow the instructions below to use the add-in on Word 365 or to run it locally.

---

## Table of Contents

1. [Using the Deployed Add-In on Word 365](#using-the-deployed-add-in-on-word-365)
2. [Setting Up and Running Locally](#setting-up-and-running-locally)

---

### Using the Deployed Add-In on Word 365

1. **Open Word 365** and create a new document.
2. Navigate to the **Home tab** and find the **Add-ins** icon.
3. Click the **Add-ins** icon, select **More Add-ins**, go to **My Add-ins**, and click **Upload My Add-in**.
4. Browse and upload the **`deployed_manifest.xml`** file found in the project folder.
5. **Reload the Word document** (refresh or close and reopen).
6. A new add-in called **NaturaTex** should appear in Word. Click on it to open the add-in.
7. **Enter text** describing the math expression you want to generate (e.g., "Integrate from 0 to 1 of x^(n+1) dx"). The add-in will generate and insert a rendered image of the expression.

---

### Setting Up and Running Locally

To run the project locally, follow these steps:

1. **Obtain a Google API Key**:

   - Go to [Google AI Studio](https://ai.google.com/studio) and create an API key.
   - In the project root, create a `.env` file and add your API key as shown below:
     ```plaintext
     REACT_APP_API_KEY="YOUR_API_KEY_HERE"
     ```

2. **Install Dependencies**:

   - In the project root directory, install the required dependencies:
     ```bash
     npm install
     ```

3. **Start the Local Development Server**:

   - Start the project locally by running:
     ```bash
     npm start
     ```

4. **Upload the Add-In in Word**:
   - Follow the same steps as above to upload the **`manifest.xml`** file in Word 365.
   - Once the local server is running, the add-in will now be connected to your local environment.

---

### Notes

- Make sure to **restart the server** anytime you change the `.env` file.
- This add-in uses Google Generative AI, so ensure that your API key has the necessary permissions for generative tasks.

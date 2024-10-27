/* eslint-disable no-undef */
import * as React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import TextInsertion from "./TextInsertion";
import { makeStyles } from "@fluentui/react-components";
import { insertText } from "../taskpane"; // Ensure this function is correct

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App = (props) => {
  const { title } = props;
  const styles = useStyles();

  // Ensure Office is fully loaded
  React.useEffect(() => {
    Office.onReady((info) => {
      if (info.host === Office.HostType.Word) {
        console.log("Office is ready.");
        // Any other initialization code for Office can go here
      }
    });
  }, []);

  return (
    <div className={styles.root}>
      <Header logo="assets/logo-filled.png" title={title} message="Welcome" />
      <TextInsertion insertText={insertText} /> {/* Ensure this function is correct */}
    </div>
  );
};

App.propTypes = {
  title: PropTypes.string,
};

export default App;

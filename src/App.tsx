// ./src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./Navigation.jsx";
import Home from "./Home.jsx";
import Practice from "./Practice.jsx";
import Instructors from "./Instructors.jsx";
import Review from "./Review.jsx";
import Footer from "./Footer.jsx";
import About from "./About.jsx";
import Find from "./Find.jsx";
import "./App.css";
import "./robots.txt";

const brand = { name: "stay-fit, stay-safe", to: "/" };

const App = (): JSX.Element => {
  return (
    <div className="main">
      <h1 className="brand"> Stay Fit, StaySafe</h1>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/find" exact component={() => <Find />} />
          <Route path="/practice" exact component={() => <Practice />} />
          <Route path="/review" exact component={() => <Review />} />
          <Route path="/instructors" exact component={() => <Instructors />} />
          <Route path="/about" exact component={() => <About />} />
        </Switch>
        <Footer />
      </Router>

import React, { useState } from 'react';
//import Path from 'path';
import uploadFileToBlob, { isStorageConfigured } from './azure-storage-blob';

const storageConfigured = isStorageConfigured();

const App = (): JSX.Element => {
  // all blobs in container
  const [blobList, setBlobList] = useState<string[]>([]);

  // current file to upload into container
  const [fileSelected, setFileSelected] = useState(null);

  // UI/form management
  const [uploading, setUploading] = useState(false);
  const [inputKey, setInputKey] = useState(Math.random().toString(36));

  const onFileChange = (event: any) => {
    // capture file into state
    setFileSelected(event.target.files[0]);
  };

  const onFileUpload = async () => {
    // prepare UI
    setUploading(true);

    // *** UPLOAD TO AZURE STORAGE ***
    const blobsInContainer: string[] = await uploadFileToBlob(fileSelected);

    // prepare UI for results
    setBlobList(blobsInContainer);

    // reset state/form
    setFileSelected(null);
    setUploading(false);
    setInputKey(Math.random().toString(36));
  };

  // display form
  const DisplayForm = () => (
    <div>
      <input type="file" onChange={onFileChange} key={inputKey || ''} />
      <p />
      <button type="submit" onClick={onFileUpload}>
        Upload!
          </button>
    </div>
  )

  /*
  // display file name and image
  const DisplayImagesFromContainer = () => (
    <div>
      <h2>Container items</h2>
      <ul>
        {blobList.map((item) => {
          return (
            <li key={item}>
              <div>
                {Path.basename(item)}
                <br />
                <img src={item} alt={item} height="200" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
  */
  const DisplaySuccessMessage = () => (
    <div>
      <h2>Upload Successfull!!</h2>
    </div>
  );

  return (
    <div>
      <h1>Upload file to Azure Blob Storage</h1>
      {storageConfigured && !uploading && DisplayForm()}
      {storageConfigured && uploading && <div>Uploading</div>}
      <hr />
      {storageConfigured && blobList.length > 0 && DisplaySuccessMessage()}
      {!storageConfigured && <div>Storage is not configured.</div>}
    </div>
  );
}

export default App;



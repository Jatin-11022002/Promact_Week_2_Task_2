import React, { useEffect, useState } from "react";
import "./App.css"; // Import your CSS file for styling
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    // return;
    if (loading) {
      generatePdf();
    }
  }, [loading]);

  useEffect(() => {
    if (pdfUrl == "") return;
    downloadPdf();
  }, [pdfUrl]);

  const isValidUrl = (url) => {
    const urlPattern =
      /^(https?):\/\/(?:www\.)?([a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+)(\/[^ "]+)?$/;

    if (!url) {
      return "URL is required.";
    }

    const match = url.match(urlPattern);
    if (!match) {
      return "Please enter a valid URL starting with 'http://' or 'https://'.";
    }

    const protocol = match[1];
    const domain = match[2];
    const path = match[3] || "";

    if (protocol !== "http" && protocol !== "https") {
      return "Unsupported protocol. Please enter a URL starting with 'http://' or 'https://'.";
    }

    if (domain.length > 255) {
      return "Domain name is too long.";
    }

    if (path.length > 0 && !path.startsWith("/")) {
      return "Invalid path format. Path must start with a forward slash.";
    }

    return "valid";
  };

  const generatePdf = async () => {
    try {
      const isValidUrlMessage = isValidUrl(url);
      if (isValidUrlMessage !== "valid") {
        toast.error(isValidUrlMessage);
        setPdfUrl("");
        return;
      }
      let { data } = await axios.post(`${backend_url}/convert`, { url });
      let { status, message, fileName } = data;
      if (status === "error") {
        throw Error(message);
      } else {
        console.log(status, "rendering now");
        renderPdf(fileName);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderPdf = async (fileName) => {
    try {
      console.log(fileName);
      let url = `${backend_url}/${fileName}.pdf`;
      setPdfUrl(url);
      //downloadPdf();
    } catch (error) {
      console.log(error);
    }
  };

  const downloadPdf = async () => {
    try {
      console.log("called", pdfUrl);
      let url = new URL(pdfUrl);
      let fileUrl = `${url.origin}/getFile${url.pathname}`;
      console.log(fileUrl);
      setDownloadUrl(fileUrl);
      return fileUrl;
      //let result = await fetch(fileUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="wrapper">
        <div className="head-wrapper">
          <h1>Web To PDF</h1>
        </div>
        <div className="container">
          <div className="input-column">
            <h2>Website URL</h2>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL"
              className="url-input"
            />
            <button
              onClick={() => setLoading(true)}
              className={loading ? "disabled btn" : "btn"}
            >
              Generate PDF
            </button>

            {downloadUrl && !loading ? (
              <a href={downloadUrl} className="btn-link">
                <button className="btn" disabled={loading}>
                  Download
                </button>
              </a>
            ) : (
              ""
            )}
          </div>
          <div className="pdf-column">
            {loading ? (
              <ThreeDots
                height="100"
                width="100"
                radius="9"
                color="white"
                wrapperClass={"spinner"}
                secondaryColor="black"
              />
            ) : pdfUrl ? (
              <iframe
                title="Generated PDF"
                src={pdfUrl}
                className="pdf-preview"
              ></iframe>
            ) : (
              <h1 className="placeholder">Nothing To Display</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

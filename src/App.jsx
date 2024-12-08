import { useState } from "react";
import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3000/api";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState("encode");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_URL}/${mode}`, {
        params: { text: inputText },
      });
      setOutputText(response.data[mode === "encode" ? "encoded" : "decoded"]);
    } catch (error) {
      console.error("Error:", error);
      setOutputText(
        error.response?.data?.message || "An error occurred. Please try again.",
      );
    }
  };

  return (
    <div className="bgc">
      <main>
        <h2 className="mb-4">AlphaNum API</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="inputText" className="form-label">
              Input Text
            </label>
            <input
              type="text"
              id="inputText"
              className="form-control"
              placeholder="Enter text to encode or decode"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="mode"
                id="encodeMode"
                value="encode"
                checked={mode === "encode"}
                onChange={() => setMode("encode")}
              />
              <label className="form-check-label" htmlFor="encodeMode">
                Encode
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="mode"
                id="decodeMode"
                value="decode"
                checked={mode === "decode"}
                onChange={() => setMode("decode")}
              />
              <label className="form-check-label" htmlFor="decodeMode">
                Decode
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        {outputText && (
          <div className="mt-4">
            <h2>Output</h2>
            <pre className="border p-3 bg-dark">{outputText}</pre>
          </div>
        )}
      </main>
    </div>
  );
}

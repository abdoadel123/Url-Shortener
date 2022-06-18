import React, { FC, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { BaseUrl } from "../constant";
import "../styles/encode.css";

export const Encode: FC = () => {
  const [originalUrl, setOriginalUrl] = useState("");

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setOriginalUrl(event.target.value);
    console.log("value is:", event.target.value);
  };

  const handleClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    encode(originalUrl);
    console.log("handleClick 👉️", originalUrl);
    setOriginalUrl('');                        //To reset the textfield value
    event.preventDefault();

  };
  return (
    <div className="encode-div">
      <div className="encode-text">
        <TextField
          id="outlined-basic"
          label="URL"
          variant="outlined"
          size="small"
          required
          onChange={handleChange}
          value={originalUrl}
        />
      </div>
      <div className="encode-button">
        <Button variant="contained" onClick={handleClick}>
          Encode
        </Button>
      </div>
    </div>
  );
};

function encode(url: string) {
  fetch(BaseUrl + "/encode", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      originalUrl: url,
    }),
  });
}

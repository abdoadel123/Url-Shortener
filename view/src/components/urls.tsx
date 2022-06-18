import React, { FC, useEffect, useState } from "react";
import { BaseUrl } from "../constant";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IURL } from "../interfaces";
import Row from "./table-row";

export const Urls: FC = () => {
  const [urls, setUrls] = useState([]);
  useEffect(() => {
    const fetchUrls = async () => {
      try {
        setUrls([]);
        getUrls()
          .then((response) => response.json())
          .then((result) => {
            setUrls(result.data);
            console.log(urls[0]);
          });
      } catch (e:any) {
        alert(e.message);
      }
    };
    fetchUrls();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Url</TableCell>
            <TableCell>Visites</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {urls.map((url: IURL) => (
            <Row key={url.code} row={url} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

function getUrls() {
  return fetch(BaseUrl + "/", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
}

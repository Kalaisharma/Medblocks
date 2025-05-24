import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Alert,
} from "@mui/material";
import db from "../Database/db";
import { useNavigate } from "react-router-dom";
import { broadcastChange, onBroadcast } from "../Hooks/syncChannels";
import { PGlite } from "@electric-sql/pglite";

const SqlQueryRunner: React.FC = () => {
  const [query, setQuery] = useState("select * from patients");
  const [result, setResult] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const runQuery = async (q: string) => {
    setError(null);
    setResult([]);
    setSuccess(null);

    try {
      const isAlter = /^alter\s/i.test(q.trim());
      if (isAlter) {
        setError("ALTER queries are not allowed to maintain schema integrity.");
        return;
      }
      if (q.trim().length === 0) {
        setError("Query cannot be empty");
        return;
      }
      const res = await db.query(q);
      console.log(res);
      const isDDL = /^(create|drop|truncate)\s/i.test(q.trim());

      if (isDDL) {
        setSuccess("DDL query executed successfully");
        broadcastChange()
        return;
      }

      if (res.affectedRows === 0 && res.rows.length === 0) {
        setError("No Data Found");
        return;
      }
      if (
        (res.affectedRows ?? 0) > 0 ||
        (res.affectedRows === undefined && res.rows.length === 0)
      ) {
        setSuccess("Query executed successfully");
        broadcastChange();
        return;
      }

      setResult(res.rows || []);
    } catch (err: any) {
      let msg = err.message || "Unknown error";
      setError(msg);
    }
  };

  // Listen to broadcast channel on mount
  useEffect(() => {
    // Setup listener for patient updates
    onBroadcast(async () => {
      window.location.reload();
    });

    // Optionally, run query on mount for initial data load
      runQuery(query);
   }, []); // empty deps - run only once on mount

  const handleRunQuery = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    runQuery(query);
  };

  return (
    <Box component={Paper} p={3} mt={4}>
      <Typography variant="h6" gutterBottom>
        Run SQL Query
      </Typography>

      <TextField
        label="SQL Query"
        placeholder="SELECT * FROM patients"
        multiline
        fullWidth
        rows={4}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="outlined"
        sx={{ mb: 2 }}
      />

      <Button variant="contained" onClick={(e) => { handleRunQuery(e) }}>
        Run Query
      </Button>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error + " - Please check the SQL syntax."}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {success}
        </Alert>
      )}

      {result.length > 0 && (
        <Box mt={4}>
          <Typography variant="subtitle1" gutterBottom>
            Query Result
          </Typography>
          <Box
            sx={{
              maxHeight: 400,
              overflowY: "auto",
              border: "1px solid #ccc",
              borderRadius: 1,
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  {Object.keys(result[0]).map((key) => (
                    <TableCell key={key}>{key}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {result.map((row, index) => (
                  <TableRow key={index}>
                    {Object.values(row).map((value, idx) => (
                      <TableCell key={idx}>{String(value)}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      )}
      <Button
        variant="outlined"
        sx={{
          ml: 2,
          margin: "20px 4%",
        }}
        onClick={() => {
          setQuery("");
          setResult([]);
          setError(null);
          setSuccess(null);
        }}
      >
        Clear
      </Button>
      <Button
        variant="outlined"
        sx={{
          ml: 2,
          display: "inline",
          margin: "20px auto",
        }}
        onClick={() => {
          navigate("/");
        }}
      >
        Back
      </Button>
    </Box>
  );
};

export default SqlQueryRunner;
function loadDB(db: PGlite) {
  throw new Error("Function not implemented.");
}


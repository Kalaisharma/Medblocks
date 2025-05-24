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
  useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import db from "../Database/db";
import { useNavigate } from "react-router-dom";
import { broadcastChange, onBroadcast } from "../Hooks/syncChannels";

const SqlQueryRunner: React.FC = () => {
  const [query, setQuery] = useState("select * from patients");
  const [result, setResult] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const theme = useTheme();

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
      const isDDL = /^(create|drop|truncate)\s/i.test(q.trim());

      if (isDDL) {
        setSuccess("DDL query executed successfully");
        broadcastChange();
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

      if (res.rows.length === 0 && res.affectedRows === 0) {
        setError("No Data Found");
        return;
      }

      setResult(res.rows || []);
    } catch (err: any) {
      let msg = err.message || "Unknown error";
      setError(msg);
    }
  };

  useEffect(() => {
    onBroadcast(() => window.location.reload());
    runQuery(query);
  }, []);

  const handleRunQuery = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    runQuery(query);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Box
        component={Paper}
        p={4}
        mt={4}
        elevation={3}
        sx={{
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight={600}>
          SQL Query Runner
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

        <Box display="flex" gap={2} flexWrap="wrap">
          <Button variant="contained" onClick={handleRunQuery}>
            Run Query
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setQuery("");
              setResult([]);
              setError(null);
              setSuccess(null);
            }}
          >
            Clear
          </Button>
          <Button variant="outlined" onClick={() => navigate("/")}>
            Back
          </Button>
        </Box>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <Alert severity="error" sx={{ mt: 3 }}>
                {error + " - Please check the SQL syntax."}
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Alert severity="success" sx={{ mt: 3 }}>
                {success}
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {result.length > 0 && (
          <Box mt={4}>
            <Typography variant="subtitle1" gutterBottom>
              Query Result
            </Typography>
            <Box
              sx={{
                maxHeight: 400,
                overflowY: "auto",
                overflowX: "auto",
                border: "1px solid #ccc",
                borderRadius: 1,
              }}
            >
              <Table size="small" stickyHeader>
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
                        <TableCell
                          key={idx}
                          sx={{
                            maxWidth: 200,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {String(value)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Box>
        )}
      </Box>
    </motion.div>
  );
};

export default SqlQueryRunner;

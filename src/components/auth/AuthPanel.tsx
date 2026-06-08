import { useState } from "react";
import { Alert, Box, Button, Paper, TextField, Typography } from "@mui/material";
import { supabase } from "../../lib/supabase";

interface AuthPanelProps {
  userEmail: string | null;
  onSignedOut: () => void;
  onSignedIn: () => void;
}

export function AuthPanel({
  userEmail,
  onSignedOut,
  onSignedIn,
}: AuthPanelProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignUp = async () => {
    setMessage(null);
    setErrorMessage(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setMessage("Account created. Check your email if confirmation is enabled.");
    setEmail("");
    setPassword("");
    onSignedIn();
  };

  const handleSignIn = async () => {
    setMessage(null);
    setErrorMessage(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setMessage("Signed in successfully.");
    setEmail("");
    setPassword("");
    onSignedIn();
  };

  const handleSignOut = async () => {
    setMessage(null);
    setErrorMessage(null);

    const { error } = await supabase.auth.signOut();

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setMessage("Signed out successfully.");
    onSignedOut();
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3, mt: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Account
      </Typography>

      {userEmail ? (
        <Box sx={{ display: "grid", gap: 2 }}>
          <Typography variant="body1">
            Signed in as: <strong>{userEmail}</strong>
          </Typography>

          <Button variant="outlined" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: "grid", gap: 2 }}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button variant="contained" onClick={handleSignIn}>
              Sign In
            </Button>

            <Button variant="outlined" onClick={handleSignUp}>
              Sign Up
            </Button>
          </Box>
        </Box>
      )}

      {message && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {message}
        </Alert>
      )}

      {errorMessage && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Alert>
      )}
    </Paper>
  );
}
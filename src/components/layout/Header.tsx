import {
  AppBar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { useCartStore } from "../../state/cart-store";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function Header({ searchTerm, onSearchChange }: HeaderProps) {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <AppBar position="static" color="primary" sx={{ mb: 4 }}>
      <Toolbar sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Video Game Store
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.15)",
            px: 2,
            py: 0.5,
            borderRadius: 2,
            width: { xs: "100%", sm: 320 },
            maxWidth: 400,
          }}
        >
          <SearchIcon sx={{ mr: 1 }} />
          <InputBase
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            sx={{ color: "inherit", width: "100%" }}
          />
        </Box>

        <IconButton color="inherit">
          <Badge badgeContent={totalItems} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
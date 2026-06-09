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
    <AppBar
      position="static"
      sx={{
        mb: 4,
        backgroundColor: "#0d1b2a",
      }}
    >
      <Toolbar sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#f5f5f5" }}>
          Loaf's Video Game Store
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.12)",
            px: 2,
            py: 0.5,
            borderRadius: 2,
            width: { xs: "100%", sm: 320 },
            maxWidth: 400,
          }}
        >
          <SearchIcon sx={{ mr: 1, color: "#f5f5f5" }} />
          <InputBase
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            sx={{
              color: "#f5f5f5",
              width: "100%",
            }}
          />
        </Box>

        <IconButton color="inherit">
          <Badge badgeContent={totalItems} color="error">
            <ShoppingCartIcon sx={{ color: "#f5f5f5" }} />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
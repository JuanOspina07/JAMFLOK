import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const ModalBusqueda = ({ isOpen, onClose, onSearch }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const query = form.elements.search.value.trim();
    if (query) {
      onSearch(query);
      onClose();
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <IconButton
          aria-label="cerrar"
          onClick={onClose}
          style={styles.closeButton}
          size="large"
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
        <h2>Buscar en la plataforma</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            name="search"
            placeholder="Escribe tu búsqueda..."
            variant="outlined"
            fullWidth
            autoFocus
          />
          <div style={{ marginTop: 16, textAlign: "right" }}>
            <button type="submit" style={styles.buttonPrimary}>
              Buscar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    position: "relative",
    background: "#fff",
    padding: 24,
    borderRadius: 8,
    width: "60vw",
    maxWidth: 600,
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    color: "white",
    backgroundColor: "#d32f2f",
    borderRadius: "50%",
    width: 32,
    height: 32,
    padding: 0,
    "&:hover": {
      backgroundColor: "#b71c1c",
    },
  },
  buttonPrimary: {
    backgroundColor: "#c6a664",
    color: "white",
    border: "none",
    padding: "8px 20px",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 16,
  },
};

export default ModalBusqueda;

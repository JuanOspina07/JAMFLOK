import React, { useState, useEffect } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const categoriasEjemplo = [
  "Ropa",
  "Calzado",
  "Accesorios",
  "Electrónica",
  "Hogar",
  "Deportes",
];

const FiltroCategorias = ({ isOpen, onClose, onFilter }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showToast, setShowToast] = useState(false);

  if (!isOpen) return null;

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, name] : prev.filter((cat) => cat !== name)
    );
  };

  const handleApplyFilter = () => {
    onFilter(selectedCategories);
    setShowToast(true);  
    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 1600); 
  };

  return (
    <>
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

          <h2>Filtrar por Categoría</h2>

          <FormGroup>
            {categoriasEjemplo.map((categoria) => (
              <FormControlLabel
                key={categoria}
                control={
                  <Checkbox
                    name={categoria}
                    checked={selectedCategories.includes(categoria)}
                    onChange={handleCheckboxChange}
                  />
                }
                label={categoria}
              />
            ))}
          </FormGroup>

          <div style={{ marginTop: 16, textAlign: "right" }}>
            <Button
              variant="contained"
              onClick={handleApplyFilter}
              style={styles.buttonPrimary}
            >
              Aplicar filtro
            </Button>
          </div>
        </div>
      </div>

      {showToast && (
        <div style={styles.toast}>
          Filtrado con éxito 
        </div>
      )}
    </>
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
    backgroundColor: "#fff",
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
  toast: {
    position: "fixed",
    bottom: 20,
    right: 20,
    backgroundColor: "#4caf50",
    color: "white",
    padding: "12px 20px",
    borderRadius: 8,
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    zIndex: 1100,
    fontWeight: "bold",
    fontSize: 16,
  },
};

export default FiltroCategorias;

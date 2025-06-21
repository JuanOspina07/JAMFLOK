import React, { useState } from "react";
import { IconButton, Button, FormControlLabel, Checkbox } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const FiltroCategorias = ({ isOpen, onClose, negocios, categorias = [], onFilter }) => {
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [showToast, setShowToast] = useState(false);

  if (!isOpen || !Array.isArray(negocios)) return null;

  const handleCheckboxChange = (idCategoria) => {
    if (seleccionadas.includes(idCategoria)) {
      setSeleccionadas(seleccionadas.filter((c) => c !== idCategoria));
    } else {
      setSeleccionadas([...seleccionadas, idCategoria]);
    }
  };

  const handleApplyFilter = () => {
    const filtrados = negocios.filter((n) =>
      seleccionadas.includes(n.ID_CATEGORIA)
    );
    onFilter(filtrados);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 2000);
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

          <h2>Filtrar por categoría</h2>

          <div style={{ maxHeight: "300px", overflowY: "auto", marginBottom: 16 }}>
            {categorias.map((cat) => (
              <FormControlLabel
                key={cat.ID_CATEGORIAS}
                control={
                  <Checkbox
                    checked={seleccionadas.includes(cat.ID_CATEGORIAS)}
                    onChange={() => handleCheckboxChange(cat.ID_CATEGORIAS)}
                    color="primary"
                  />
                }
                label={cat.NombreCategoria}
                sx={{ color: "black" }}
              />
            ))}
          </div>

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

      {showToast && <div style={styles.toast}>Filtrado con éxito</div>}
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

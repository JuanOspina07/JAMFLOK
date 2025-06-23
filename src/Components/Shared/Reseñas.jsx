import React, { useState } from 'react';
import { Star, User } from 'lucide-react';
import SidebarCliente from './SideBarCliente';
import '../Styles/Reseñas.css';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Rating,
  Box,
} from '@mui/material';

const Reseñas = () => {
  const [reviewData, setReviewData] = useState({
    productName: '',
    rating: 0,
    comment: '',
  });

  const [userReviews] = useState([
    {
      id: 1,
      username: 'Usuario123',
      rating: 5,
      comment: 'Muy buen producto, llegó rápido.',
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (event, newValue) => {
    setReviewData((prev) => ({ ...prev, rating: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reviewData.productName || !reviewData.rating || !reviewData.comment) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    // Simulate submitting review (replace with API call)
    console.log('Review submitted:', reviewData);
    setReviewData({ productName: '', rating: 0, comment: '' });
  };

  return (
    <div className="dashboard-container">
      <SidebarCliente onLogout={() => localStorage.removeItem('idUsuario')} />
      <div className="main-content">
        <header className="content-header">
          <Typography variant="h1">Reseñas</Typography>
          <Typography variant="body2">Comparte tu opinión sobre productos y servicios</Typography>
        </header>

        <Grid container spacing={3} className="cards-grid">
          <Grid item xs={12} md={12}>
            <Card className="info-card">
              <CardHeader title="Escribir Reseña" className="card-header" />
              <CardContent className="card-body">
                <Grid container spacing={3}>
                  {/* General Section */}
                  <Grid item xs={12}>
                    <Typography variant="h6" className="section-title">General</Typography>
                    <TextField
                      label="Nombre del producto / servicio"
                      name="productName"
                      value={reviewData.productName}
                      onChange={handleInputChange}
                      fullWidth
                      variant="outlined"
                      required
                      margin="normal"
                    />
                    <Box sx={{ mt: 2, mb: 2 }}>
                      <Typography variant="body2" className="info-label">Valoración *</Typography>
                      <Rating
                        name="rating"
                        value={reviewData.rating}
                        onChange={handleRatingChange}
                        precision={1}
                        icon={<Star size={24} fill="#ffc107" stroke="#ffc107" />}
                        emptyIcon={<Star size={24} stroke="#ffc107" />}
                      />
                    </Box>
                    <TextField
                      label="Escribir reseña"
                      name="comment"
                      value={reviewData.comment}
                      onChange={handleInputChange}
                      fullWidth
                      variant="outlined"
                      multiline
                      rows={4}
                      required
                      margin="normal"
                    />
                  </Grid>

                  {/* Valoraciones Section */}
                  <Grid item xs={12}>
                    <Typography variant="h6" className="section-title">Valoraciones</Typography>
                    <Box className="rating-bar">
                      <Box className="stars">
                        <Rating value={5} readOnly icon={<Star size={16} fill="#ffc107" stroke="#ffc107" />} />
                      </Box>
                      <Typography variant="body2" className="percentage">(65%)</Typography>
                    </Box>
                    <Box className="rating-bar">
                      <Box className="stars">
                        <Rating value={4} readOnly icon={<Star size={16} fill="#ffc107" stroke="#ffc107" />} />
                      </Box>
                      <Typography variant="body2" className="percentage">(20%)</Typography>
                    </Box>
                    <Box className="rating-bar">
                      <Box className="stars">
                        <Rating value={3} readOnly icon={<Star size={16} fill="#ffc107" stroke="#ffc107" />} />
                      </Box>
                      <Typography variant="body2" className="percentage">(3%)</Typography>
                    </Box>
                  </Grid>

                  {/* User Reviews Section */}
                  <Grid item xs={12}>
                    <Typography variant="h6" className="section-title">Reseñas de Usuarios</Typography>
                    {userReviews.map((review) => (
                      <Box key={review.id} className="user-review">
                        <Box className="user-info">
                          <User className="user-icon" size={24} />
                          <Typography variant="body1" className="username">{review.username}</Typography>
                          <Rating
                            value={review.rating}
                            readOnly
                            icon={<Star size={16} fill="#ffc107" stroke="#ffc107" />}
                          />
                        </Box>
                        <Typography variant="body2" className="review-text">{review.comment}</Typography>
                      </Box>
                    ))}
                  </Grid>
                </Grid>

                <div className="form-actions">
                  <Button
                    className="primary-button"
                    onClick={handleSubmit}
                    variant="contained"
                    endIcon={<span>✅</span>}
                  >
                    Enviar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Reseñas;
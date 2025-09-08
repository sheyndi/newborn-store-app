import React from "react";
import { Button, Container, Grid, Typography, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import '../../public/css/homePage.scss';

const categories = ["כל המוצרים", "אקססוריז", "ביגוד וטקסטיל", "עגלות", "רהיטים", "מתנות", "צעצועים"];

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom>
            ברוכים הבאים לחנות שלנו 👶
          </Typography>
          <Typography variant="h6" gutterBottom>
            כל מה שתצטרכו במקום אחד
          </Typography>
          <Button variant="contained" color="primary" size="large" component={Link} to="/category/כל-המוצרים">
            התחילו לקנות
          </Button>
        </Container>
      </section>

      {/* Categories */}
      <section className="categories">
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom>
            קטגוריות
          </Typography>
          <Grid container spacing={3}>
            {categories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card className="category-card">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      <Link
                        to={`/category/${category.replace(/\s+/g, "-")}`}
                        className="category-link"
                      >
                        {category}
                      </Link>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Footer */}
      <footer className="footer">
        <Container maxWidth="lg">
          <Typography variant="body2">© 2025 החנות שלנו - כל הזכויות שמורות</Typography>
        </Container>
      </footer>
    </div>
  );
};

export default HomePage;

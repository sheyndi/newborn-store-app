import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { FaTruck, FaStar, FaTags, FaGift } from "react-icons/fa";
import logo from "../assets/logo.png";
import "../../public/css/home.scss";

// קטגוריות לדוגמה
const categories = [
  "כל המוצרים",
  "אקססוריז",
  "ביגוד וטקסטיל",
  "עגלות",
  "רהיטים",
  "מתנות",
  "צעצועים",
];

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <Container maxWidth="lg" className="hero-content">
          <img
            src={logo}
            alt="New Born Logo"
            className="logo"
          />
          <Typography variant="h3" component="h1" gutterBottom>
            קניה חלומית למבינים ✨
          </Typography>
          <Typography variant="h6" gutterBottom>
            כל מה שתצטרכו לתינוקות – באיכות מעולה ובמחיר נגיש
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to={"/collection/כל המוצרים/" + 1}
            className="cta-btn"
          >
            התחילו לקנות
          </Button>
        </Container>
      </section>

      {/* Categories */}
      <section className="categories">
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom align="center">
            קטגוריות מובילות
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {categories.map((category, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card className="category-card" elevation={3}>
                  <CardContent>
                    <Typography variant="h6" align="center">
                      <Link
                        to={`/collection/${category}/1`}
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

      {/* Advantages */}
      <section className="advantages">
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom align="center">
            למה לקנות אצלנו?
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={4} className="advantage">
              <FaTruck size={50} color="#4fc3f7" />
              <Typography variant="h6">משלוחים מהירים</Typography>
              <Typography variant="body2">
                קבלו את ההזמנה עד הבית בזמן קצר
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} className="advantage">
              <FaStar size={50} color="#fdd835" />
              <Typography variant="h6">איכות מעולה</Typography>
              <Typography variant="body2">
                מוצרים נבחרים בקפידה וברמת גימור גבוהה
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} className="advantage">
              <FaTags size={50} color="#81c784" />
              <Typography variant="h6">מחירים נוחים</Typography>
              <Typography variant="body2">
                מגוון רחב במחירים שמתאימים לכל כיס
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Gift Section */}
      <section className="gift-section">
        <Container maxWidth="md" className="gift-content">
          <FaGift size={60} color="#ff80ab" />
          <Typography variant="h4" gutterBottom>
            מחפשים מתנה מושלמת?
          </Typography>
          <Typography variant="body1" gutterBottom>
            הפתיעו את ההורים הטריים עם מתנות מרגשות וייחודיות
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            component={Link}
            to={"/collection/מתנות/" + 1}
          >
            מצאו מתנה עכשיו
          </Button>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;

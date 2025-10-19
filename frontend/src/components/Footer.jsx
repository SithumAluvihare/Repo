import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
// import logo from "../assets/logo-white.png";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa";
import { redirectProductSearch } from "../utils/navigationUtils.js";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const categoryRedirectHandler = (category) => {
    redirectProductSearch({ category });
  };

  return (
    <footer>
      <Container className="px-4">
        <Row>
           <Col xs={20} md={2}>
            {/* <img src={logo} alt="Petizen logo" width={100} />
            <p className="mt-3 fw-bold">MERN Project</p> */}
          </Col> 
          <Col xs={6} md={3} className="mb-5">
            <h5>Contact Me</h5>
            <p>Sithum Aluvihare</p>
            <p>
              Email:
              <br />
              <p>sithumaluvihare21@gmail.com</p>
            </p>
            <p>
              GitHub: https://github.com/SithumAluvihare
            </p>
          </Col>
          <Col xs={6} md={3} className="mb-5">
            <h5>Start Shopping</h5>
            <Link to="/products">
              <p>All Products</p>
            </Link>
            <Link to="/sales">
              <p>Sales</p>
            </Link>
            <p
              className="clickable"
              onClick={() => categoryRedirectHandler("toys")}
            >
              Toys
            </p>
            <p
              className="clickable"
              onClick={() => categoryRedirectHandler("treats")}
            >
              Treats
            </p>
            <p
              className="clickable"
              onClick={() => categoryRedirectHandler("holidays")}
            >
              Holidays
            </p>
          </Col>
          <Col xs={6} md={3} className="mb-5">
            <h5>About Us</h5>
            <Link to="/about">
              <p>Who we are</p>
            </Link>
            <div className="fs-4 gap-3 d-flex mt-3">
              <FaFacebook />
              <FaInstagram />
              <FaPinterest />
              <FaYoutube />
            </div>
          </Col>
        </Row>
        <Row className="text-center">
          <hr />
          <p className="fw-bold mt-3">
            Designed and Developed by me
          </p>
          <p>Copyright © {currentYear} All rights reserved.</p>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;

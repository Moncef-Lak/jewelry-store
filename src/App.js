import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddAdmin from "./admin/add-admin";
import AddBijoux from "./admin/add-bijoux";
import AddCategory from "./admin/add-category";
import AddPicture from "./admin/add-picture";
import HomeAdmin from "./admin/admin-home";
import ManagAdmin from "./admin/manage-admin";
import ManagBijoux from "./admin/manage-bijoux";
import ManagCategory from "./admin/manage-categories";
import ManagGallery from "./admin/manage-gallery";
import ManagOrder from "./admin/manage-order";
import UpdateAdmin from "./admin/update-admin";
import UpdateBijoux from "./admin/update-bijoux";
import UpdateCategory from "./admin/update-category";
import UpdatePicture from "./admin/update-picture";
import Login from "./admin/login";
import About from "./pages/about";
import Boutique from "./pages/boutique";
import Contact from "./pages/contact";
import Detail from "./pages/details";
import Gallery from "./pages/gallery";
import Histoire from "./pages/histoire";
import Home from "./pages/home";
import Navbar from "./pages/Navbar";
import { TweenMax } from "gsap";
import Cart from "./pages/cart";

function App() {
  useEffect(() => {
    TweenMax.to(".container", 0, { css: { visibility: "visible" } });

    console.log(
      "%c Hello to lm jewelry store ",
      "font-weight: bold; font-size: 50px;color:#f6e4f1; text-shadow: 3px 3px 0 #f5b2e2 , 6px 6px 0 #bc85ac , 9px 9px 0 #815b76; margin-bottom: 12px; padding: 5%"
    );
    console.log(
      "%c moncef.lakehal@outlook.com",
      "font-weight: bold; font-size: 20px;background: linear-gradient(45deg,#bdc3c7,#2c3e50);color:#fff;margin: 1rem; padding: 3.5%"
    );
    console.log(
      "%c My Linkedin https://www.linkedin.com/in/moncefdev/",
      "font-weight: bold; font-size: 20px;background: linear-gradient(45deg,#0a66c2,#ddd);color:#fff;margin: 1rem; padding: 3.5%"
    );
    console.log(
      "%c My GitHub https://github.com/MoncefDeveloper",
      "font-weight: bold; font-size: 20px;background: linear-gradient(45deg,#f05133,#fff);color:#fff;margin: 1rem; padding: 3.5%"
    );
    console.log(
      "%c My website https://moncefdev.site",
      "font-weight: bold; font-size: 20px;background: linear-gradient(45deg,#159,#f59);color:#fff;margin: 1rem; padding: 3.5%"
    );
  });

  return (
    <section className="container">
      <Router>
        <Switch>
          <Route exact path="/home">
            <HomeAdmin />
          </Route>
          <Route exact path="/admin">
            <ManagAdmin />
          </Route>
          <Route exact path="/AddAdmin">
            <AddAdmin />
          </Route>
          <Route exact path="/update-Admin/:id">
            <UpdateAdmin />
          </Route>
          <Route exact path="/categories">
            <ManagCategory />
          </Route>
          <Route exact path="/AddCategory">
            <AddCategory />
          </Route>
          <Route exact path="/update-category/:id">
            <UpdateCategory />
          </Route>
          <Route exact path="/gallery">
            <ManagGallery />
          </Route>
          <Route exact path="/AddPicture">
            <AddPicture />
          </Route>
          <Route exact path="/update-picture/:id">
            <UpdatePicture />
          </Route>
          <Route exact path="/bijoux">
            <ManagBijoux />
          </Route>
          <Route exact path="/AddBijoux">
            <AddBijoux />
          </Route>
          <Route exact path="/update-bijoux/:id">
            <UpdateBijoux />
          </Route>
          <Route exact path="/Orders">
            <ManagOrder />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <>
            <Navbar />
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/store">
              <Boutique />
            </Route>
            <Route exact path="/detail/:id">
              <Detail />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/contact">
              <Contact />
            </Route>
            <Route exact path="/histoire">
              <Histoire />
            </Route>
            <Route exact path="/galler">
              <Gallery />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
          </>
        </Switch>
      </Router>
    </section>
  );
}

export default App;

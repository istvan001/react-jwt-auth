import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";


import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import Proba from "./sajatosztalyok/Proba";
import Etterem from "./sajatosztalyok/Etterem";
import Adattorles from "./sajatosztalyok/Adattorles";
import Kommenttorles from "./sajatosztalyok/Kommenttorles";
import ErtekelesekSzama from "./sajatosztalyok/ErtekelesekSzama";
import Rendezveny from "./sajatosztalyok/Rendezveny";
import Rendezvenyfoglalas from "./sajatosztalyok/Rendezveny_foglalas";
class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/Etterem">
        
        Éttermek
      </Navbar.Brand>


     
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {/*<Nav.Link href="/Etterem">Étterem</Nav.Link>*/}
          {showAdminBoard && (
          <Nav.Link href="/Proba">Feltöltés</Nav.Link>
          )}
          {showAdminBoard && (
          <Nav.Link href="/ErtekelesekSzama">Értékelések Száma</Nav.Link>
          )}
          {showAdminBoard && (
          <Nav.Link href="/Rendezvenyfoglalas">Foglalások</Nav.Link>
          )}
          
          <Nav.Link href="/Rendezveny">Rendezvények</Nav.Link>
         
          {showAdminBoard && (
          <NavDropdown title="Törlés" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/Kommenttorles">Komment törles</NavDropdown.Item>
             <NavDropdown.Divider />
            <NavDropdown.Item href="/Adattorles">Étterem törlés</NavDropdown.Item>
           
            
          </NavDropdown>
          )}
        </Nav>
        {currentUser ? (
        <Nav>
          <Nav.Link href="/profile">
          {currentUser.username}
            </Nav.Link>

          <Nav.Link eventKey={2} href="/login"  onClick={this.logOut}>
         Kijelentkezés
          </Nav.Link>
        </Nav>
         ) : (
          <Nav>
          <Nav.Link href="/register">
          Új profil
            </Nav.Link>

          <Nav.Link eventKey={2} href="/login">
           Bejelentkezés
          </Nav.Link>
        </Nav>
         )}
      </Navbar.Collapse>
    </Navbar>


      {/*RéGI

        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            bezKoder
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
            
           
            <li className="nav-item">
              <Link to={"/Proba"} className="nav-link">
                Próba
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/Etterem"} className="nav-link">
                Étterem
              </Link>
            </li>


            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Lap
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/Adattorles"} className="nav-link">
                  Tölés lap
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/Kommenttorles"} className="nav-link">
                  Vélemény Törlés
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>*/}

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/Proba" component={Proba} />
            <Route path="/Etterem" component={Etterem} />
            <Route path="/Adattorles" component={Adattorles} />
            <Route path="/Kommenttorles" component={Kommenttorles} />
            <Route path="/ErtekelesekSzama" component={ErtekelesekSzama} />
            <Route path="/Rendezveny" component={Rendezveny} />
            <Route path="/Rendezvenyfoglalas" component={Rendezvenyfoglalas} />
          </Switch>
        </div>
          </div>
    );
  }
}

export default App;


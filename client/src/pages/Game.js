import React, { useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  Card,
  Table,
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FcPlus, FcEditImage, FcNext } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { useLocation } from "react-router-dom";

const Game = (props) => {
  const loction = useLocation();
  const { reviewState } = loction.state;

  return (
    <>
      <p style={{ color: "#ffff" }}>{reviewState.title}</p>;
    </>
  );
};

export default Game;

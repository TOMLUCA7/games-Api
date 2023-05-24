import React, { useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  Card,
  Table,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FcPlus, FcDeleteRow } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const RowEdit = (props) => {
  const [rowItem, setRowItem] = useState({
    title: props.row.title,
    review: props.row.review,
  });

  const { title, review, tid } = rowItem;

  const upDateRow = (e) => {
    props.upDateReviewsList(props.row.tid, e);
    setRowItem((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <tr>
        <td>{props.row.tid}</td>
        <td>
          <Form.Control
            name="title"
            value={title}
            onChange={(e) => {
              upDateRow(e);
            }}
            type="text"
          />
        </td>
        <td>
          <Form.Control
            name="review"
            value={review}
            onChange={(e) => {
              upDateRow(e);
            }}
            type="text"
            placeholder="Type your review..."
          />
        </td>
        <td>{moment(props.row.createdAt).format("DD/MM/YYYY")}</td>
        <td>
          <Button
            onClick={() => {
              props.delete(props.row.tid);
            }}
            variant="outline-danger"
          >
            <FcDeleteRow />
          </Button>
        </td>
      </tr>
    </>
  );
};

export default RowEdit;

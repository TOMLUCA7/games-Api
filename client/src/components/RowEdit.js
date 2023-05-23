import React, {useState} from "react";
import { Button, Container, Row, Col, Form, Card, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FcPlus, FcDeleteRow } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from 'moment';

const RowEdit = props => {

    const [title, setTitle] = useState(props.row.title);
    const [review, setReview] = useState(props.row.review);

    return (
        <>
            <tr>
                <td>{props.row.tid}</td>
                <td>
                    <Form.Control value={title} onChange={(e) => {setTitle(e.target.value)}} type="text" />
                </td>
                <td>
                    <Form.Control value={review} onChange={(e) => {setReview(e.target.value)}} type="text" placeholder="Type your review..." />
                </td>
                <td>{moment(props.row.createdAt).format("DD/MM/YYYY")}</td>
                <td>
                    <Button onClick={() => {props.delete(props.row.tid)}} variant="outline-danger"><FcDeleteRow/></Button>
                </td>
            </tr>
        </>
    )
}

export default RowEdit;
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
import Header from "../components/Header";
import { FcPlus, FcEditImage } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import RowEdit from "../components/RowEdit";

const Dashboard = (props) => {
  const [deviceName, setdeviceName] = useState("");
  const [price, setprice] = useState(0);
  const [reviews, setreviews] = useState([]);
  const [gallery, setgallery] = useState([]);
  const [reviewsIsEditable, setReviewsIsEditable] = useState(false);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [counter, setCounter] = useState(0);

  //FUNCTIONS
  const addReviewToList = () => {
    if (title !== "" && review !== "") {
      setCounter(counter + 1);
      let row = {
        tid: counter,
        title: title,
        review: review,
        createdAt: Date.now(),
      };
      setreviews((reviews) => [...reviews, row]);
      setTitle("");
      setReview("");
    } else {
      toast.error("All inputs are required");
    }
  };

  const deleteRowFromList = (tid) => {
    setreviews((state) => state.filter((item) => item.tid !== tid));
  };

  const editList = () => {
    setReviewsIsEditable(!reviewsIsEditable);
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <Container style={{ marginTop: 50 }}>
        <Row>
          <Col xl={5}>
            <Form.Control
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              type="text"
              placeholder="Type your title..."
            />
          </Col>
          <Col xl={5}>
            <Form.Control
              value={review}
              onChange={(e) => {
                setReview(e.target.value);
              }}
              type="text"
              placeholder="Type your review..."
            />
          </Col>
          <Col xl={2}>
            <Button onClick={addReviewToList} variant="outline-success">
              <FcPlus size={30} />
            </Button>
            <Button
              style={{ marginLeft: 10 }}
              onClick={editList}
              variant="outline-info"
            >
              <FcEditImage size={30} />
            </Button>
          </Col>
        </Row>

        <Row>
          <Col xl={12}>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Review title</th>
                  <th>Review content</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {reviews.length > 0 && (
                  <>
                    {reviews.map((item) => (
                      <>
                        {reviewsIsEditable ? (
                          <RowEdit row={item} delete={deleteRowFromList} />
                        ) : (
                          <tr>
                            <td>{item.tid}</td>
                            <td>{item.title}</td>
                            <td>{item.review}</td>
                            <td>
                              {moment(item.createdAt).format(
                                "DD/MM/YYYY hh:mm:ss"
                              )}
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;

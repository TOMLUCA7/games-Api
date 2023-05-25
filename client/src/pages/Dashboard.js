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
import Header from "../components/Header";
import { FcPlus, FcEditImage, FcNext } from "react-icons/fc";
import { CiLogout } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import RowEdit from "../components/RowEdit";
import { NavLink } from "react-router-dom";

const Dashboard = (props) => {
  const [deviceName, setdeviceName] = useState("");
  const [price, setprice] = useState(0);
  const [reviews, setreviews] = useState([]);
  const [gallery, setgallery] = useState([]);
  const [reviewsIsEditable, setReviewsIsEditable] = useState(false);
  const [counter, setCounter] = useState(0);
  const [rowItem, setRowItem] = useState({
    title: "",
    review: "",
    tid: 0,
  });

  const { title, review, tid } = rowItem;

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

  const upDateReviewsList = (tid, e) => {
    let new_title, new_review;
    let erow;

    if (e.target.name === "title") {
      new_title = e.target.value;
      erow = reviews.map((item) => {
        if (item.tid === tid) {
          return { ...item, title: new_title };
        }
        return item;
      });
    } else {
      new_review = e.target.value;
      erow = reviews.map((item) => {
        if (item.tid === tid) {
          return { ...item, review: new_review };
        }
        return item;
      });
    }
    setreviews(erow);
  };

  const onItemChange = (e) => {
    setRowItem((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const logOut = () => {
    const auth = localStorage.getItem("token");
    auth.clear();
    auth.loctions.href("/");
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
              name="title"
              onChange={(e) => {
                onItemChange(e);
              }}
              type="text"
              placeholder="Type your title..."
            />
          </Col>
          <Col xl={5}>
            <Form.Control
              value={review}
              name="review"
              onChange={(e) => {
                onItemChange(e);
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
            <Button
              style={{ marginLeft: 10 }}
              onClick={logOut}
              variant="danger"
            >
              <CiLogout size={30} />
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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {reviews.length > 0 && (
                  <>
                    {reviews.map((item) => (
                      <>
                        {reviewsIsEditable ? (
                          <RowEdit
                            row={item}
                            delete={deleteRowFromList}
                            upDateReviewsList={upDateReviewsList}
                          />
                        ) : (
                          <tr>
                            <td>{item.tid}</td>
                            <td>{item.title}</td>
                            <td>{item.review}</td>
                            <td>
                              {moment(item.createdAt).format(
                                "DD/MM/YYYY hh:mm"
                              )}
                            </td>
                            <td>
                              <NavLink
                                className="btn btn-info"
                                key={"reviewKey"}
                                to="/review-details"
                                state={{ reviewState: item }}
                              >
                                <FcNext size={22} color="#000000" />
                              </NavLink>
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

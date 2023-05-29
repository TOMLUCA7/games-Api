import React, { useState, useEffect } from "react";
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
import { FcPlus, FcEditImage } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import RowEdit from "../components/RowEdit";
import { NavLink } from "react-router-dom";
import { VscChevronRight } from "react-icons/vsc";
import axios from "axios";

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

  const [imageRow, setImageRow] = useState({
    imageSource: "",
    imageDesc: "",
  });

  const { title, review, tid } = rowItem;
  const { imageSource, imageDesc } = imageRow;

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

  const addImageToGallery = () => {
    if (imageSource !== "" && imageDesc !== "") {
      setCounter(counter + 1);
      let row = {
        tid: counter,
        imageSource: imageSource,
        imageDesc: imageDesc,
      };
      setgallery((gallery) => [...gallery, row]);
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

  const updateReviewsList = (tid, e) => {
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

  const preset_key = "zd8qtyth";
  const cloud_name = "dgsbqvvhv";

  const onItemChange = (e) => {
    setRowItem((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onImageChange = async (e) => {
    let value = "";

    if (e.target.name === "imageSource") {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset_key);
      axios
        .post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formData
        )
        .then(async (results) => {
          value = await results.data.secure_url;
          setImageRow((prev) => ({
            ...prev,
            [e.target.name]: value,
          }));
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      value = e.target.value;
      setImageRow((prev) => ({
        ...prev,
        [e.target.name]: value,
      }));
    }
  };

  const baseURL = "http://localhost:3001/api";

  const [search, setSearch] = useState(null);

  useEffect(() => {
    let arr = gallery;

    arr.filter((x) => x.imageDesc === search);

    setgallery(arr);
  }, [search]);

  console.log(imageRow);

  const adddevice = () => {
    const device = {
      deviceName: deviceName,
      price: price,
      reviews: reviews,
      gallery: gallery,
    };

    axios
      .post(baseURL + "/account/createDevice", { device })
      .then((results) => {
        console.log(results);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <Container style={{ marginTop: 50 }}>
        {/* 
                <Row>
                    <Col xl={12}>
                        <Form.Control value={search} onChange={(e) => {setSearch(e.target.value)}} style={{width:250}} />
                    </Col>
                </Row> */}

        <Row>
          <Col xl={5}>
            <Form.Control
              value={deviceName}
              onChange={(e) => {
                setdeviceName(e.target.value);
              }}
              style={{ width: 250 }}
            />
          </Col>
          <Col xl={5}>
            <Form.Control
              value={price}
              onChange={(e) => {
                setprice(e.target.value);
              }}
              style={{ width: 250 }}
            />
          </Col>
          <Col xl={2}>
            <Button onClick={adddevice}>ADD DEVICE</Button>
          </Col>
        </Row>

        <br />
        <br />

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
                            updateReviewsList={updateReviewsList}
                          />
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
                            <td>
                              <NavLink
                                key={"reviewKey"}
                                to="/review-details"
                                state={{ reviewState: item }}
                                className="btn btn-info"
                              >
                                <VscChevronRight color="#ffffff" size={30} />
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

        {/* REVIWSE */}
        <Row>
          <Col xl={5}>
            <Form.Control
              name="imageSource"
              type="file"
              onChange={(e) => {
                onImageChange(e);
              }}
            />
          </Col>
          <Col xl={5}>
            <Form.Control
              value={imageDesc}
              name="imageDesc"
              onChange={(e) => {
                onImageChange(e);
              }}
              type="text"
              placeholder="Type your description..."
            />
          </Col>
          <Col xl={2}>
            <Button onClick={addImageToGallery} variant="outline-success">
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

        {/* IMAGES */}
        <Row>
          <Col xl={12}>
            <Table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Desc</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {gallery.length > 0 && (
                  <>
                    {gallery.map((item) => (
                      <>
                        {
                          <tr>
                            <td>
                              <img
                                src={item.imageSource}
                                style={{ width: 200 }}
                              />
                            </td>
                            <td>{item.imageDesc}</td>
                            <td></td>
                          </tr>
                        }
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

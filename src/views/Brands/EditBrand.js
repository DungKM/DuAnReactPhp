import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { detailBrand, editBrand } from "service/brandService";

function EditBrand() {
  const { id } = useParams();
  const history = useHistory(); // Khởi tạo useHistory
  const [errorMessages, setErrorMessages] = useState({});
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [fileimage, setPhoto] = useState("");

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  
  useEffect(() => {
    detailBrand(id)
      .then((response) => {
        setInputs(response);
      })
      .catch((error) => {
        console.error("Error fetching brand data:", error);
      });
  }, [id]);

  const uploadProduct = async () => {
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("name", inputs.name);
    formData.append("description", inputs.description);
    formData.append("image", fileimage);

    await axios.post("http://127.0.0.1:8000/api/brands/" + id, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setTimeout(() => {
      history.push("/admin/brands");
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadProduct();
  };

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Edit Brand</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form id="form-add" onSubmit={handleSubmit}>
                <Row>
                  <Col md="12">
                    <Form.Group>
                      <label>Name</label>
                      <Form.Control
                        placeholder="Name"
                        name="name"
                        type="text"
                        value={inputs.name}
                        onChange={handleInputChange}
                      />
                      {errorMessages.name && (
                        <div className="text-danger">{errorMessages.name}</div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <Form.Group>
                      <label>Description</label>
                      <Form.Control
                        placeholder="Description"
                        name="description"
                        type="text"
                        value={inputs.description}
                        onChange={handleInputChange}
                      />
                      {errorMessages.description && (
                        <div className="text-danger">
                          {errorMessages.description}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <Form.Group>
                      <label>Image</label>
                      <div>
                        <img
                          src={
                            "http://127.0.0.1:8000/storage/images/" +
                            inputs.image
                          }
                          style={{ width: "100px" }}
                          alt="Brand Image"
                        />
                      </div>
                      <Form.Control
                        type="file"
                        name="image"
                        onChange={(e) => setPhoto(e.target.files[0])}
                      />
                      {errorMessages.image && (
                        <div className="text-danger">{errorMessages.image}</div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Button className="btn-fill " type="submit" variant="info">
                  Update Brand
                </Button>
                <div className="clearfix"></div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EditBrand;

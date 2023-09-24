import React, { useState } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { postCategory } from "service/categoryService";
import { validationSchema } from "yup/validation";

function CreateCategory() {
  const history = useHistory();
  const [errorMessages, setErrorMessages] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });

  const { name, description, image } = formData;

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;
    const newValue = type === "file" ? files[0] : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Validate the form data using the validation schema
      await validationSchema.validate(formData, { abortEarly: false });

      // If validation succeeds, proceed with form submission
      const formDataType = new FormData();
      formDataType.append("name", name);
      formDataType.append("description", description);
      formDataType.append("image", image);

      await postCategory(formDataType);

      history.push("/admin/categories");
    } catch (error) {
      // If validation fails, update the error messages
      const errors = {};
      error.inner.forEach((e) => {
        errors[e.path] = e.message;
      });
      setErrorMessages(errors);
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Create Category</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form id="form-add" onSubmit={handleSubmit}>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Name</label>
                        <Form.Control
                          placeholder="Name category"
                          name="name"
                          type="text"
                          value={name}
                          onChange={handleInputChange}
                        />
                        {/* Display validation error if it exists */}
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
                          value={description}
                          onChange={handleInputChange}
                        />
                        {/* Display validation error if it exists */}
                        {errorMessages.description && (
                          <div className="text-danger">{errorMessages.description}</div>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Image</label>
                        <Form.Control
                          type="file"
                          name="image"
                          onChange={handleInputChange}
                        />
                        {/* Display validation error if it exists */}
                        {errorMessages.image && (
                          <div className="text-danger">{errorMessages.image}</div>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button className="btn-fill" type="submit" variant="info">
                    Create Category
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CreateCategory;

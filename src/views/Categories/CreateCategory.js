import React, { useState } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { postCategory } from "service/categoryService";
import { schemaCreateBrandAndCategory } from "yup/validation/SchemaValidation";

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
      await schemaCreateBrandAndCategory.validate(formData, {
        abortEarly: false,
      });

      const formDataType = new FormData();
      formDataType.append("name", name);
      formDataType.append("description", description);
      formDataType.append("image", image);
      await postCategory(formDataType);
      history.push("/admin/categories");
    } catch (error) {
      const validationErrors = {};
      if (error.inner) {
        error.inner.forEach((validationError) => {
          validationErrors[validationError.path] = validationError.message;
        });
      }

      setErrorMessages(validationErrors);
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
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Name</label>
                        <Form.Control
                          placeholder="Name"
                          name="name"
                          type="text"
                          value={name}
                          onChange={handleInputChange}
                        />
                        {errorMessages.name && (
                          <div className="text-danger">
                            {errorMessages.name}
                          </div>
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
                        <Form.Control
                          type="file"
                          name="image"
                          onChange={handleInputChange}
                        />
                        {errorMessages.image && (
                          <div className="text-danger">
                            {errorMessages.image}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button type="submit" variant="info">
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

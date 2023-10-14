import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useParams, useHistory } from "react-router-dom";
import { editProduct } from "service/productService";
import { detailProduct } from "service/productService";
import { getCategoriesBrands } from "service/productService";
import { imageValidationSchema } from "yup/validation/SchemaValidation";
import { schemaUpdateProduct } from "yup/validation/SchemaValidation";

function EditProduct() {
  const { id } = useParams();
  const history = useHistory();
  const [errorMessages, setErrorMessages] = useState({});
  const [fileimage, setPhoto] = useState("");
  const [inputs, setInputs] = useState({
    name: "",
    price: "",
    quantity: "",
    quantity_page: "",
    sale: "",
    image: null,
    description: "",
    category_id: "",
    brand_id: "",
  });
  const [choose, setChoose] = useState({ categories: [], brands: [] });

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    detailProduct(id)
      .then((response) => {
        setInputs(response);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });

    getCategoriesBrands().then((response) => {
      setChoose(response);
    });
  }, []);
  const { categories, brands } = choose;

  const uploadProduct = async () => {
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("name", inputs.name);
    formData.append("price", inputs.price);
    formData.append("quantity", inputs.quantity);
    formData.append("quantity_page", inputs.quantity_page);
    formData.append("sale", inputs.sale);
    formData.append("description", inputs.description);
    formData.append("category_id", inputs.category_id);
    formData.append("brand_id", inputs.brand_id);
    // Check if a new image is selected
    if (fileimage) {
      formData.append("image", fileimage);
    } else {
      // If no new image is selected, append the existing image filename
      formData.append("image", inputs.image);
    }

    await editProduct(formData, id);
    history.push("/admin/products");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fileimage) {
      try {
        await imageValidationSchema.validate(fileimage, { abortEarly: false });
      } catch (error) {
        setErrorMessages({ image: error.message });
        return; // Dừng việc submit nếu có lỗi ở trường image
      }
    }

    try {
      await schemaUpdateProduct.validate(inputs, {
        abortEarly: false,
      });
      await uploadProduct();
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
                <Card.Title as="h4">Edit Product</Card.Title>
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
                        <label>Image</label>
                        <div>
                          {inputs.image ? (
                            <img
                              src={
                                inputs.image
                                  ? "http://127.0.0.1:8000/storage/images/" +
                                    inputs.image
                                  : ""
                              }
                              style={{ width: "100px" }}
                              alt="Product Image"
                            />
                          ) : (
                            <></>
                          )}
                        </div>
                        <Form.Control
                          type="file"
                          name="image"
                          onChange={(e) => setPhoto(e.target.files[0])}
                        />
                        {errorMessages.image && (
                          <div className="text-danger">
                            {errorMessages.image}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Price</label>
                        <Form.Control
                          placeholder="Price"
                          name="price"
                          type="number"
                          value={inputs.price}
                          onChange={handleInputChange}
                        />
                        {errorMessages.price && (
                          <div className="text-danger">
                            {errorMessages.price}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Quantity</label>
                        <Form.Control
                          placeholder="Quantity"
                          name="quantity"
                          type="number"
                          value={inputs.quantity}
                          onChange={handleInputChange}
                        />
                        {errorMessages.quantity && (
                          <div className="text-danger">
                            {errorMessages.quantity}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>QuantityPage</label>
                        <Form.Control
                          placeholder="QuantityPage"
                          name="quantity_page"
                          type="number"
                          value={inputs.quantity_page}
                          onChange={handleInputChange}
                        />
                        {errorMessages.quantity_page && (
                          <div className="text-danger">
                            {errorMessages.quantity_page}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Sale</label>
                        <Form.Control
                          placeholder="Sale"
                          name="sale"
                          type="number"
                          value={inputs.sale}
                          onChange={handleInputChange}
                        />
                        {errorMessages.sale && (
                          <div className="text-danger">
                            {errorMessages.sale}
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
                        <Form.Control
                          as="select"
                          name="category_id"
                          value={inputs.category_id}
                          onChange={handleInputChange}
                        >
                          <option>Choose Categories</option>
                          {categories.map((category, index) => {
                            return (
                              <option key={index} value={category.id}>
                                {category.name}
                              </option>
                            );
                          })}
                        </Form.Control>
                        {errorMessages.category_id && (
                          <div className="text-danger">
                            {errorMessages.category_id}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <Form.Control
                          as="select"
                          name="brand_id"
                          value={inputs.brand_id}
                          onChange={handleInputChange}
                        >
                          <option>Choose Brands</option>
                          {brands.map((brand, index) => {
                            return (
                              <option key={index} value={brand.id}>
                                {brand.name}
                              </option>
                            );
                          })}
                        </Form.Control>
                        {errorMessages.brand_id && (
                          <div className="text-danger">
                            {errorMessages.brand_id}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button className="btn-fill" type="submit" variant="info">
                    Edit Product
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

export default EditProduct;

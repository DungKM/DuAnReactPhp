import React, { useEffect, useState } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import { postProduct } from "service/productService";
import { getCategoriesBrands } from "service/productService";
import { schemaCreateProduct } from "yup/validation/SchemaValidation";

function CreateProduct() {
  const history = useHistory();
  const [errorMessages, setErrorMessages] = useState({});
  const [choose, setChoose] = useState({ categories: [], brands: [] });
  const [formData, setFormData] = useState({
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

  const {
    name,
    price,
    quantity,
    quantity_page,
    sale,
    image,
    description,
    category_id,
    brand_id,
  } = formData;

  useEffect(() => {
    getCategoriesBrands().then((response) => {
      setChoose(response);
    });
  }, []);
  const { categories, brands } = choose;

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
      // If validation succeeds, proceed with form submission
      await schemaCreateProduct.validate(formData, { abortEarly: false });

      const formDataType = new FormData();
      formDataType.append("name", name);
      formDataType.append("price", price);
      formDataType.append("quantity", quantity);
      formDataType.append("quantity_page", quantity_page);
      formDataType.append("sale", sale);
      formDataType.append("image", image);
      formDataType.append("description", description);
      formDataType.append("category_id", category_id);
      formDataType.append("brand_id", brand_id);

      await postProduct(formDataType);

      history.push("/admin/products");
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
                <Card.Title as="h4">Create Product</Card.Title>
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
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Price</label>
                        <Form.Control
                          placeholder="Price"
                          name="price"
                          type="number"
                          value={price}
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
                          value={quantity}
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
                          value={quantity_page}
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
                          value={sale}
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
                        <Form.Control
                          as="select"
                          defaultValue="Choose Category"
                          name="category_id"
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
                          defaultValue="Choose Brand"
                          name="brand_id"
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
                    Create Product
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

export default CreateProduct;

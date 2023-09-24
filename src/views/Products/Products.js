import { useEffect, useState } from "react";
import { Button, Card, Table, Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { destroyProduct } from "service/productService";
import { getProduct } from "service/productService";
function Products() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getProduct().then((data) => {
      setData(data);
    });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      destroyProduct(id)
        .then(() => {
          const updatedData = data.filter((product) => product.id !== id);
          setData(updatedData);
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
        });
    }
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Products</Card.Title>
                <p className="card-product">List product</p>

                <NavLink className="btn btn-info" to={"/admin/product/create"}>
                  Add product
                </NavLink>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Image</th>
                      <th className="border-0">Price</th>
                      <th className="border-0">Quantity</th>
                      <th className="border-0">QuantityPage</th>
                      <th className="border-0">Sale</th>
                      <th className="border-0">Category</th>
                      <th className="border-0">Brand</th>
                      <th className="border-0">Description</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((product, index) => (
                      <tr key={product.id}>
                        <td>{index + 1}</td>
                        <td>{product.name}</td>
                        <td>
                          <img
                            src={
                              "http://127.0.0.1:8000/storage/images/" +
                              product.image
                            }
                            style={{ width: "100px" }}
                            alt="Product Image"
                          />
                        </td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                        <td>{product.quantity_page}</td>
                        <td>{product.sale}</td>
                        <td>{product.category.name}</td>
                        <td>{product.brand.name}</td>
                        <td>{product.description}</td>
                        <td>
                          <Button
                            variant="danger"
                            className="m-2"
                            onClick={() => handleDelete(product.id)}
                          >
                            Delete
                          </Button>
                          <Link
                            to={`/admin/product/edit/${product.id}`}
                            className="btn btn-outline-success m-2"
                          >
                            Update
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Products;

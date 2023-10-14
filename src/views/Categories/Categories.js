import React, { useEffect, useState } from "react";
import { Button, Card, Table, Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { destroyCategory, getCategory } from "service/categoryService";

function Categories() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // const token = sessionStorage.getItem('token');
    getCategory().then((data) => {
      setData(data);
    });
  }, []);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      destroyCategory(id)
        .then(() => {
          const updatedData = data.filter((category) => category.id !== id);
          setData(updatedData);
        })
        .catch((error) => {
          console.error("Error deleting category:", error);
        });
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          {data ? (
            <Col md="12">
              <Card className="strpied-tabled-with-hover">
                <Card.Header>
                  <Card.Title as="h4">Categories</Card.Title>
                  <p className="card-category">List Category</p>
                  <NavLink
                    className="btn btn-info"
                    to={"/admin/category/create"}
                  >
                    Add Category
                  </NavLink>
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                  <Table className="table-hover table-condensed">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data ? (
                        data.map((category, index) => (
                          <tr key={category.id}>
                            <td>{index + 1}</td>
                            <td>{category.name}</td>
                            <td>
                              <img
                                src={
                                  "http://127.0.0.1:8000/storage/images/" +
                                  category.image
                                }
                                style={{ width: "100px" }}
                              />
                            </td>
                            <td>{category.description}</td>
                            <td>
                              <Button
                                variant="danger"
                                className="m-2"
                                onClick={() => handleDelete(category.id)}
                              >
                                Delete
                              </Button>
                              <Link
                                to={`/admin/category/edit/${category.id}`}
                                className="btn btn-outline-success m-2"
                              >
                                Update
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="text-center" colSpan="5">
                            No categories found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          ) : (
            <div>
              <h3 className="text-center">No data</h3>
            </div>
          )}
        </Row>
      </Container>
    </>
  );
}

export default Categories;

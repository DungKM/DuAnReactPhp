import React, { useEffect, useState } from "react";
import { Button, Card, Table, Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { destroyUser } from "service/userService";
import { getUser } from "service/userService";

function Users() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getUser().then((data) => {
      setData(data);
    });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      destroyUser(id)
        .then(() => {
          const updatedData = data.filter((user) => user.id !== id);
          setData(updatedData);
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
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
                  <Card.Title as="h4">Users</Card.Title>
                  <p className="card-category">List Users</p>

                  <NavLink className="btn btn-info" to={"/admin/user/create"}>
                    Add Role
                  </NavLink>
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                  <Table className="table-hover table-condensed">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data ? (
                        data.map((user, index) => (
                          <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                              <Button
                                variant="danger"
                                className="m-2"
                                onClick={() => handleDelete(user.id)}
                              >
                                Delete
                              </Button>
                              <Link
                                to={`/admin/user/edit/${user.id}`}
                                className="btn btn-outline-success m-2"
                              >
                                Update
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="text-center" colSpan="4">
                            No users found
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

export default Users;

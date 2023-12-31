import React, { useEffect, useState } from "react";
import { Button, Card, Table, Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { destroyRole } from "service/roleService";
import { getRole } from "service/roleService";

function Roles() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getRole().then((data) => {
      setData(data);
    });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      destroyRole(id)
        .then(() => {
          const updatedData = data.filter((role) => role.id !== id);
          setData(updatedData);
        })
        .catch((error) => {
          console.error("Error deleting role:", error);
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
                  <Card.Title as="h4">Roles</Card.Title>
                  <p className="card-category">List Roles</p>
                  <NavLink className="btn btn-info" to={"/admin/role/create"}>
                    Add Role
                  </NavLink>
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                  <Table className="table-hover table-condensed">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>DisplayName</th>
                        <th>Group</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data ? (
                        data.map((role, index) => (
                          <tr key={role.id}>
                            <td>{index + 1}</td>
                            <td>{role.name}</td>
                            <td>{role.display_name}</td>
                            <td>{role.group}</td>

                            <td>
                              <Button
                                variant="danger"
                                className="m-2"
                                onClick={() => handleDelete(role.id)}
                              >
                                Delete
                              </Button>
                              <Link
                                to={`/admin/role/edit/${role.id}`}
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
                            No roles found
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

export default Roles;

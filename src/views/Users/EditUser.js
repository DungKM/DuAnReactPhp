import React, { useState, useEffect } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { editUser, detailUser, getRolesUser } from "service/userService";
import { schemaUpdateUser } from "yup/validation/SchemaValidation";

function EditUser() {
  const history = useHistory();
  const { id } = useParams();
  const [errorMessages, setErrorMessages] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    role_ids: [],
  });
  const [choose, setChoose] = useState([]);

  const handleInputChange = (event) => {
    const { name, value, type, files, checked } = event.target;

    if (type === "checkbox") {
      const numericValue = parseInt(value, 10);
      const updatedRoleIds = formData.role_ids.includes(numericValue)
        ? formData.role_ids.filter((id) => id !== numericValue)
        : [...formData.role_ids, numericValue];
      setFormData((prevData) => ({
        ...prevData,
        role_ids: updatedRoleIds,
      }));
    } else {
      const newValue = type === "file" ? files[0] : value;
      setFormData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
    }
  };

  console.log(formData);

  useEffect(() => {
    detailUser(id).then((response) => {
      setFormData({
        name: response.name,
        role_ids: response.roles.map((item) => item.id),
      });
      console.log(response);
    });

    getRolesUser().then((response) => {
      console.log(response);
      setChoose(response);
    });
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await schemaUpdateUser.validate(formData, { abortEarly: false });
      await editUser(formData, id);
      history.push("/admin/users");
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
                <Card.Title as="h4">Edit User</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form id="form-edit" onSubmit={handleSubmit}>
                  {/* Các trường thông tin để chỉnh sửa */}
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Name</label>
                        <Form.Control
                          placeholder="Name"
                          name="name"
                          type="text"
                          value={formData.name}
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
                      <Form.Group controlId="formBasicCheckbox">
                        {Object.keys(choose).map((key) => (
                          <div key={key}>
                            <h3>{key}</h3>
                            {choose[key].map((item) => (
                              <div key={item.id}>
                                <Form.Check
                                  type="checkbox"
                                  label={item.display_name}
                                  value={parseInt(item.id, 10)}
                                  name="role_ids[]"
                                  id={item.id.toString()}
                                  checked={
                                    formData.role_ids &&
                                    formData.role_ids
                                      .map((id) => id)
                                      .includes(item.id)
                                  }
                                  onChange={handleInputChange}
                                />
                              </div>
                            ))}
                          </div>
                        ))}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button className="btn-fill" type="submit" variant="info">
                    Save Changes
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

export default EditUser;

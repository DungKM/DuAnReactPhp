import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { postUser } from "service/userService";
import { getRolesUser } from "service/userService";


function CreateUser() {
  const history = useHistory();
  const [errorMessages, setErrorMessages] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role_ids: [],
  });
  const [choose, setChoose] = useState({});
  const { name, email,password, role_ids } = formData;

  const handleInputChange = (event) => {
    const { name, value, type, files, checked } = event.target;

    if (type === "checkbox") {
      // Nếu là checkbox, thêm hoặc loại bỏ giá trị vào mảng permission_ids
      const updatedRoleIds = formData.role_ids.includes(value)
        ? formData.role_ids.filter((id) => id !== value)
        : [...formData.role_ids, value];

      setFormData((prevData) => ({
        ...prevData,
        role_ids: updatedRoleIds,
      }));
    } else {
      // Nếu là các trường dữ liệu khác, xử lý bình thường
      const newValue = type === "file" ? files[0] : value;
      setFormData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
    }
  };

  useEffect(() => {
    getRolesUser().then((response) => {
      setChoose(response);
    });
  }, []);

  const ListCheck = ({ object }) => {
    return (
      <>
        {Object.keys(object).map((key) => (
          <div key={key}>
            <h3>{key}</h3>
            {object[key].map((item) => (
              <div key={item.id}>
                <Form.Check
                  type="checkbox"
                  label={item.display_name}
                  value={item.id.toString()} // Đặt value là id của permission
                  name="role_ids[]" // Đặt name là "permission_ids[]" để chúng được nhóm vào một mảng
                  id={item.id.toString()}
                  checked={formData.role_ids.includes(item.id.toString())} // Kiểm tra xem checkbox có nên được chọn hay không
                  onChange={handleInputChange}
                />
              </div>
            ))}
          </div>
        ))}
      </>
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // await validationSchema.validate(formData, { abortEarly: false });

     
      await postUser(formData);

      history.push("/admin/users");
    } catch (error) {
      // If validation fails, update the error messages
      // const errors = {};
      // error.inner.forEach((e) => {
      //   errors[e.path] = e.message;
      // });
      // setErrorMessages(errors);
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Create Role</Card.Title>
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
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Email</label>
                        <Form.Control
                          placeholder="email"
                          name="email"
                          type="text"
                          value={email}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Password</label>
                        <Form.Control
                          placeholder="password"
                          name="password"
                          type="password"
                          value={password}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md="12">
                      <Form.Group
                        controlId="formBasicCheckbox"
                        className="d-flex justify-content-between"
                      >
                        {<ListCheck object={choose} />}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button className="btn-fill" type="submit" variant="info">
                    Create User
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

export default CreateUser;

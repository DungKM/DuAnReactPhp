import React, { useState, useEffect } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { detailRole, editRole, getPermission } from "service/roleService";
import { schemaCreateRole } from "yup/validation/SchemaValidation";

function EditRole() {
  const history = useHistory();
  const { id } = useParams();
  const [errorMessages, setErrorMessages] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    display_name: "",
    group: "",
    permission_ids: [], // Khởi tạo là một mảng rỗng
  });
  const [choose, setChoose] = useState([]);

  const handleInputChange = (event) => {
    const { name, value, type, files, checked } = event.target;
  
    if (type === "checkbox") {
      // Chuyển đổi giá trị value thành kiểu số
      const numericValue = parseInt(value, 10);
  
      // Nếu là checkbox, thêm hoặc loại bỏ giá trị vào mảng role_ids
      const updatedPermissionIds = formData.permission_ids.includes(numericValue)
        ? formData.permission_ids.filter((id) => id !== numericValue)
        : [...formData.permission_ids, numericValue];
  
      setFormData((prevData) => ({
        ...prevData,
        permission_ids: updatedPermissionIds,
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
  console.log(formData);

  useEffect(() => {
    // Lấy thông tin role hiện tại từ máy chủ dựa vào roleId
    detailRole(id).then((response) => {
      setFormData({
        name: response.name,
        display_name: response.display_name,
        group: response.group,
        permission_ids: response.permissions.map((item)=> item.id),
      });
    });

    // Lấy danh sách permissions cho checkbox
    getPermission().then((response) => {
      setChoose(response);
    });
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    try {
      await schemaCreateRole.validate(formData, { abortEarly: false });
      await editRole(formData, id);
      history.push("/admin/roles");
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
                <Card.Title as="h4">Edit Role</Card.Title>
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
                      <Form.Group>
                        <label>display_name</label>
                        <Form.Control
                          placeholder="display_name"
                          name="display_name"
                          type="text"
                          value={formData.display_name}
                          onChange={handleInputChange}
                        />
                        {errorMessages.display_name && (
                          <div className="text-danger">
                            {errorMessages.display_name}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>group</label>
                        <Form.Control
                          as="select"
                          name="group"
                          value={formData.group}
                          onChange={handleInputChange}
                        >
                          <option value="">Choose</option>
                          <option value="system">System</option>
                          <option value="user">User</option>
                        </Form.Control>
                        {errorMessages.group && (
                          <div className="text-danger">
                            {errorMessages.group}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group controlId="formBasicCheckbox" className="d-flex justify-content-between">
                        {/* Checkbox cho permissions */}
                        {Object.keys(choose).map((key) => (
                          <div key={key}>
                            <h3>{key}</h3>
                            {choose[key].map((item) => (
                              <div key={item.id}>
                                <Form.Check
                                  type="checkbox"
                                  label={item.display_name}
                                  value={item.id.toString()}
                                  name="permission_ids[]"
                                  id={item.id.toString()}
                                  checked={
                                    formData.permission_ids &&
                                    formData.permission_ids.map((id) => id.toString()).includes(item.id.toString())
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

export default EditRole;

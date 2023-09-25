import React, { useState, useEffect } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { editUser, detailUser,  getRolesUser  } from "service/userService";


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
      // Chuyển đổi giá trị value thành kiểu số
      const numericValue = parseInt(value, 10);
  
      // Nếu là checkbox, thêm hoặc loại bỏ giá trị vào mảng role_ids
      const updatedRoleIds = formData.role_ids.includes(numericValue)
        ? formData.role_ids.filter((id) => id !== numericValue)
        : [...formData.role_ids, numericValue];
  
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
  
  console.log(formData);

  useEffect(() => {
    // Lấy thông tin role hiện tại từ máy chủ dựa vào roleId
    detailUser(id).then((response) => {
      setFormData({
        name: response.name,
        role_ids: response.roles.map((item)=> item.id),
      });
      console.log(response);
    });

    getRolesUser().then((response) => {
      setChoose(response);
    });
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Gửi dữ liệu chỉnh sửa lên máy chủ
      await editUser(formData, id);

      history.push("/admin/users");
    } catch (error) {
      // Xử lý lỗi nếu cần thiết
      // console.error("Error updating role:", error);
      // setErrorMessages(error.response.data.errors); // Cập nhật thông báo lỗi từ máy chủ
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
                      </Form.Group>
                    </Col>
                  </Row>
                  
                 
                    
               
                  <Row>
                    <Col md="12">
                      <Form.Group controlId="formBasicCheckbox">
                        {/* Checkbox cho roles */}
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
                                    formData.role_ids.map((id) => id).includes(item.id)
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

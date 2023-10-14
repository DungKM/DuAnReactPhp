import * as Yup from "yup";

export const schemaCreateBrandAndCategory = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.mixed()
    .required("Image is required")
    .test(
      "fileType",
      "Only image files (jpeg, jpg, png, gif) are allowed",
      (value) => {
        if (!value) return true; // If no file is uploaded, skip this test
        return (
          ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
            value.type
          ) && value.size <= 1024 * 1024 * 5 // 5MB limit
        );
      }
    ),
});

export const schemaUpdateBrandAndCategory = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
});

export const schemaCreateProduct = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  image: Yup.mixed()
    .required("Image is required")
    .test(
      "fileType",
      "Only image files (jpeg, jpg, png, gif) are allowed",
      (value) => {
        if (!value) return true; // If no file is uploaded, skip this test
        return (
          ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
            value.type
          ) && value.size <= 1024 * 1024 * 5 // 5MB limit
        );
      }
    ),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  quantity: Yup.number()
    .required("Quantity is required")
    .integer("Quantity must be an integer"),
  quantity_page: Yup.number()
    .required("QuantityPage is required")
    .integer("QuantityPage must be an integer"),
  sale: Yup.number()
    .required("Sale is required")
    .positive("Sale must be positive"),
  description: Yup.string().required("Description is required"),
  category_id: Yup.string().required("Category is required"),
  brand_id: Yup.string().required("Brand is required"),
});
export const schemaUpdateProduct = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  quantity: Yup.number()
    .required("Quantity is required")
    .integer("Quantity must be an integer"),
  quantity_page: Yup.number()
    .required("QuantityPage is required")
    .integer("QuantityPage must be an integer"),
  sale: Yup.number()
    .required("Sale is required")
    .positive("Sale must be positive"),
  description: Yup.string().required("Description is required"),
  category_id: Yup.string().required("Category is required"),
  brand_id: Yup.string().required("Brand is required"),
});
export const schemaCreateUser = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});
export const schemaUpdateUser = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

export const schemaCreateRole = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  display_name: Yup.string().required("Display Name is required"),
  group: Yup.string().required("Group is required"),
});


export const imageValidationSchema = Yup.mixed().test(
  "isImage",
  "File must be an image (jpeg, jpg, png, or gif) and less than 5MB",
  (value) => {
    if (!value) return true; // If no file is uploaded, skip this test
    return (
      ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
        value.type
      ) && value.size <= 1024 * 1024 * 5 // 5MB limit
    );
  }
);

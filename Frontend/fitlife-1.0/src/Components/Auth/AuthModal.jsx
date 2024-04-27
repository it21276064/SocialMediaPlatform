import React, { useState } from "react";
import { Modal, Form, Input, Button, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import UploadFileService from "../../Services/UploadFileService"; // Importing file upload service
import AuthService from "../../Services/AuthService"; // Importing authentication service
import UserService from "../../Services/UserService"; // Importing user service

const uploader = new UploadFileService(); // Creating an instance of the UploadFileService

// AuthModal component definition
const AuthModal = ({ isOpen, onClose }) => {
  const [signinFocused, setSigninFocused] = useState(true); // State to track whether sign in or sign up form is focused
  const [form] = Form.useForm(); // Form hook from antd
  const [isLoading, setIsLoading] = useState(false); // State to track loading state

  // Function to toggle between sign in and sign up form
  const toggleFocus = () => {
    setSigninFocused(!signinFocused);
  };

  // Function to handle form submission
  const handleFormSubmit = async (values) => {
    try {
      setIsLoading(true); // Set loading state to true
      if (signinFocused) {
        // If sign in form is focused
        const response = await AuthService.login(values.email, values.password); // Attempt login
        localStorage.setItem("userId", response.userId); // Store user ID in local storage
        localStorage.setItem("accessToken", response.accessToken); // Store access token in local storage
        message.success("Welcome back"); // Show success message
        onClose(); // Close modal
        form.resetFields(); // Reset form fields
      } else {
        // If sign up form is focused
        const exists = await UserService.checkIfUserExists(values.username); // Check if user exists with the provided username
        if (exists) {
          // If user exists, show error message
          message.error("User already exists with this username");
          return;
        } else {
          // If user does not exist, proceed with registration
          const response = await AuthService.register(values.username, values.password); // Register user
          localStorage.setItem("userId", response.userId); // Store user ID in local storage
          localStorage.setItem("accessToken", response.accessToken); // Store access token in local storage
        }

        let imageUrl = "";
        if (values.file) {
          // If file is provided
          imageUrl = await uploader.uploadFile(values.file[0].originFileObj, "userImages"); // Upload image
        }
        const body = {
          userId: localStorage.getItem("userId"), // Get user ID from local storage
          biography: values.biography, // Biography
          fitnessGoals: values.fitnessGoals, // Fitness goals
          image: imageUrl, // Image URL
          email: values.email, // Email
        };
        await UserService.createProfile(body); // Create user profile
        message.success("Welcome " + values.username); // Show success message
        onClose(); // Close modal
        form.resetFields(); // Reset form fields
      }
    } catch (err) {
      // If an error occurs during registration
      message.error("Error creating your profile"); // Show error message
    } finally {
      setIsLoading(false); // Set loading state to false
      form.resetFields(); // Reset form fields
    }
  };

  // Function to handle file upload
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  // Rendering the modal with authentication form
  return (
    <Modal
      title="Sign In or Sign Up"
      open={isOpen}
      footer={null}
      onCancel={onClose}
    >
      <Form
        name="authForm"
        form={form}
        initialValues={{ remember: true }}
        onFinish={handleFormSubmit}
        autoComplete="off"
      >
        {/* Email input field */}
        <Form.Item
          name="email"
          label="Username"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        {/* Password input field */}
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        {/* Sign up form fields */}
        {!signinFocused && (
          <>
            {/* Confirm password input field */}
            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              label="Confirm Password"
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>

            {/* Username input field */}
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
              label="Username"
            >
              <Input placeholder="Username" />
            </Form.Item>

            {/* Biography input field */}
            <Form.Item
              name="biography"
              rules={[
                { required: true, message: "Please input your biography!" },
              ]}
              label="Biography"
            >
              <Input placeholder="biography" />
            </Form.Item>

            {/* Fitness goals input field */}
            <Form.Item
              name="fitnessGoals"
              rules={[
                { required: true, message: "Please input your fitness goals!" },
              ]}
              label="Fitness Goals"
            >
              <Input placeholder="Fitness Goals" />
            </Form.Item>

            {/* File upload input field */}
            <Form.Item
              name="file"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              extra="Optional: Upload an image for your profile"
            >
              <Upload.Dragger beforeUpload={() => false} multiple={false}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
              </Upload.Dragger>
            </Form.Item>
          </>
        )}

        {/* Submit button */}
        <Form.Item>
          <Button loading={isLoading} type="primary" htmlType="submit">
            {signinFocused ? "Sign In" : "Sign Up"}
          </Button>
        </Form.Item>

        {/* Toggle sign in/sign up link */}
        <Form.Item>
          <Button type="link" onClick={toggleFocus}>
            {signinFocused
              ? "Need an account? Sign up"
              : "Already have an account? Sign in"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AuthModal; // Exporting AuthModal component


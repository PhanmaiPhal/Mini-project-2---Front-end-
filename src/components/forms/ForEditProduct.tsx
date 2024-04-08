"use client";
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup";
import Image from 'next/image';
import { baseApi } from '@/app/constants/baseApi';
import axios from 'axios';
import { useState } from 'react';
import { ProductType, ProductTypeUpdate } from '@/types/product';
 

const FILE_SIZE = 1024 * 1024 * 5; // mean can store 5MB only
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const validationSchema = Yup.object().shape({
  image: Yup.mixed()
    .test("fileSize", "File too large", (value: any ) => {
      if (!value) {
        return true;
      }
      return value.size <= FILE_SIZE;
    })
    .test("fileFormat", "Unsupported Format", (value: any) => {
      if (!value) {
        return true;
      }
      return SUPPORTED_FORMATS.includes(value.type);
    })
    .required("Required"),
});

const fieldStyle = "border border-gray-300 rounded-md";

const ForEditProduct = ({id,image,name,desc,price,category, quantity}: ProductTypeUpdate) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0NzU4NTU5LCJpYXQiOjE3MTI1OTg1NTksImp0aSI6ImI1MTdhYzJjYzY0MzQ2MjBhZTAzMDYxZjlmMjdmYzQzIiwidXNlcl9pZCI6Mzd9.j4BD-xv4eoPj2-4mTweWQmHCFjen32xagVKPfC82UjM"
  );
  myHeaders.append(
    "Cookie",
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxNDkzMTM1OSwiaWF0IjoxNzEyNTk4NTU5LCJqdGkiOiJjMmJhNTljNzU3NDc0YmZiYmQ4NTk1ODhjYzgxNWFhMyIsInVzZXJfaWQiOjM3fQ.UN3gcEEVjdFdSmp4yUoKx_QSJyvZ0y4fsP1c4-BpMV4"
  );
  const handleSubmitToServer = async (values: any) => {
    
    try {
      // axios is used to make HTTP requests to the server like the fetchData
      const response = await axios.post(
        `${baseApi}file/product/`,
        values.image
      );
      return response.data.image;
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateProduct = async (values: any, imageData: any) => {
    try {
      const imageUrl = await handleSubmitToServer(imageData);
      console.log("data: ", values);
      const patchData = await fetch(`${baseApi}products/${id}/`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify({
          ...values,
          image: imageUrl,
        }),
      });
      console.log("patch data: ", patchData);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="w-full pt-1">
      <Formik
        onSubmit={(values: any, { setSubmitting, resetForm }) => {
          console.log(values);
          const formData = new FormData();
          formData.append("image", values.image);;
          handleCreateProduct(values, { image: formData });
          setSubmitting(false);
          resetForm();
        }}
        validationSchema={validationSchema}
        initialValues={{
          category: {
            name: category,
          },
          name: name,
          desc: desc,
          image: image,
          price: price,
          quantity: quantity,

        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="flex flex-col gap-4">
            {/* name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Category : </label>
              <Field
                placeholder="Shirt"
                className={fieldStyle}
                name="category.name"
                type="text"
              />
              {/* <ErrorMessage name="email">
                {(msg) => <p className="text-red-600 text-sm italic">{msg}</p>}
              </ErrorMessage> */}
            </div><div className="flex flex-col gap-2">
              <label htmlFor="name">Product Name: </label>
              <Field
                placeholder="T-shirt"
                className={fieldStyle}
                name="name"
                type="text"
              />
              {/* <ErrorMessage name="email">
                {(msg) => <p className="text-red-600 text-sm italic">{msg}</p>}
              </ErrorMessage> */}
            </div>
            {/* description */}
            <div className="flex flex-col gap-2">
              <label htmlFor="desc">Description: </label>
              <Field
                placeholder="This is a t-shirt"
                className={fieldStyle}
                name="desc"
                type="text"
              />
              {/* <ErrorMessage name="email">
                {(msg) => <p className="text-red-600 text-sm italic">{msg}</p>}
              </ErrorMessage> */}
            </div>
            {/* price */}
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Price: </label>
              <Field
                placeholder="100"
                className={fieldStyle}
                name="price"
                type="number"
              />
              {/* <ErrorMessage name="email">
                {(msg) => <p className="text-red-600 text-sm italic">{msg}</p>}
              </ErrorMessage> */}
            </div>
            {/* quantity */}
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Quantity: </label>
              <Field
                placeholder="1"
                className={fieldStyle}
                name="quantity"
                type="number"
              />
              {/* <ErrorMessage name="email">
                {(msg) => <p className="text-red-600 text-sm italic">{msg}</p>}
              </ErrorMessage> */}

              {/* Image  */}
              <div>
                <Field
                  name="image"
                  className={fieldStyle}
                  type="file"
                  title="Select a file"
                  setFieldValue={setFieldValue} // Set Formik value
                  component={CustomInput} // component prop used to render the custom input
                />
                <ErrorMessage name="image">
                  {(msg) => <div className="text-danger">{msg}</div>}
                </ErrorMessage>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-3 bg-pink-600 text-white rounded-md"
                disabled={isSubmitting}
              >
                Edit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForEditProduct ;


// custom Input
function CustomInput({ field, form, setFieldValue, ...props }: any) {
    const [previewImage, setPreviewImage] = useState<string | undefined>(
      undefined
    );
    const name = field.name;
    const onChange: any = (event: any) => {
      console.log("event:", event.currentTarget.files);
      const file = event.currentTarget.files[0];
      setFieldValue(name, file);
      setPreviewImage(URL.createObjectURL(file));
    };
  
    return (
      <div className="flex flex-col gap-4 justify-center">
        <input
          type="file"
          onChange={onChange}
          {...props}
          className="border border-gray-300 rounded-md"
        />
        {previewImage && (
          <Image
            className="rounded-md"
            src={previewImage}
            alt="preview Image"
            width={100}
            height={100}
          />
        )}
      </div>
    );
  }
  
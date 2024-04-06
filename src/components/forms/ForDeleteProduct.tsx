// import React, { useState, useEffect } from "react";
// import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
// import { IoEllipsisHorizontal } from "react-icons/io5";
// import LoadingComponent from "@/app/loading";
// import { ProductType } from "@/types/product";

// const url_based = "https://store.istad.co/api/products";

// const UserTable = () => {
//   // Other state declarations...

//   async function handleDelete(value: ProductType) {
//     try {
//       // Make DELETE request to delete the product with given ID
//       await fetch(`${url_based}/${value.id}`, {
//         method: "DELETE",
//       });

//       // If deletion is successful, update the UI to reflect the deletion
//       setFilter(prevFilter => prevFilter.filter(product => product.id !== value.id));
      
//       // Close the delete modal
//       onDeleteClose();
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   }

//   // Other code...
// }

"use client";
import LoadingComponent from "@/app/loading";
import React, { use } from "react";
import Image from "next/image";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { useState, useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { ProductType } from "@/types/product";
import ForEditProduct from "../forms/ForEditProduct";

const customStyles = {
  rows: {
    style: {
      // minWidth: "1000px",
      minHeight: "72px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
};

const url_based = "https://store.istad.co/api/products/?page=1&page_size=100";
const UserTable = () => {
  const [getUser, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [userDetail, setUserDetail] = useState({} as ProductType)

  function handleDetail(value: ProductType) {
    onOpen();
    setUserDetail(value)

  }
  function handleEdit(value: ProductType) {
    onOpen();
    onEditOpen()
  }

  function handleDelete(value: ProductType) {
    onDeleteOpen();
    setUserDetail(value);
  }

  // async function deleteProduct(productId: number) {
  //   try {
  //     await fetch(`${url_based}/${productId}`, {
  //       method: "DELETE",
  //     });

  //     // Remove the deleted product from the list displayed
  //     setFilter(prevFilter => prevFilter.filter(product => product.id !== productId));
      
  //     // Close the delete modal
  //     onDeleteClose();
  //   } catch (error) {
  //     console.error("Error deleting product:", error);
  //   }
  // }

  const columnsData: TableColumn<ProductType>[] = [
    {
      name: "ID",
      selector: (row): any => (
        <div className=" font-bold text-blue-600">{row.id}</div>
      ),
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Image",
      selector: (row): any => (
        <Image src={row.image} width={70} height={70} alt={row.name} />
      ),
    },
    {
      name: "Action",
      cell: (row) => {
        return (
          <div>
            <Dropdown>
              <DropdownTrigger>
                <button>
                  <IoEllipsisHorizontal />
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  key="detail"
                  onClick={() => handleDetail(row)}
                >
                  View Detail
                </DropdownItem>

                <DropdownItem key="edit" onClick={() => handleEdit(row)}>Edit</DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onClick={() => handleDelete(row)}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(url_based);
      const response = await data.json();
      setUser(response.results);
      setFilter(response.results);
    }
    fetchData();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!search) {
      setFilter(getUser);
      return;
    }
    const result = getUser.filter((item: ProductType) => {
      return item.name?.toLowerCase().includes(search.toLowerCase());
    });
    setFilter(result);
  }, [getUser, search]);

  const paginationComponentOptions = {
    rowsPerPageText: "ជួរដេកក្នុងមួយទំព័រ",
    rangeSeparatorText: "នៃ",
    selectAllRowsItem: true,
    selectAllRowsItemText: "ទាំងអស់",
  };

  return (
    <div className="w-full">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p>
                  {userDetail.name}
                </p>
                <p>
                  {userDetail.category}
                </p>
                <Image src={userDetail.image} width={100} height={100} alt="user" />

              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={isEditOpen} onOpenChange={onEditOpenChange}>
        <ModalContent>
          {(onEditClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 justify-center items-center pt-7">Edit Product</ModalHeader>
              <ModalBody>
                <ForEditProduct id={userDetail.id} name={userDetail.name} image={userDetail.image} price={userDetail.price} quantity={userDetail.quantity} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
     
    
      <DataTable
        progressPending={isLoading}
        columns={columnsData}
        fixedHeader={true}
        fixedHeaderScrollHeight="500px"
        selectableRows
        pagination
        subHeader
        // customStyles={customStyles}
        subHeaderComponent={
          <input
            className="border-[1px] px-4 py-2 w-full rounded-md border-blue-400"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        }
        paginationComponentOptions={paginationComponentOptions}
        onSelectedRowsChange={() => console.log("row selected")}
        progressComponent={<LoadingComponent />}
        customStyles={customStyles}
        data={filter}
      />
    </div>
  );
};

export default UserTable;
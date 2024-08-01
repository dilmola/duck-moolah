import React, { useState, useEffect, useCallback } from "react";
import styles from "./button-context-menu.module.css";
import deleteIcon from "../../../../public/icons/icon-delete.png";
import viewIcon from "../../../../public/icons/icon-viewdetail.png";
import editIcon from "../../../../public/icons/icon-edit.png";
import paidIcon from "../../../../public/icons/icon-paid.png";
import ModalEdit from "@/components/modals/modal-edit";
import AlertDelete from "@/components/alert/alert-delete";

import Image from "next/image";

const ButtonContextMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const openModal = (event) => {
    event.stopPropagation();
    setShowModal(true);
    setMenuOpen(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleMenu = (event) => {
    event.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = useCallback(() => {
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleDeleteClick = (event) => {
    event.stopPropagation(); // Prevent the click event from propagating to the document
    setShowDeleteAlert(true);
  };

  const handleDeleteConfirm = () => {
    // Proceed with the delete action
    console.log("Item deleted");
    // Implement your delete logic here
    setShowDeleteAlert(false);
    setMenuOpen(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteAlert(false);
  };

  return (
    <div
      className={`${styles.menuContainer} ${menuOpen ? styles.menuOpen : ""}`}
    >
      <div className={styles.menuButton} onClick={toggleMenu}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
      {menuOpen && (
        <div className={styles.dropdownMenu}>
          <div className={`${styles.dropdownItem} text-[#A7C957]`}>
            <Image
              src={paidIcon.src}
              height={16}
              width={16}
              className={styles.iconItem}
              alt="Paid icon"
            />
            <a href="#">Paid</a>
          </div>
          <div className={styles.dropdownItem}>
            <Image
              src={viewIcon.src}
              height={16}
              width={16}
              className={styles.iconItem}
              alt="View icon"
            />
            <a href="#">View</a>
          </div>
          <div onClick={openModal} className={styles.dropdownItem}>
            <Image
              src={editIcon.src}
              height={16}
              width={16}
              className={styles.iconItem}
              alt="Edit icon"
            />
            <a>Edit</a>
          </div>
          <div
            onClick={handleDeleteClick}
            className={`${styles.dropdownItem} text-[#F84A4A]`}
          >
            <Image
              src={deleteIcon.src}
              height={16}
              width={16}
              className={styles.iconItem}
              alt="Delete icon"
            />
            <a href="#">Delete</a>
          </div>
        </div>
      )}
      <ModalEdit showModal={showModal} onClose={closeModal} />{" "}
      <AlertDelete
        isOpen={showDeleteAlert}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
};

export default ButtonContextMenu;

import React, { useState, useEffect, useCallback, useContext } from "react";
import styles from "./button-context-menu.module.css";
import deleteIcon from "../../../../public/icons/icon-delete.png";
import viewIcon from "../../../../public/icons/icon-viewdetail.png";
import editIcon from "../../../../public/icons/icon-edit.png";
import paidIcon from "../../../../public/icons/icon-paid.png";
import unpaidIcon from "../../../../public/icons/icon-pending.png";
import ModalEdit from "@/components/modals/modal-edit";
import AlertDelete from "@/components/alert/alert-delete";
import useUpdateStatusBill from "@/hooks/useUpdateStatusBill";
import Image from "next/image";
import GlobalContext from "@/context/globalContext";

const ButtonContextMenu = ({
  idOfBill,
  typeAmount,
  nameOfBill,
  dueDateOfBill,
  amountOfBill,
  statusOfBill,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const { updateStatus } = useUpdateStatusBill("/api/update-status-bill");
  const { updateCardStatus } = useContext(GlobalContext);

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
    event.stopPropagation();
    setShowDeleteAlert(true);
  };

  const handleDeleteConfirm = () => {
    setShowDeleteAlert(false);
    setMenuOpen(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteAlert(false);
  };

  const handleStatusClick = async (event, newStatus) => {
    event.preventDefault();
    event.stopPropagation();
    if (!idOfBill) {
      console.warn("No billId provided.");
      return;
    }

    try {
      await updateStatus(idOfBill, newStatus);
      updateCardStatus(idOfBill, newStatus);
      console.log(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
    }

    setMenuOpen(false);
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
      <div
        className={`absolute top-full right-0 w-max rounded-lg shadow-md transition-all duration-100 z-50 ${
          menuOpen ? "" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className={`${styles.dropdownMenu} font-thin`}>
          {statusOfBill === "paid" ? (
            <div
              className={styles.dropdownItem}
              onClick={(event) => handleStatusClick(event, "pending")}
            >
              <Image
                src={unpaidIcon.src}
                height={16}
                width={16}
                className={styles.iconItem}
                alt="Unpaid icon"
              />
              <a className="text-[#e84243]">Unpaid</a>
            </div>
          ) : (
            <div
              className={styles.dropdownItem}
              onClick={(event) => handleStatusClick(event, "paid")}
            >
              <Image
                src={paidIcon.src}
                height={16}
                width={16}
                className={styles.iconItem}
                alt="Paid icon"
              />
              <a className="text-[#A7C957]">Paid</a>
            </div>
          )}
          {/* <div className={styles.dropdownItem}>
            <Image
              src={viewIcon.src}
              height={16}
              width={16}
              className={styles.iconItem}
              alt="View icon"
            />
            <a href="#">View</a>
          </div> */}
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
      </div>
      <ModalEdit
        showModal={showModal}
        onClose={closeModal}
        idOfBill={idOfBill}
        statusOfBill={statusOfBill}
        typeAmount={typeAmount}
        nameOfBill={nameOfBill}
        dueDateOfBill={dueDateOfBill}
        amountOfBill={amountOfBill}
      />
      <AlertDelete
        isOpen={showDeleteAlert}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        idOfBill={idOfBill}
      />
    </div>
  );
};

export default ButtonContextMenu;

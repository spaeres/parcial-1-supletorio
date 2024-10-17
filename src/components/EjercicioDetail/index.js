import React, { useEffect } from "react";
import Modal from "react-modal";
import "./style.css";
import { useState } from "react";

Modal.setAppElement("#root");

const ImageModal = ({ isOpen, onRequestClose, imageUrl }) => {
  const [resizedImageUrl, setResizedImageUrl] = useState(imageUrl);

  useEffect(() => {
    if (imageUrl) {
    }
  }, [imageUrl]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal">
      <button onClick={onRequestClose} className="close-button">
        Cerrar
      </button>
      <img src={resizedImageUrl} alt="Detalle" className="modal-image" />
    </Modal>
  );
};

export default ImageModal;

import React, { useState, useEffect } from "react";
import "./style.css";
import { useLocation } from "react-router-dom";
import { FaRunning, FaSwimmer, FaBicycle } from "react-icons/fa";
import ImageModal from "../EjercicioDetail";

const HomeComponent = () => {
  // Usar location:
  const location = useLocation();

  // Estados:
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [userProfile, setUserProfile] = useState({
    full_name: "",
    best_running_time: 0,
    best_swimming_time: 0,
    best_cycling_time: 0,
    profile_image: "",
  });
  // Estados de las imagenes
  const [images, setImages] = useState([]);

  const [images2, setImages2] = useState([]);

  const [images3, setImages3] = useState([]);

  // Estado del ejercicio
  const [exercise, setExercise] = useState({
    ciudad_del_ejercicio: "",
    distancia_del_ejercicio: 0,
    duración_del_ejercicio: 0,
  });

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage("");
  };

  // Desestructurar los datos del state que se envió
  const { email, password } = location.state || {};

  useEffect(() => {
    const fetchUserExercise = async () => {
      try {
        const response = await fetch(
          "https://my.api.mockaroo.com/exercise.json",
          {
            headers: {
              "X-API-Key": "71ca6fd0",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setExercise(data);
        setTimeout(() => {
          console.log(userProfile);
        }, 1000);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserExercise();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          "https://my.api.mockaroo.com/profile-prueba.json",
          {
            headers: {
              "X-API-Key": "71ca6fd0",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserProfile(data);
        setTimeout(() => {
          console.log(userProfile);
        }, 1000);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const loadImages = async () => {
      const newImagesBicicleta = [];
      const newImagesCorrer = [];
      const newImagesNadar = [];
      for (let i = 0; i < 24; i++) {
        newImagesBicicleta.push(
          `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR25fQxG7ZGVAQIi3PRgZ221Nq977zRRqHs3A&s`
        );
        newImagesCorrer.push(
          `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxfma2_bTHHfh5jN8hkozkc0MHx56PYgMjIA&s`
        );
        newImagesNadar.push(
          `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROKEfsNxv36yxhPm8w-x4jrRoLhTM2Y3yRtA&s`
        );
      }
      setImages(newImagesBicicleta);
      setImages2(newImagesCorrer);
      setImages3(newImagesNadar);
    };
    loadImages();
  }, []);

  return (
    <div className="home-container">
      <div className="sections-row">
        <div className="section-column">
          <h2>Cycling</h2>
          <div className="gallery">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Cycling Image ${index + 1}`}
                className="gallery-image"
                onClick={() => openModal(image)}
              />
            ))}
          </div>
        </div>

        <div className="section-column">
          <h2>Running</h2>
          <div className="gallery">
            {images2.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Running Image ${index + 1}`}
                className="gallery-image"
                onClick={() => openModal(image)}
              />
            ))}
          </div>
        </div>

        <div className="section-column">
          <h2>Swimming</h2>
          <div className="gallery">
            {images3.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Running Image ${index + 1}`}
                className="gallery-image"
                onClick={() => openModal(image)}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Barra de usuario */}
      <div className="profile-bar">
        <div className="avatar">
          <img src={userProfile.profile_image} alt="Avatar" />
        </div>
        <div className="profile-info">
          <h2>{userProfile.full_name}</h2>
        </div>
        <div className="activities">
          <div className="activity">
            <FaRunning className="icon" />
            <span>{userProfile.best_running_time}</span>
          </div>
          <div className="activity">
            <FaSwimmer className="icon" />
            <span>{userProfile.best_swimming_time}</span>
          </div>
          <div className="activity">
            <FaBicycle className="icon" />
            <span>{userProfile.best_cycling_time}</span>
          </div>
        </div>
      </div>
      {/* Componente del Modal */}
      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        imageUrl={selectedImage} // Pasa la URL de la imagen seleccionada
      />
    </div>
  );
};

export default HomeComponent;

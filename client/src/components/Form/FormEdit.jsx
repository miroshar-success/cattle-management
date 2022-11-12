import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { header } from "../../constants/token";
import { URL_UPDATE_ANIMAL } from "../../constants/urls";
import * as animalActions from "../../redux/actions/animal-actions/animal-actions";
import axios from "axios";

export function FormEdit(props) {
  console.log(props);
  console.log("props.animal = ");
  console.log(props.animal);
  const [localState, setLocalState] = React.useState({
    id_senasa: props.animal.id_senasa,
    type_of_animal: props.animal.type_of_animal,
    breed_name: props.animal.breed_name || "",
    location: props.animal.location || "",
    weight_kg: props.animal.weight_kg,
    name: props.animal.name,
    device_type: props.animal.device_type,
    device_number: props.animal.device_number,
    image_1: props.animal.image_1 || "",
    image_2: props.animal.image_2 || "",
    image_3: props.animal.image_3 || "",
    comments: props.animal.comments || "",
    birthday: props.animal.birthday || "",
    is_pregnant: props.animal.is_pregnant || "",
    delivery_date: props.animal.delivery_date || "",
  });

  console.log("localState", localState);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(animalActions.getTypesOfAnimalsAllowed());
    //eslint-disable-next-line
  }, []);
//eslint-disable-next-line
  const typesOfAnimalsState = useSelector((state) => state.animals.typesOfAnimals);
  const accessToken = localStorage.getItem("tokenCattleTracker");

  // HANDLE FUNCTIONS:
  function handleOnChange(e) {
    setLocalState({ ...localState, [e.target.name]: e.target.value });
  }

  async function handleSubmitWithNoDispatch(e) {
    e.preventDefault();
    console.log(
      `handleSubmitWithNoDispatch invocado. localState: `,
      localState
    );
    //HACER JS VALIDATIONS...
    try {
      const response = await axios.put(
        URL_UPDATE_ANIMAL,
        localState,
        header(accessToken)
      );
      if (response.status >= 200 && response.status < 210) {
        alert("Animal editado correctamente.");
        // setLocalState({
        // })
        dispatch(animalActions.getAllAnimals(accessToken));
      }
    } catch (error) {
      console.log(`Error en el handleSubmitWithNoDispatch`, error);
      let errorMessage = error.message;
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      alert(`Hubo un error al intentar crear la nota. ${errorMessage}`);
    }
  }
//eslint-disable-next-line
  function handleSubmit(e) {
    console.log(`handleSubmit invocado. localState: `, localState);
    e.preventDefault();
    //HACER JS VALIDATIONS...
    dispatch(animalActions.setUpdateAnimalToLoading());
    dispatch(animalActions.updateAnimal(localState, accessToken));
    setTimeout(() => {
      dispatch(animalActions.getAllAnimals(accessToken));
    }, 500);
  }

  // UPLOAD PHOTOS/IMAGES TO CLOUDINARY:
  const CLOUD_NAME = "imagenes";
  const UPLOAD_PRESET = "dpxrr2uyq";

  const upload = async (e) => {
    const img = e.target.files[0];
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", CLOUD_NAME);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${UPLOAD_PRESET}/image/upload`,
      { method: "POST", body: data }
    );
    const dataNew = await response.json();
    setLocalState({
      ...localState,
      [e.target.name]: dataNew.secure_url,
    });
    // reemplazar con un mensaje de éxito o la acción deseada
  };
  return (
    <div className="form-modal">
      <h2>Editar animal...</h2>
      <form action="" onSubmit={handleSubmitWithNoDispatch}>
        {/* <fieldset className="form-fieldset"> */}

        <div className="inside-form-container">
          <div className="form-id">
            <label htmlFor="id_senasa">Identificador SENASA *</label>
            <input
              type="text"
              name="id_senasa"
              placeholder="id de 16 caracteres"
              maxLength={16}
              onChange={handleOnChange}
              value={localState.id_senasa}
              disabled={true}
            />
          </div>
          <div className="form-type-of-animal">
            <label htmlFor="type_of_animal">Tipo de animal *</label>
            <input
              id="type_of_animal"
              type="text"
              name="type_of_animal"
              placeholder="Ej: Vaquillona / Novillo / Toro"
              onChange={handleOnChange}
              value={localState.type_of_animal}
            />
          </div>
          <div>
            <label htmlFor="breed_name">Raza</label>
            <input
              type="text"
              name="breed_name"
              id="breed_name"
              value={localState.breed_name}
              placeholder="Ej: Angus / Holstein / Criolla "
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="location">Localización</label>
            <input
              type="text"
              name="location"
              id="location"
              value={localState.location}
              placeholder="Ej: Lote 21 / Sección 3"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="birthday">Fecha de nacimiento </label>
            <input
              type="date"
              name="birthday"
              onChange={handleOnChange}
              value={localState.birthday}
            />
          </div>
          <div className="form-weight_kg">
            <label htmlFor="weight_kg">Peso</label>
            <input
              id="weight_kg"
              type="number"
              name="weight_kg"
              placeholder="kilogramos, sin comas"
              onChange={handleOnChange}
              value={localState.weight_kg}
            />
          </div>
          <div className="form-name">
            <label htmlFor="name">Nombre </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="nombre del animal"
              onChange={handleOnChange}
              value={localState.name}
            />
          </div>
          <div>
            <label htmlFor="device_type">Tipo de dispositivo * </label>
            <input
              id="device_type"
              type="text"
              name="device_type"
              onChange={handleOnChange}
              placeholder="Ej: Collar / Ear tag"
              value={localState.device_type}
            />
          </div>
          <div>
            <label htmlFor="device_number">Número de dispositivo * </label>
            <input
              id="device_number"
              type="text"
              name="device_number"
              onChange={handleOnChange}
              placeholder="código de 8 caracteres"
              value={localState.device_number}
              maxLength={8}
            />
          </div>
          <div>
            <label htmlFor="comments">Comentarios </label>
            <textarea
              id="comments"
              type="textarea"
              name="comments"
              onChange={handleOnChange}
              placeholder="comentarios"
              value={localState.comments}
              maxLength={3000}
            />
          </div>
          <div>
            <label htmlFor="photo">Imagen 1 </label>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="image_1"
              placeholder="Imagen"
              // value={localState.image_1}
              onChange={upload}
            ></input>
          </div>
          <div>
            <label htmlFor="photo">Imagen 2 </label>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="image_2"
              placeholder="Imagen"
              // value={localState.image_2}
              onChange={upload}
            ></input>
          </div>
          <div>
            <label htmlFor="photo">Imagen 3 </label>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="image_3"
              placeholder="Imagen"
              // value={localState.image_3}
              onChange={upload}
            ></input>
          </div>
          <div>
            <fieldset>
              <legend>Preñada </legend>
              <div>
                <input
                  type="radio"
                  id="is_pregant-no"
                  name="is_pregnant"
                  value={false}
                  onChange={handleOnChange}
                />
                <label htmlFor="is_pregnant">No </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="is_pregnant-sí"
                  name="is_pregnant"
                  value={true}
                  onChange={handleOnChange}
                />
                <label htmlFor="is_pregnant-sí">Sí</label>
              </div>
            </fieldset>
          </div>
          <div>
            <label htmlFor="delivery_date">Fecha estimada de parto </label>
            <input
              type="date"
              name="delivery_date"
              id="delivery_date"
              value={localState.delivery_date}
              onChange={handleOnChange}
            />
          </div>
          <button>Confirmar</button>
          <button onClick={props.closeModal}>X</button>
        </div>
        {/* </fieldset> */}
      </form>
    </div>
  );
}

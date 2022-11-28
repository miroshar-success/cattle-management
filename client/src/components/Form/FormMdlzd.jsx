import React from "react";
import axios from "axios";
import { URL_UPDATE_ANIMAL, URL_POST_ANIMAL } from "../../constants/urls";
import { useDispatch, useSelector } from "react-redux";
import * as animalActions from "../../redux/features/animals";
import { helperParseDateForInput } from "../../constants/parseDateFn";

import InputForm from "./InputForm";
import { header } from "../../constants/token";

// import loadingGIF from "../assets";

export function FormMdlzd({ closeModal, animal }) {
  const [localState, setLocalState] = React.useState({
    id_senasa: animal?.id_senasa || "",
    type_of_animal: animal?.type_of_animal || "",
    breed_name: animal?.breed_name || "",
    sex: animal?.sex || "",
    location: animal?.location || "",
    weight_kg: animal?.weight_kg || "",
    name: animal?.name || "",
    device_type: animal?.device_type || "",
    device_number: animal?.device_number || "",
    images: animal?.images || [],
    image_1: animal?.image_1 || "",
    image_2: animal?.image_2 || "",
    image_3: animal?.image_3 || "",
    comments: animal?.comments || "",
    birthday: helperParseDateForInput(animal?.birthday),
    is_pregnant: animal?.is_pregnant || "",
    delivery_date: helperParseDateForInput(animal?.delivery_date),
  });

  // Transforma el formato que viene de la data base ("2022-11-01T03:00:00.000Z") a "2022-11-01".

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(animalActions.getTypesOfAnimalsAllowed());
  }, [dispatch]);

  const typesOfAnimalsState = useSelector(
    (state) => state.animals.typesOfAnimals
  );
  const accessToken = localStorage.getItem("tokenCattleTracker");
  const sexsArray = ["hembra", "macho"];

  // HANDLE FUNCTIONS:
  function handleOnChange(e) {
    console.log(e.target.name, e.target.value);
    setLocalState({ ...localState, [e.target.name]: e.target.value });
    console.log("EVENTO = ", e);
  }

  function handlePregnantRadioChange(e) {
    console.log(e.target.name, e.target.value);
    if (
      e.target.name === "is_pregnant" &&
      (e.target.value === "false" || !e.target.value)
    ) {
      console.log(
        `El target value es falso y el target name es 'is_pregnant'. Seteando delivery_date a "" `
      );

      setLocalState({
        ...localState,
        is_pregnant: false,
        delivery_date: "",
      });
      // EL SETEO DE DELIVERY_DATE A "" NO FUNCIONA! NO ENCONTRÉ FORMA DE PODER HACERLO ANDAR AL SETEO A "" / null CUANDO NO ESTÁ PREGNANT
    } else {
      setLocalState({ ...localState, [e.target.name]: e.target.value });
    }
  }

  // ADAPTAR FUNCIONES DEPENDIENDO SI RECIBE UN ANIMAL POR PROPS (EDICIÓN) O NO ( CREAR NUEVO ANIMAL):
  let formAdaptativeTitle = "";
  let formAdaptativeSubmitButton = "";
  let handleSubmit; // Esta variable va a tomar el valor de una de dos funciones... para crear nuevo animal o para editar animal.

  if (!animal) {
    console.log(
      `No se detectó un animal por props. Se asume que es formulario para creación de nuevo animal...`
    );
    formAdaptativeTitle = "Nuevo animal";
    formAdaptativeSubmitButton = "Registrar animal";

    async function handleSubmitNewAnimalWithNoDispatch(e) {
      e.preventDefault();
      console.log(
        `handleSubmitNewAnimalWithNoDispatch invocado. localState: `,
        localState
      );
      //HACER JS VALIDATIONS...
      try {
        const response = await axios.post(
          URL_POST_ANIMAL,
          localState,
          header(accessToken)
        );
        if (response.status >= 200 && response.status < 210) {
          alert(`Animal con ID ${localState?.id_senasa} creado exitosamente.`);
          // setLocalState({
          // })
          dispatch(animalActions.getAllAnimals(accessToken));
        }
      } catch (error) {
        console.log(`Error en el handleSubmitNewAnimalWithNoDispatch`, error);
        let errorMessage = error.message;
        if (error.response?.data?.error) {
          errorMessage = error.response.data.error;
        }
        alert(`Hubo un error al intentar registrar el animal. ${errorMessage}`);
      }
    }
    handleSubmit = handleSubmitNewAnimalWithNoDispatch;
    // function handleSubmitNewAnimal(e) {
    //   console.log(`handleSubmitNewAnimal invocado. localState: `, localState);
    //   e.preventDefault();
    //   //HACER JS VALIDATIONS...
    //   dispatch(animalActions.setNewAnimalToLoading());
    //   dispatch(animalActions.createNewAnimal(localState, accessToken));
    //   setTimeout(() => {
    //     dispatch(animalActions.getAllAnimals(accessToken));
    //   }, 500);
    // }
    // handleSubmit = handleSubmitNewAnimal;
  } else {
    if (animal) {
      console.log(
        `Se detectó un animal por props. Se asume que es un formulario para edición...`
      );
      formAdaptativeTitle = "Editar animal";
      formAdaptativeSubmitButton = "Guardar";
      // function handleSubmitEditAnimal(e) {
      //   console.log(`handleSubmit invocado. localState: `, localState);
      //   e.preventDefault();
      //   //HACER JS VALIDATIONS...
      //   dispatch(animalActions.setUpdateAnimalToLoading());
      //   dispatch(animalActions.updateAnimal(localState, accessToken));
      //   setTimeout(() => {
      //     dispatch(animalActions.getAllAnimals(accessToken));
      //   }, 500);
      // }
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
          alert(
            `Hubo un error al intentar editar el registro. ${errorMessage}`
          );
        }
      }
      handleSubmit = handleSubmitWithNoDispatch;
    }
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
    //! Meto al arreglo PROVISORIOOO DE PRUEBA!!!:
    setLocalState({
      ...localState,
      images: [...localState.images, dataNew.secure_url],
    });
    //!----
    // setLocalState({
    //   ...localState,
    //   [e.target.name]: dataNew.secure_url,
    // });
    // reemplazar con un mensaje de éxito o la acción deseada
    console.log("Imagen cargada correctamente.");
  };

  return (
    // <div className="w-full z-50 bg-white absolute inset-0 px-3 py-5  my-3 drop-shadow-lg h-fit max-w-xl mx-auto ">
    // <div className={classNameAdaptable}>
    <div className="overflow-auto">
      <h2 className="text-green font-sans text-xl">{formAdaptativeTitle}</h2>
      <form action="" onSubmit={handleSubmit}>
        <div className="inside-form-container">
          <div className="flex items-center gap-3 mb-3 w-full">
            <label
              htmlFor="id_senasa"
              className="text-gray font-semibold w-[120px] md:w-[130px] text-sm after:content-['*'] after:ml-0.5 after:text-red-500"
            >
              Identificador SENASA
            </label>
            <input
              className="bg-gray/10 border border-solid border-gray/10 rounded-sm px-3 py-1  w-full"
              type="text"
              name="id_senasa"
              placeholder="Id de 16 caracteres"
              id="id_senasa"
              maxLength={16}
              onChange={handleOnChange}
              value={localState.id_senasa}
              required={true}
              disabled={animal ? true : false}
            />
          </div>

          <legend className="text-gray font-semibold w-[120px] md:w-[130px] text-sm after:content-['*'] after:ml-0.5 after:text-red-500 ">
            Tipo de animal
          </legend>
          <div onChange={handleOnChange} className="mb-3">
            {Array.isArray(typesOfAnimalsState) && (
              <fieldset className="flex  gap-3 my-2 ">
                {" "}
                {typesOfAnimalsState?.map((type) =>
                  localState.type_of_animal === type ? (
                    <React.Fragment key={type}>
                      <input
                        type="radio"
                        id={type}
                        name="type_of_animal"
                        required={true}
                        value={type}
                        checked
                        className="checked:bg-green"
                        onChange={handleOnChange}
                      />
                      {type}
                    </React.Fragment>
                  ) : (
                    <React.Fragment key={type}>
                      <input
                        type="radio"
                        id={type}
                        name="type_of_animal"
                        required={true}
                        value={type}
                        className="checked:bg-green"
                        onChange={handleOnChange}
                      />
                      {type}
                    </React.Fragment>
                  )
                )}
              </fieldset>
            )}
          </div>
          <legend className="text-gray font-semibold w-[120px] md:w-[130px] text-sm after:content-['*'] after:ml-0.5 after:text-red-500 ">
            Sexo
          </legend>
          <div>
            <fieldset className="flex  gap-3 my-2 ">
              {sexsArray?.map((type) =>
                localState.sex === type ? (
                  <React.Fragment key={type}>
                    <input
                      type="radio"
                      id={type}
                      name="sex"
                      required={true}
                      value={type}
                      checked
                      className="checked:bg-green"
                      onChange={handleOnChange}
                    />
                    {type}
                  </React.Fragment>
                ) : (
                  <React.Fragment key={type}>
                    <input
                      type="radio"
                      id={type}
                      name="sex"
                      required={true}
                      value={type}
                      className="checked:bg-green"
                      onChange={handleOnChange}
                    />
                    {type}
                  </React.Fragment>
                )
              )}
            </fieldset>
          </div>

          <div className="flex items-center gap-3 mb-3 w-full">
            <label
              htmlFor="device_type"
              className="text-gray font-semibold w-[120px] md:w-[130px] text-sm after:content-['*'] after:ml-0.5 after:text-red-500"
            >
              Tipo de dispositivo
            </label>
            <input
              id="device_type"
              className="bg-gray/10 border border-solid border-gray/10 rounded-sm px-3 py-1  w-full"
              type="text"
              name="device_type"
              placeholder="Ej: Collar / Ear Tag "
              maxLength={35}
              onChange={handleOnChange}
              required={true}
              value={localState.device_type}
            />
          </div>
          <div className="flex items-center gap-3 mb-3 w-full">
            <label
              htmlFor="device_number"
              className="text-gray font-semibold w-[120px] md:w-[130px] text-sm after:content-['*'] after:ml-0.5 after:text-red-500"
            >
              Código de dispositivo
            </label>
            <input
              className="bg-gray/10 border border-solid border-gray/10 rounded-sm px-3 py-1  w-full"
              type="text"
              name="device_number"
              id="device_number"
              placeholder="Código de 8 caracteres"
              maxLength={8}
              onChange={handleOnChange}
              required={true}
              value={localState.device_number}
            />
          </div>
          <InputForm
            handleOnChange={handleOnChange}
            type="text"
            name="breed_name"
            text="Raza"
            placeholder="Ej: Angus / Holstein / Criolla "
            value={localState.breed_name}
          />
          <InputForm
            handleOnChange={handleOnChange}
            type="text"
            name="location"
            text="Localización"
            placeholder="Ej: Lote 21 / Sección 3"
            value={localState.location}
          />
          <InputForm
            handleOnChange={handleOnChange}
            type="date"
            name="birthday"
            text="Fecha de nacimiento"
            value={localState.birthday}
          />
          <InputForm
            handleOnChange={handleOnChange}
            type="number"
            name="weight_kg"
            text="Peso"
            placeholder="kilogramos, sin comas "
            value={localState.weight_kg}
          />
          <InputForm
            handleOnChange={handleOnChange}
            type="text"
            name="name"
            text="Nombre"
            placeholder="nombre del animal "
            value={localState.name}
          />

          <div className="flex flex-col  gap-3 mb-3 w-full my-5">
            <label
              htmlFor="comments"
              className="text-gray font-semibold w-[120px] md:w-[130px] text-sm "
            >
              Comentarios{" "}
            </label>
            <textarea
              id="comments"
              type="textarea"
              name="comments"
              onChange={handleOnChange}
              placeholder="comentarios"
              value={localState.comments}
              maxLength={3000}
              className="bg-gray/10 border border-solid border-gray/10 rounded-sm px-3 py-1  w-full"
            />
          </div>
          <InputForm
            handleOnChange={upload}
            type="file"
            name="image_1"
            text="Imagen 1"
            placeholder="Imagen"
            accept=".png, .jpg, .jpeg"
            // value={localState.image_1 || ""}
          />
          <InputForm
            handleOnChange={upload}
            type="file"
            name="image_2"
            text="Imagen 2"
            placeholder="Imagen"
            accept=".png, .jpg, .jpeg"
            // value={localState.image_2 || ""}
          />
          <InputForm
            handleOnChange={upload}
            type="file"
            name="image_3"
            text="Imagen 3"
            placeholder="Imagen"
            accept=".png, .jpg, .jpeg"
            // value={localState.image_3 || ""}
          />

          <div onChange={handleOnChange} className="my-3">
            <fieldset>
              <legend className="text-gray font-semibold w-[120px] md:w-[130px] text-sm ">
                Preñada{" "}
              </legend>
              <div className="flex gap-3">
                <div>
                  {localState.is_pregnant === "true" ||
                  localState.is_pregnant === true ? (
                    <div className="flex gap-3">
                      <div>
                        <input
                          type="radio"
                          id="is_pregnant-sí"
                          name="is_pregnant"
                          value="true"
                          onChange={handlePregnantRadioChange}
                          checked
                        />
                        <label htmlFor="is_pregnant-sí">Sí</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="is_pregnant-no"
                          name="is_pregnant"
                          value="false"
                          onChange={handlePregnantRadioChange}
                        />
                        <label htmlFor="is_pregnant-no">No</label>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <div>
                        <input
                          type="radio"
                          id="is_pregnant-sí"
                          name="is_pregnant"
                          value="true"
                          onChange={handlePregnantRadioChange}
                        />
                        <label htmlFor="is_pregnant-sí">Sí</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="is_pregnant-no"
                          name="is_pregnant"
                          value="false"
                          onChange={handlePregnantRadioChange}
                          checked
                        />
                        <label htmlFor="is_pregnant-no">No</label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </fieldset>
          </div>
          {localState.is_pregnant === "true" ? (
            <InputForm
              handleOnChange={handleOnChange}
              type="date"
              name="delivery_date"
              text="Fecha estimada de parto"
            />
          ) : null}
          <div className="flex items-center gap-5 justify-center w-full my-5">
            <button className=" border border-solid border-transparent bg-green px-3 py-1 rounded-sm text-white hover:bg-white hover:text-green hover:border-green transition-all ease-in-out duration-500">
              {formAdaptativeSubmitButton}
            </button>
            <button
              onClick={closeModal}
              className=" bg-white border border-solid border-green px-3 py-1 rounded-sm text-green hover:bg-green hover:text-white hover:border-green transition-all ease-in-out duration-500"
            >
              Cerrar
            </button>
          </div>
        </div>
        {/* </fieldset> */}
      </form>
    </div>
  );
}

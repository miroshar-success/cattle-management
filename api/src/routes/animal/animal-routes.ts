import jwtCheck from "../../config/jwtMiddleware";
import { Router } from "express";
import {
  handleDeleteAnimalById,
  handleGetAllAnimalsFromUserRequest,
  handleGetAnimalByIdRequest,
  handleGetPregnantSortedRequest,
  handleGetStatsRequest,
  handleGetTypesAllowedRequest,
  handlePostNewAnimalRequest,
  handleSearchByQueryRequest,
  handleUpdateAnimalRequest,
} from "./animal-r-middlewares";

const router = Router();

// ------- RUTAS MONGO MONGOOSE : ---------

router.post("/", jwtCheck, handlePostNewAnimalRequest);
router.get("/stats", jwtCheck, handleGetStatsRequest);
router.get("/", jwtCheck, handleGetAllAnimalsFromUserRequest);
router.delete("/delete/:id_senasa", jwtCheck, handleDeleteAnimalById);
router.get("/id/:id_senasa", jwtCheck, handleGetAnimalByIdRequest);
router.put("/", jwtCheck, handleUpdateAnimalRequest);
router.get("/typesAllowed", handleGetTypesAllowedRequest);
router.get("/search", jwtCheck, handleSearchByQueryRequest);
router.get("/pregnant", jwtCheck, handleGetPregnantSortedRequest);

export default router;

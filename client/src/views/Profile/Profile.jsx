import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavBar } from "../../components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../redux/features/user";
import { useNavigate } from "react-router-dom";
import { NoteComponent } from "../../components/Note/NoteComponent";

export const Profile = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfoState = useSelector((state) => state.user.userInfo);
  const token = localStorage.getItem("tokenCattleTracker");

  React.useEffect(() => {
    dispatch(getUserInfo(token));
  }, [dispatch, token]);

  function handleGoToLogin(e) {
    console.log(`handleGoToLogin disparada. Navegando a "/"...`);
    navigate("/");
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <NavBar />
      <div className="w-full mx-auto max-w-7xl px-8 mt-16 md:mt-5">
        {isAuthenticated && (
          <div className="px-0 mt-12 font-sans text-gray">
            <h1 className="text-green text-3xl font-semibold my-3">
              Mi perfíl
            </h1>
            <div>
              <img
                src={
                  "https://thumbs.dreamstime.com/t/farmer-icon-badge-style-one-farm-collection-icon-can-be-used-ui-ux-farmer-icon-badge-style-one-farm-collection-124009969.jpg"
                }
                alt="Profile"
              />
              <div className="flex items-center gap-3">
                <p className="text-gray font-semibold">Nombre</p>
                <h2>{userInfoState?.name}</h2>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-gray font-semibold">Email</p>
                <p>{userInfoState?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-gray font-semibold">User Id </p>
              <p>{userInfoState?._id}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-gray font-semibold">Animales registrados </p>
              <p>{userInfoState?.animalsPop?.length}</p>
            </div>
          </div>
        )}
        <NoteComponent />
        {!isLoading && !isAuthenticated ? (
          <div>
            <div>Debes loguearte para ver tu perfíl.</div>
            <div>
              <button onClick={handleGoToLogin}>Loguearme</button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NoteAcciones } from "./NoteAcciones";
import { Pagination } from "../Pagination/Pagination";

export function PropsNotes({ notes }) {
  const [page, setPage] = useState(1);
  const showPerPage = 4;
  const lastOnPage = page * showPerPage;
  const firstOnPage = lastOnPage - showPerPage;
  const currentNotes = notes.slice(firstOnPage, lastOnPage);

  const notesState = useSelector((state) => state.notes.notes?.allNotes);

  React.useEffect(() => {
    console.log("PropsNotes useEffect");
  }, [notesState]);

  function pagination(pageNumber) {
    setPage(pageNumber);
  }
  return (
    <div className=" bg-white rounded-md w-full  ">
      <div className="  overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 w-fit border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Título
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Comentario
                </th>

                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tema
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Importancia
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fecha de creación
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Última fecha de edición
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="text-gray">
              {currentNotes?.map((note) => (
                <tr key={Math.random()} className="text-left">
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap capitalize">
                      {note?.title}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <p className="text-gray-900 whitespace-no-wrap capitalize">
                        {note?.comment}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap capitalize">
                      {note?.theme}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap capitalize">
                      {note?.importance}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap capitalize">
                      {note?.createdAt}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap capitalize">
                      {note?.updatedAt}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="text-gray-900 whitespace-no-wrap capitalize">
                      <NoteAcciones note={note} />
                    </div>
                  </td>
                </tr>
              ))}{" "}
            </tbody>
          </table>
          <Pagination
            animals={notes?.length}
            showPerPage={showPerPage}
            page={page}
            pagination={pagination}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
}

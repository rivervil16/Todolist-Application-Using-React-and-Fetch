import React, { useEffect, useState } from "react";

const Home = () => {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);

  const agregarTareas = (e) => {
    e.preventDefault();
    putItem([...list, { label: item, done: false }]);
    setItem("");
  };

  useEffect(() => {
    getList();
  }, []);

  const addItem = (e) => {
    setItem(e.target.value);
  };

  const deleteItem = (indice) => {
    let listDeleted = list.filter((itemTarea, posicion) => posicion !== indice);
    putItem(listDeleted);
  };

  const getList = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/agustin")
      .then((response) => response.json())
      .then((response) => setList(response))
      .catch((error) => console.log("error", error));
  };

  //enviar la tarea/item que se esta creando

  const putItem = (toDos) => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/agustin", {
      method: "PUT",
      body: JSON.stringify(toDos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => getList())
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="container">
      <div className="container">
        <h1 className="text-center">Todo List</h1>
      </div>
      <div className="col-4 mx-auto d-flex justify-content-between p-3">
        <div className="col-12">
          <form onSubmit={agregarTareas}>
            <div className="d-flex justify-content-center ">
              <div>
                <input
                  className="form-control"
                  placeholder="agrega tu tarea aqui"
                  type="text"
                  value={item}
                  onChange={addItem}
                />
              </div>
              <button type="submit" className="btn-sm btn-outline-secondary">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="col-4 mx-auto justify-content-between p-1 mb-2 bg-light text-dark border border-secondary rounded-3">
        <div>
          {list.map((element, indice) => (
            <div className="d-flex justify-content-between m-1" key={indice}>
              <p>{element.label}</p>
              <button
                className="btn btn-secondary"
                onClick={() => deleteItem(indice)}
              >
                Borrar
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h5 className="text-center">Tareas Pendientes {list.length}</h5>
      </div>
    </div>
  );
};

export default Home;

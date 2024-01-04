import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

const Get = () => {
  const [data, setData] = useState([]);
  const [task, setTask] = useState("");
  const comletion = document.getElementById("options");
  const [showUpdate, setShowUPdate] = useState(false);
  useEffect(() => {
    const getData = async () => {
      axios.get("http://localhost:4000/all").then((res) => setData(res.data));
    };
    getData();
  }, []);
  const updateAndINsert = (e) => {
    const id = localStorage.getItem("id");
    if (id) {
      axios
        .patch(`http://localhost:4000/update/${id}`, {
          Status: comletion.value,
        })
        .then(toast.success("Task Updated Successfully!"));
        console.log(comletion.value);
        } else {
      axios
        .post("http://localhost:4000/create", {
          Task: task,
          Status: comletion.value,
        })
        .then(toast.success("Task Created Successfully!"));
    }
  };
  return (
    <div className="main-wrap">
      {showUpdate == true ? (
        <>
          <form action="">
            <input
              type="text"
              placeholder="Enter Task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <select name="" id="options">
              <option value="true">Complete</option>
              <option value="false">Incomplete</option>
            </select>
            <button onClick={updateAndINsert}>Submit</button>
          </form>
        </>
      ) : (
        <>
          {data.map((item) => {
            return (
              <div className="main" key={item._id}>
                <p>{item.Task}</p>
                <p>
                  {item.Status == true ? (
                    <img src="./success.png" alt="" />
                  ) : (
                    <img src="./cancel.png" alt="" />
                  )}
                </p>
                <div className="buttons" style={{ width: "100px" }}>
                  <img
                    src="./updated.png"
                    alt=""
                    title="Update"
                    onClick={function () {
                      localStorage.setItem("id", item._id);
                      localStorage.setItem("value" , task)
                      setTask(localStorage.getItem("value"))
                      setShowUPdate(true);
                    }}
                  />
                  <img
                    src="./delete.png"
                    alt=""
                    title="Delete"
                    onClick={function () {
                      axios.delete(`http://localhost:4000/delete/${item._id}`);
                      window.location.reload();
                    }}
                  />
                </div>
              </div>
            );
          })}
          <button
            className="btn-create"
            onClick={function () {
              localStorage.removeItem("id");
              setShowUPdate(true)
            }}
          >
            Create Task
          </button>
        </>
      )}
    </div>
  );
};

export default Get;

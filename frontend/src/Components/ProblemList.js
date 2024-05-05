import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import yt from "../Asserts/yt.png";
import cn from "../Asserts/cn.jpeg";
import lc from "../Asserts/lc.png";
import axios from "axios";

const ProblemList = ({ problems }) => {
  const [todoStatus, setTodoStatus] = useState(
    Array(problems.length).fill(false)
  );
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const userData = jwtDecode(token);
        setUserId(userData.userId);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("token is empty");
    }
  }, [userId]);

  useEffect(() => {
    axios
      .get(`http://localhost:1000/progress/`)
      .then((response) => {
        const progressMap = {};
        response.data.progress.forEach((item) => {
          console.log("userId", item.userId);
          if (item.userId === userId) {
            progressMap[item.problemId] = item.completed;
          }
        });
        setTodoStatus(progressMap);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const handleToggleTodo = (e, problemId) => {
    if (e.target.checked) {
      console.log("checked");
      const updateStatus = { ...todoStatus, [problemId]: e.target.checked };
      setTodoStatus(updateStatus);

      axios
        .post("http://localhost:1000/progress/", {
          userId: userId,
          problemId: problemId,
          completed: e.target.checked,
        })
        .then((response) => {
          console.log("User progress created:", response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("not checked");
      const updateStatus = { ...todoStatus, [problemId]: e.target.checked };
      setTodoStatus(updateStatus);

      axios
        .delete(
          `http://localhost:1000/progress/?userId=${userId}&problemId=${problemId}`
        )
        .then((response) => {
          console.log("User progress deleted", response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Leetcode</th>
              <th>Coding Ninjas</th>
              <th>Video Help</th>
              <th>ToDo</th>
              {/* <th>Description</th> */}
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => (
              <tr key={problem.problemId}>
                <td>{problem.title}</td>
                <td>{problem.difficulty}</td>
                <td>
                  <a
                    href={problem.lc}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={lc}
                      alt="YouTube Logo"
                      width="21px"
                      height="18px"
                    />
                  </a>
                </td>
                <td>
                  <a
                    href={problem.cn}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={cn}
                      alt="YouTube Logo"
                      width="21px"
                      height="18px"
                    />
                  </a>
                </td>
                <td>
                  <div>
                    <img
                      src={yt}
                      alt="YouTube Logo"
                      width="21px"
                      height="18px"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(
                          `youtube-help/${encodeURIComponent(problem.title)}`
                        )
                      }
                    />
                  </div>
                </td>
                <td>
                  <div>
                    <input
                      type="checkbox"
                      checked={todoStatus[problem.problemId]}
                      onChange={(e) => handleToggleTodo(e, problem.problemId)}
                    />
                  </div>
                </td>
                {/* <td>{problem.description}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProblemList;

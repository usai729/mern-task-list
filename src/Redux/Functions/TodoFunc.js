const { createAsyncThunk } = require("@reduxjs/toolkit");

exports.newtodo = createAsyncThunk("todo/new", async (data, { getState }) => {
  try {
    const response_raw = await fetch("http://localhost:3001/todos/new", {
      body: JSON.stringify(data),
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": getState().user.token || localStorage.getItem("token"),
      },
    });

    const response = await response_raw.json();

    return response;
  } catch (e) {
    throw e;
  }
});

exports.getTodos = createAsyncThunk("todo/get", async (data, { getState }) => {
  const response_raw = await fetch("http://localhost:3001/todos/all", {
    body: data,
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "auth-token": getState().user.token || localStorage.getItem("token"),
    },
  });

  const response = await response_raw.json();

  return response;
});

exports.updateTodo = createAsyncThunk(
  "todo/update",
  async (data, { getState }) => {
    try {
      const response_raw = await fetch(`http://localhost:3001/todos/update`, {
        body: JSON.stringify(data),
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "auth-token": getState().user.token || localStorage.getItem("token"),
        },
      });

      const contentType = response_raw.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const response = await response_raw.json();
        console.log(response);

        return response;
      } else {
        console.error("Non-JSON response received");

        return { error: "Non-JSON response received" };
      }
    } catch (e) {
      console.error("Fetch error:", e);

      throw e;
    }
  }
);

export const baseUrl = "http://localhost:5000/api";

export const postRequest = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    return { error: true, message: data?.message || "Something went wrong!" };
  }
};

export const getRequest = async (url) => {
  const response = await fetch(url);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    return { error: true, message: data?.message || "An error occurred!" };
  }
};

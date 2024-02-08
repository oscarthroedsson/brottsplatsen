const authCode = import.meta.env.VITE_API_AUTH;
const baseUrl = import.meta.env.VITE_BASE_URL;

export async function fetchApi(endpoint, method = undefined) {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      headers: {
        method: method || "GET",
        "x-api-key": authCode,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    return null;
  }
}

//Needs to take in the specific function you want to use
export async function fetchSumUpEndPoint(func) {
  console.log("func:", func);
  try {
    const response = await fetch(`${baseUrl}/sumUp/${func}`, {
      headers: {
        "x-api-key": authCode,
      },
    });
    const data = await response.json();
    if (data) {
      return data;
    } else {
      return "error";
    }
  } catch (err) {
    return null;
  }
}

const baseUrl = import.meta.env.VITE_API_AUTH;
const authCode = import.meta.env.VITE_BASE_URL;

export async function fetchApiEndbpoint(endpoint) {
  try {
    const response = await fetch(`${baseUrl}/api/${endpoint}`, {
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
    throw Error();
  }
}

//Needs to take in the specific function you want to use
export async function fetchSumUpEndPoint(func) {
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
    throw Error();
  }
}

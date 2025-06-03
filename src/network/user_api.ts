interface signUpData {
  email: string;
  username: string;
  password: string;
}

interface signUpAPIResponseBody {
  message: string;
}

export async function signUp(data: signUpData): Promise<{
  status: number;
  message: string;
}> {
  const response = await fetch("http://localhost:9000/create/user", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseStatusCode = response.status;
  const responseJson: signUpAPIResponseBody = await response.json();
  return {
    status: responseStatusCode,
    message: responseJson.message,
  };
}

interface loginData {
  username: string;
  password: string;
}

interface loginAPIResponseData {
  username: string;
  email: string;
}

interface loginAPIResponseBody {
  message: string;
  data: loginAPIResponseData;
}

export async function login(data: loginData): Promise<{
  status: number;
  message: string;
  data: loginAPIResponseData;
}> {
  const response = await fetch("http://localhost:9000/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", //Wajib untuk terima/kirim cookie
  });
  const responseStatusCode = response.status;
  const responseJson: loginAPIResponseBody = await response.json();
  return {
    status: responseStatusCode,
    message: responseJson.message,
    data: responseJson.data,
  };
}

export async function logout(): Promise<boolean> {
  const response = await fetch("http://localhost:9000/logout", {
    method: "POST",
    credentials: "include", //Wajib untuk terima/kirim cookie
  });
  return response.ok;
}

export async function deleteUser(): Promise<boolean> {
  const response = await fetch("http://localhost:9000/delete/user", {
    method: "DELETE",
    credentials: "include", //Wajib untuk terima/kirim cookie
  });
  return response.ok;
}

export async function getUser(): Promise<loginAPIResponseData | null> {
  const response = await fetch("http://localhost:9000/user", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) return null;

  const responseJson: loginAPIResponseBody = await response.json();

  return {
    username: responseJson.data.username,
    email: responseJson.data.email,
  };
}

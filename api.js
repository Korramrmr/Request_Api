export const apiUrl = "http://45.12.239.156:8081/api";
export const errorRequest = "Ошибка при выполнении запроса";
export const errorDetected = "Произошла ошибка: ";
export const projectNotFound = "Проект не найден";
export const token = localStorage.getItem("token");

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export default headers;

export function handleErrorResponse(response) {
  if (!response.ok) {
    throw new Error(errorRequest);
  }
  return response.json();
}

export function addClickListener(elementId, callback) {
  document.getElementById(elementId).addEventListener("click", callback);
}

export async function login() {
  try {
    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        login: "chernienko.k",
        password: "jc63fk",
      }),
    });
    const data = await handleErrorResponse(response);
    console.log("Успешная регистрация");
    localStorage.setItem("token", data.token);
  } catch (error) {
    console.log(errorDetected, error);
  }
}
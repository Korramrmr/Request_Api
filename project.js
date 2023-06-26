import { apiUrl, errorRequest, token, errorDetected, projectNotFound } from "./api.js";
import headers from "./api.js";

import { addClickListener } from "./api.js";


// XML
export function createXMLPostRequest({ name, code }) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${apiUrl}/projects`);
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.onload = () => {
        try {
            if (xhr.status >= 400) {
                throw new Error(errorRequest);
            } else {
                console.log(xhr.response);
                localStorage.setItem("projectId", xhr.response._id);
            }
        } catch (error) {
            console.log(errorDetected, error);
        }
    };
    xhr.send(JSON.stringify({ name, code }));
}

addClickListener('createProjectXML', () => {
    createXMLPostRequest({
        name: 'name project',
        code: 'code project',
    });
});

export function getXMLProjectById(id) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${apiUrl}/projects/${id}`);
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.onload = () => {
        if (xhr.status === 200) {
            console.log(xhr.response);
        } else if (xhr.status === 404) {
            throw new Error(projectNotFound);
        } else {
            throw new Error(errorRequest);
        }
    };
    xhr.send();
}

addClickListener('getProjectXML', () => {
    getXMLProjectById(localStorage.getItem('projectId'));
});

export function editXMLProject({ id, name }) {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `${apiUrl}/projects/`);
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.onload = () => {
        try {
            if (xhr.status >= 400) {
                throw new Error(errorRequest);
            } else {
                console.log(xhr.response);
            }
        } catch (error) {
            console.log(errorDetected, error);
        }
    };
    xhr.send(
        JSON.stringify({
            _id: id,
            name,
        })
    );
}

addClickListener('editProjectXML', () => {
    editXMLProject({
        id: localStorage.getItem('projectId'),
        name: 'new update name project',
    });
});

export function deleteXMLProjectById(id) {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `${apiUrl}/projects/${id}`);
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.onload = () => {
        if (xhr.status >= 400) {
            console.log(errorDetected, xhr.response);
        } else {
            console.log(xhr.response);
            localStorage.removeItem("projectId");
            localStorage.removeItem("taskId");
        }
    };
    xhr.send();
}

addClickListener('deleteProjectXML', () => {
    deleteXMLProjectById(localStorage.getItem('projectId'));
});

// FETCH
export function createFetchProject({ name, code }) {
    fetch(`${apiUrl}/projects`, {
        method: "POST",
        headers,
        body: JSON.stringify({ name, code }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(errorRequest);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            localStorage.setItem("projectId", data._id);
        })
        .catch((error) => console.log(errorDetected, error));
}

addClickListener("createProjectFetch", () => {
    createFetchProject({
        name: "name project",
        code: "code project",
    });
});

export function getFetchProjectById(id) {
    fetch(`${apiUrl}/projects/${id}`, {
        method: "GET",
        headers,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(errorRequest);
            }
            return response.json();
        })
        .then((data) => console.log(data))
        .catch((error) => console.log(errorDetected, error));
}

addClickListener("getProjectFetch", () => {
    getFetchProjectById(localStorage.getItem("projectId"));
});

export function editFetchProject({ id, name }) {
    fetch(`${apiUrl}/projects/`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ 
            _id: id,
            name, 
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(errorRequest);
            }
            return response.json();
        })
        .then((data) => console.log(data))
        .catch((error) => console.log(errorDetected, error));
}


addClickListener("editProjectFetch", () => {
    editFetchProject({
        id: localStorage.getItem("projectId"),
        name: "update name",
    });
});

export function deleteFetchProjectById(id) {
    fetch(`${apiUrl}/projects/${id}`, {
        method: "DELETE",
        headers,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(errorRequest);
            }
            return response.json();
        })
        .then((response) => {
            console.log(response);
            localStorage.removeItem("projectId");
            localStorage.removeItem("taskId");
        })
        .catch((error) => console.log(errorDetected, error));
}

addClickListener("deleteProjectFetch", () => {
    deleteFetchProjectById(localStorage.getItem("projectId"));
});

//AXIOS
export function createAxiosProject({ name, code }) {
    axios
        .post(
            `${apiUrl}/projects`,
            { name, code },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then((response) => {
            console.log(response);
            localStorage.setItem("projectId", response.data._id);
        })
        .catch((error) => console.log(errorDetected, error));
}

addClickListener("createProjectAxios", () => {
    createAxiosProject({
        name: "name project axios",
        code: "code project axios",
    });
});

export function getAxiosProjectById(id) {
    axios
        .get(`${apiUrl}/projects/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(errorDetected, error));
}

addClickListener("getProjectAxios", () => {
    getAxiosProjectById(localStorage.getItem("projectId"));
});

export function editAxiosProject({ id, name }) {
    axios
        .put(
            `${apiUrl}/projects`,
            { _id: id, name },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then((response) => {
            console.log(response);
        })
        .catch((error) => console.log(errorDetected, error));
}
addClickListener("editProjectAxios", () => {
    editAxiosProject({
        id: localStorage.getItem("projectId"),
        name: "update name project axios",
    });
});

export function deleteAxiosProjectById(id) {
    axios
        .delete(`${apiUrl}/projects/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log(response);
            localStorage.removeItem("projectId");
            localStorage.removeItem("taskId");
        })
        .catch((error) => console.log("er", error));
}

addClickListener("deleteProjectAxios", () => {
    deleteAxiosProjectById(localStorage.getItem("projectId"));
});
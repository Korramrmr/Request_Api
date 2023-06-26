import { apiUrl, errorRequest, token, errorDetected } from "./api.js";
import headers from "./api.js";

import { addClickListener } from "./api.js";
export function createXMLTask({ name, description, projectId }) {
    try {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${apiUrl}/tasks`);
        xhr.responseType = "json";
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("authorization", `Bearer ${token}`);
        xhr.onload = () => {
            if (xhr.status >= 400) {
                throw new Error(errorRequest);
            } else {
                console.log(xhr.response);
                localStorage.setItem("taskId", xhr.response._id);
            }
        };
        xhr.send(JSON.stringify({ name, description, projectId }));
    } catch (error) {
        console.log(errorDetected, error);
    }
}

addClickListener("createTaskXML", () => {
    createXMLTask({
        name: "name task",
        description: "description task",
        projectId: localStorage.getItem("projectId"),
    });
});

export function getXMLTaskById(id) {
    try {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `${apiUrl}/tasks/${id}`);
        xhr.responseType = "json";
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("authorization", `Bearer ${token}`);
        xhr.onload = () => {
            if (xhr.status >= 400) {
                throw new Error(errorRequest);
            } else {
                console.log(xhr.response);
            }
        };
        xhr.send();
    } catch (error) {
        console.log(errorDetected, error);
    }
}

addClickListener("getTaskXML", () => {
    getXMLTaskById(localStorage.getItem("taskId"));
});

export function editXMLTask({ id, name, description }) {
    try {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", `${apiUrl}/tasks`);
        xhr.responseType = "json";
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("authorization", `Bearer ${token}`);
        xhr.onload = () => {
            if (xhr.status >= 400) {
                throw new Error(errorRequest);
            } else {
                console.log(xhr.response);
            }
        };
        xhr.send(
            JSON.stringify({
                _id: id,
                name,
                description,
            })
        );
    } catch (error) {
        console.log(errorDetected, error);
    }
}

addClickListener("editTaskXML", () => {
    editXMLTask({
        id: localStorage.getItem("taskId"),
        name: "name task",
        description: "description task",
    });
});

addClickListener("deleteTaskXML", () => {
    deleteXMLTaskById(localStorage.getItem("taskId"));
});

export function deleteXMLTaskById(id) {
    try {
        const xhr = new XMLHttpRequest();
        xhr.open("DELETE", `${apiUrl}/tasks/${id}`);
        xhr.responseType = "json";
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("authorization", `Bearer ${token}`);
        xhr.onload = () => {
            if (xhr.status >= 400) {
                console.log(errorDetected, xhr.response);
                localStorage.removeItem("taskId");
            } else {
                console.log(xhr.response);
            }
        };
        xhr.send();
    } catch (error) {
        console.log(errorDetected, error);
    }
}

// FETCH
export function createFetchTask({ name, description, projectId }) {
    fetch(`${apiUrl}/tasks`, {
        method: "POST",
        headers,
        body: JSON.stringify({ name, description, projectId }),
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            localStorage.setItem("taskId", data._id);
        })
        .catch((error) => console.log(errorDetected, error));
}

addClickListener("createTaskFetch", () => {
    createFetchTask({
        name: "name task",
        description: "description task",
        projectId: localStorage.getItem("projectId"),
    });
});

export function getFetchTaskById(id) {
    fetch(`${apiUrl}/tasks/${id}`, {
        method: "GET",
        headers,
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => console.log(data))
        .catch((error) => console.log(errorDetected, error));
}
addClickListener("getTaskFetch", () => {
    getFetchTaskById(localStorage.getItem("taskId"));
});

export function editFetchTask({ id, name }) {
    fetch(`${apiUrl}/tasks`, {
        method: "PUT",
        headers,
        body: JSON.stringify({
            _id: id,
            name,
        }),
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => console.log(data))
        .catch((error) => console.log(errorDetected, error));
}

addClickListener("editTaskFetch", () => {
    editFetchTask({
        id: localStorage.getItem("taskId"),
        name: "name task",
        description: "description task",
    });
});

export function deleteFetchTaskById(id) {
    fetch(`${apiUrl}/tasks/${id}`, {
        method: "DELETE",
        headers,
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            console.log(response);
            localStorage.removeItem("taskId");
        })
        .catch((error) => console.log(errorDetected, error));
}

addClickListener("deleteTaskFetch", () => {
    deleteFetchTaskById(localStorage.getItem("taskId"));
});

// AXIOS  
export function createAxiosTask({ name, description, projectId }) {
    axios
        .post(
            `${apiUrl}/tasks`,
            { name, description, projectId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then((response) => {
            console.log(response);
            localStorage.setItem("taskId", response.data._id);
        })
        .catch((error) => console.log(errorDetected, error));
}

addClickListener('createTaskAxios', () => {
    createAxiosTask({
        name: 'name task axios',
        description: 'description task axios',
        projectId: localStorage.getItem('projectId'),
    });
});

export function getAxiosTaskById(id) {
    axios
        .get(`${apiUrl}/tasks/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(errorDetected, error));
}

addClickListener('getTaskAxios', () => {
    getAxiosTaskById(localStorage.getItem('taskId'));
});

export function editAxiosTask({ id, name }) {
    axios
        .put(
            `${apiUrl}/tasks`,
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

addClickListener('editTaskAxios', () => {
    editAxiosTask({
        id: localStorage.getItem('taskId'),
        name: 'update name task axios',
        description: 'update description task axios',
    });
});

export function deleteAxiosTaskById(id) {
    axios
        .delete(`${apiUrl}/tasks/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log(response);
            localStorage.removeItem("taskId");
        })
        .catch((error) => console.log(errorDetected, error));
}

addClickListener('deleteTaskAxios', () => {
    deleteAxiosTaskById(localStorage.getItem('taskId'));
});

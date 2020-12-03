import config from '../config';

const ROUTES = {
    projects: '/projects',
    project: '/projects/:id',
    variables: '/projects/:id/variables',
    environments: '/projects/:id/environments',
    variable: '/projects/:id/variables/:key',
}

const makeRequest = async (url, method = 'GET', body = null) => {
    let request = {
        headers: {
            'PRIVATE-TOKEN': config.apiToken,
        },
        method,
    };
    if (['head', 'get'].includes(method.toLowerCase()) === false
        && body !== null) {
            const fd = new FormData();
            for (const [key, value] of Object.entries(body)) {
                fd.set(key, value);
            }
            request.body = fd;
    }
    return await fetch(url, request);
}

export const getProjects = async (page = 1) => {
    const url = new URL(`${config.apiUrl}${ROUTES.projects}`);
    url.searchParams.set('order_by', 'id');
    url.searchParams.set('sort', 'asc');
    url.searchParams.set('per_page', 50);
    url.searchParams.set('page', page);

    const response = await makeRequest(url);
    if (!response.ok) {
        throw new Error('Unable to get projects list');
    }
    const json = await response.json();
    // const next = response.headers.get('Link');
    // return {
    //     projects: json,
    //     nextPageLink: next,
    // };
    // TODO: return more verbose info aobut page
    return json;
}

export const getProject = async (projectId) => {
    const idRoute = ROUTES.project.replace(':id', projectId);
    const url = `${config.apiUrl}${idRoute}`;
    const response = await makeRequest(url);
    if (!response.ok) {
        throw new Error('Unable to get project');
    }
    const json = await response.json();
    return json;
}

export const getProjectScopes = async (projectId) => {
    const idRoute = ROUTES.environments.replace(':id', projectId);
    const url = `${config.apiUrl}${idRoute}?&per_page=1000`;
    const response = await makeRequest(url);
    if (!response.ok) {
        throw new Error('Unable to get variables list');
    }
    const json = await response.json();
    return json;
}

export const getProjectVariables = async (projectId) => {
    const idRoute = ROUTES.variables.replace(':id', projectId);
    const url = `${config.apiUrl}${idRoute}?per_page=1000`;
    const response = await makeRequest(url);
    if (!response.ok) {
        throw new Error('Unable to get variables list');
    }
    const json = await response.json();
    return json;
}

export const addScope = async (projectId, name) => {
    const idRoute = ROUTES.environments.replace(':id', projectId);
    const url = `${config.apiUrl}${idRoute}?name=${name}`
    const response = await makeRequest(url, 'POST');
    if (!response.ok) {
        throw new Error('Unable to create environment');
    }
    const json = await response.json();
    return json;
}

export const updateVariable = async (projectId, key, value) => {
    const varRoute = ROUTES.variable.replace(':id', projectId).replace(':key', key);
    const url = `${config.apiUrl}${varRoute}`
    const response = await makeRequest(url, 'PUT', {
        value,
    });

    const json = await response.json();
    return json;
}

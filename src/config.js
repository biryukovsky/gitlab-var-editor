const getVar = (name) => {
    const prefix = 'VUE_APP_';
    let envName = name;
    if (!name.startsWith(prefix)) {
        envName = `${prefix}${name}`;
    }
    return process.env[envName];
}

export default {
    apiUrl: getVar('GITLAB_API_URL'),
    apiToken: getVar('GITLAB_TOKEN'),
};

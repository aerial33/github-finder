const useFetch = (baseUrl) => {
  const hosts = {
    // eslint-disable-next-line
    clientId: process.env.REACT_APP_GITHUB_CLIENT_ID,
    // eslint-disable-next-line
    clientSecret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
  };
  const get = (url) => {
    return new Promise((resolve, reject) => {
      fetch(
        `${baseUrl}${url}&client_id=${hosts.clientId}&client_secret=${hosts.clientSecret}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (!data) {
            return reject(data);
          }
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  return { get };
};

export default useFetch;

// export function request(path, options = {}) {
//   const {
//     headers,
//     query = null,
//     method = 'GET',
//     body,
//     host = hosts.MAIN_SERVICE,
//     ...extraOpts
//   } = options;
//   assertPath(path);

const prod = false,
    dev = false,
    native = false;

const prodConfig = {
    enquire: 'http://192.168.33.4:8083'
};
const devConfig = {
    enquire: 'http://192.168.33.5:8080'
};
const nativeConfig = {
    enquire: 'http://192.168.33.8:8083/logistics',
    login: 'http://192.168.33.8:8083/logistics',
    router: 'http://192.168.33.8:8083/logistics',
    area: 'http://192.168.33.8:8083/logistics'
};
const onlyConfig = '';
// const onlyConfig = 'http://192.168.33.4:8083';

let defaultConfig = Object.assign({}, nativeConfig);

for (let arr in defaultConfig) {
    defaultConfig[arr] = onlyConfig;
}

export const HOST = (prod && prodConfig) || (dev && devConfig) || (native && nativeConfig) || defaultConfig;
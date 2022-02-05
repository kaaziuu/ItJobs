const cfg = require("../../config.json") as configType;

interface configType {
    serverUrl: string;
    howLongIsValidAccessToken: number;
}

const Config: configType = {
    serverUrl: "",
    howLongIsValidAccessToken: 0,
};

export const Setup = () => {
    Object.assign(Config, cfg);
};

export default Config;

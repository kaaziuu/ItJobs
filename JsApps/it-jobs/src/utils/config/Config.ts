const cfg = require("../../config.json") as configType;

interface configType {
    serverUrl: string;
}

const Config: configType = {
    serverUrl: "",
};

export const Setup = () => {
    Object.assign(Config, cfg);
};

export default Config;

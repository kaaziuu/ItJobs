const cfg = require("../../config.json") as configType;

interface configType {
    serverUrl: string;
    howManyDaysTokenIsValid: number;
}

const Config: configType = {
    serverUrl: "",
    howManyDaysTokenIsValid: 0,
};

export const Setup = () => {
    Object.assign(Config, cfg);
};

export default Config;

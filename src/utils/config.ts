import { Config } from "../types";
import config from "config";

export function getConfig<T>(setting: Config): T {
    return config.get<T>(setting);
 }
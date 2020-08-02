import { getRequest } from './index';

export const getPseudoPuzzle = async () => getRequest("/api/pseudocode/all");
export const getSbsPuzzle= async () => getRequest("/api/sbs/all");
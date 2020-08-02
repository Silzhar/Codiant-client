import { getRequest, putRequest } from './index';

export const getDashboard = async (myUserIdentifier) => getRequest("/api/dashboard/mydashboard/" + myUserIdentifier)
export const putPseudoDashboard = async (myUserIdentifier, body) => putRequest("/api/dashboard/pseudovalidate/"+myUserIdentifier, body)
export const putSbsDashboard = async (myUserIdentifier, body) => putRequest("/api/dashboard/sbsvalidate/"+myUserIdentifier, body)

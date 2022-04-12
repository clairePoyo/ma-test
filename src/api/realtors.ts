import axios, { AxiosPromise } from "axios";
import { API_BASE_URL } from "./constants";

type RequestParams = {
  page?: number;
  page_size?: number;
};

const getAllRealtors = (
  requestParams?: RequestParams
): AxiosPromise<Realtor[]> => {
  const params = requestParams || {};
  return axios.get(`${API_BASE_URL}/realtors/`, {
    params,
  });
};

const getOneRealtor = (realtorId: number): AxiosPromise<Realtor> => {
  return axios.get(`${API_BASE_URL}/realtors/${realtorId}`);
};

const RealtorsApi = {
  getAllRealtors,
  getOneRealtor,
};
export default RealtorsApi;

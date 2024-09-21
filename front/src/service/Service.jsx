import axios from "axios";
import { getToken } from "./auth/Auth";

const REST_API_BASE_URL = "http://localhost:8181";
const PROBLEM_PATH = "/api/problem";
const PUBLIC_PATH = "/api/public";
const ADMIN_PATH = "/api/admin";


axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    // Skip adding token for specific paths
    if (token && !config.url.includes("/api/login") && !config.url.includes("/api/login") && !config.url.includes("/api/all")) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export {REST_API_BASE_URL};

export const getProblemTemplateById = (id) => axios.get(REST_API_BASE_URL + PROBLEM_PATH + "/template/" + id);

export const getProblemById = (id) => axios.get(REST_API_BASE_URL + PROBLEM_PATH + "/" + id);

export const createProblem = (createProblemRequest) => axios.post(REST_API_BASE_URL + ADMIN_PATH + "/problem", createProblemRequest);

export const getAllProblems = (page, size) => axios.get(REST_API_BASE_URL + PUBLIC_PATH + "/all", { params: { page, size } });

export const submitCode = (submission) => axios.post(REST_API_BASE_URL + PROBLEM_PATH, submission);

export const login = (userRequest) => axios.put(REST_API_BASE_URL + PUBLIC_PATH + "/login", userRequest);

export const signup = (userRequest) => axios.post(REST_API_BASE_URL + PUBLIC_PATH + "/signup", userRequest);

export const loginWithGoogle = () => axios.get(REST_API_BASE_URL + "/oauth2/authorization/google");

export const getProblemSolvedProblemByUser = () => axios.get(REST_API_BASE_URL + PROBLEM_PATH + "/solved");

export const editProblem = (ProblemRequest) => axios.put(REST_API_BASE_URL + ADMIN_PATH + "/problem", ProblemRequest);

export const exchangeOneTimeToken = (token) => axios.post(REST_API_BASE_URL + PUBLIC_PATH + "/auth/oauth2/exchange", {token});


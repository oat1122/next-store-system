// API request/response contracts (front-end facing)

import type { Computer } from "./core";
import type { ComputerQuery, PageMeta, SortSpec } from "./filters";

export interface ListComputersRequest {
  query?: ComputerQuery;
  sort?: SortSpec | null;
  page?: number;     // 1-based
  pageSize?: number; // default from server if omitted
}

export interface ListComputersResponse {
  data: Computer[];
  meta: PageMeta;
}

export interface GetComputerResponse {
  data: Computer;
}

export interface CreateComputerRequest {
  data: Partial<Computer>; // validated server-side
}

export interface UpdateComputerRequest {
  id: string;
  data: Partial<Computer>;
}

export interface DeleteComputerRequest {
  id: string;
}

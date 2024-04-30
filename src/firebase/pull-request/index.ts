import { db } from '../config';

const collection = 'pull-request';

export interface UserModel {
  id: string;
  nick: string;
}

export interface PullRequestModel {
  link: string;
  description: string;
  status: 'Esperando o Review' | 'Esperando Modificações' | 'Aprovado';
}

export interface CreatePullRequestDTO {
  project: string;
  link: string;
  title: string;
}

export const pullRequest = {
  async create(data: CreatePullRequestDTO): Promise<void> {
    console.log({ data });
  },
};

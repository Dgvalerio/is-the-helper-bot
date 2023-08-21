import { db } from '../config';

const collection = 'projects';

export interface ProjectModel {
  name: string;
  key: string;
}

export const project = {
  async create(data: ProjectModel): Promise<void> {
    try {
      await db.collection(collection).add(data);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  },
  async read(): Promise<ProjectModel[]> {
    try {
      const querySnapshot = await db.collection(collection).get();

      console.log({ querySnapshot });

      const response: ProjectModel[] = [];

      querySnapshot.forEach((doc) => response.push(doc.data() as ProjectModel));

      return response;
    } catch (error) {
      console.error('Error adding document: ', error);

      return [];
    }
  },
};

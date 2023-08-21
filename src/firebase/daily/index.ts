import { formatISO } from 'date-fns';

import { db } from '../config';

const collection = 'daily';

export interface UserModel {
  id: string;
  nick: string;
}

export interface DailyModel {
  date: string;
  project: string;
  annotations: { user: UserModel; notes: string[] }[];
}

export interface CreateDailyDTO {
  projectKey: string;
  description: string;
  user: UserModel;
}

export const daily = {
  async create(data: CreateDailyDTO): Promise<DailyModel | undefined> {
    try {
      const date = formatISO(new Date()).split('T')[0];

      const documentReference = db.collection(collection).doc(date);
      const document = await documentReference.get();

      if (document.exists) {
        const { annotations } = document.data() as DailyModel;

        const newAnnotations = annotations.concat([
          { user: data.user, notes: [data.description] },
        ]);

        const aux: Map<string, DailyModel['annotations'][number]> = new Map<
          string,
          DailyModel['annotations'][number]
        >();

        newAnnotations.forEach((annotation) =>
          aux.set(annotation.user.id, {
            user: annotation.user,
            notes: annotation.notes.concat(
              aux.get(annotation.user.id)?.notes || []
            ),
          })
        );

        await documentReference.set({
          ...document.data(),
          annotations: Array.from(aux).map(
            ([, { user, notes }]): DailyModel['annotations'][number] => ({
              user,
              notes,
            })
          ),
        });
      } else {
        await documentReference.set({
          project: data.projectKey,
          annotations: [
            {
              user: JSON.parse(JSON.stringify(data.user)) as UserModel,
              notes: [data.description],
            },
          ],
        } as Omit<DailyModel, 'date'>);
      }

      const newDocument = await documentReference.get();

      return { date, ...newDocument.data() } as DailyModel;
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  },
  async readOne(date: string): Promise<DailyModel | undefined> {
    try {
      const documentReference = db.collection(collection).doc(date);
      const document = await documentReference.get();

      return { date, ...document.data() } as DailyModel;
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  },
};

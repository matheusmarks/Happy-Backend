import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import 'express-async-errors';
import * as Yup from 'yup';
import Orphanages from '../models/Orphanages';
import orphanageView from '../views/OrphanagesView';

export default {
  async show(request: Request, response: Response) {
    const { id } = request.params;
    const orphanageRepository = getRepository(Orphanages);
    const orphanage = await orphanageRepository.findOne(id, {
      relations: ['image'],
    });
    if (orphanage) {
      response.json(orphanageView.render(orphanage));
    }
  },
  async index(request: Request, response: Response) {
    const orphanageRepository = getRepository(Orphanages);
    const orphanages = await orphanageRepository.find({
      relations: ['image'],
    });
    return response.json(orphanageView.renderMany(orphanages));
  },
  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;

    const orphanageRepository = getRepository(Orphanages);

    const requestImages = request.files as Express.Multer.File[];

    const image = requestImages.map(item => {
      return { path: item.filename };
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      image,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        }),
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanage = orphanageRepository.create(data);

    await orphanageRepository.save(orphanage);

    return response.json(orphanage);
  },
};

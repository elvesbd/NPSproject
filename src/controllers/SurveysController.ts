import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import * as yup from 'yup';
import { AppError } from '../errors/ApError';

class SurveysController {
  async create(req: Request, res: Response) {
    const { title, description } = req.body;

    const schema = yup.object().shape({
      title: yup.string().required(),
      description: yup.string().required()
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      throw new AppError(err);
    };

    const surveysRepository = getCustomRepository(SurveysRepository);

    const survey = surveysRepository.create({
      title,
      description
    });
    await surveysRepository.save(survey);

    return res.status(201).json((survey));
  };

  async show(req: Request, res: Response) {
    const surveysRepository = getCustomRepository(SurveysRepository);
    const all = await surveysRepository.find();

    return res.json(all);
  }
};

export { SurveysController };
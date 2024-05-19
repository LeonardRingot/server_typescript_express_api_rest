import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user.models';

const userModel = new UserModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.create(req.body);
    res.json({
      status: 'success',
      data: { ...user },
      message: 'utilisateur est créer avec succès 🙂!',
    });
  } catch (error) {
    next(error);
  }
};

export const getMany = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.getMany();
    res.json({
      status: 'success',
      data: users,
      message: 'Utilisateur récupéré avec succès',
    });
  } catch (err) {
    next(err);
  }
};

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.getOne(req.params.id as unknown as string);
    res.json({
      status: 'success',
      data: user,
      message: 'Utilisateur récupéré avec succès',
    });
  } catch (err) {
    next(err);
  }
};

export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.updateOne(req.body);
    res.json({
      status: 'success',
      data: user,
      message: 'User update successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.deleteOne(req.params.id as unknown as string);
    res.json({
      status: 'success',
      data: user,
      message: 'Utilisateur supprimé avec succès',
    });
  } catch (error) {
    next(error);
  }
};

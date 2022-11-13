import { Router } from 'express';

export interface Controller {
  register(): Router;
}

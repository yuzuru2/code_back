/**
 * コアモジュール
 */
import * as Express from 'express';
import { check, validationResult } from 'express-validator';

/**
 * 定数
 */
import { constant } from 'src/constant';

import { db } from 'src';

export const v_create = [
  check('title').not().isEmpty().isLength({ min: 1, max: 15 }),
  check('genreId').not().isEmpty().isInt({ min: 0, max: 23 }),
  check('source').not().isEmpty().isLength({ min: 1, max: 2500 }),
];

interface i_create extends Express.Request {
  body: {
    genreId: number;
    title: string;
    source: string;
  };
}

export const create = async (req: i_create, res: Express.Response) => {
  try {
    if (!validationResult(req).isEmpty()) {
      res.sendStatus(500);
      return;
    }

    // ハッシュ生成用
    const _s = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    const _id =
      [...Array(30)]
        .map(() => _s[Math.floor(Math.random() * _s.length)])
        .join('') + new Date().getTime();

    await db.collection(constant.collection_codes).add({
      id: _id,
      genreId: Number(req.body.genreId),
      title: String(req.body.title),
      source: String(req.body.source),
      created_at: new Date(),
      updated_at: new Date(),
    });

    res.send({ q: _id });
  } catch (err) {
    res.sendStatus(500);
  }
};

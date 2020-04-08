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

export const v_search = [
  check('q')
    .not()
    .isEmpty()
];

interface i_search extends Express.Request {
  query: {
    q: string;
  };
}

export const search = async (req: i_search, res: Express.Response) => {
  try {
    if (!validationResult(req).isEmpty()) {
      res.sendStatus(500);
      return;
    }

    const _ret = await db
      .collection(constant.collection_codes)
      .where('id', '==', req.query.q)
      .get();

    res.send({ ..._ret['docs'][0].data() });
  } catch (err) {
    res.sendStatus(500);
  }
};

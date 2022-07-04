import express from 'express';
import {Keypair} from '../quad-voting-maci/domainobjs/build/index.js';

// eslint-disable-next-line new-cap
export const cryptoRouter = express.Router();


cryptoRouter.get('/genKeys', async (req, res, next) => {
  try {
    const keys = new Keypair();
    res.json({
      sk: keys.privKey.serialize(), pk: keys.pubKey.serialize(),
    });
  } catch (e) {
    next(e);
  }
},
);

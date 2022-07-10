import express from 'express';
import {Keypair} from '../quad-voting-maci/domainobjs/build/index.js';
import {verifyClient} from '../quad-voting-maci/cli/build/verifyClient.js'

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

cryptoRouter.get('/verify', async(req, res, next) => {
  try {
  
  result = verifyClient(req.body)
  res.json({"result": result})
  }
  catch(e) {
    console.error("Verification Error", e)
    next(e)
  }
})

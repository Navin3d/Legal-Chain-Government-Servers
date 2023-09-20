// const express                = require("express");
// const contractController     = require("./controllers/contract.controller");
import express from "express";
import { getAssetByAssetId, getAssetsOfUser, saveAsset } from "./controllers/contract.controller.js";
const contractRouter = express.Router();

contractRouter.get  ("/asset/:id",          getAssetByAssetId);
contractRouter.get  ("/asset/user/:id",     getAssetsOfUser);
contractRouter.post ("/asset",              saveAsset);

export default contractRouter;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_1 = __importDefault(require("../models/message"));
const router = express_1.default.Router();
router.post('/sendMessage', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sender, receiver, text } = req.body;
        const Messages = new message_1.default({ sender, receiver, text });
        yield Messages.save();
        res.status(201).send("message send successfully");
    }
    catch (e) {
        res.status(401).send("something went wrong");
    }
}));
exports.default = router;

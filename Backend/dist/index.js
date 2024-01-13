"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signup_1 = __importDefault(require("./routes/signup"));
const signin_1 = __importDefault(require("./routes/signin"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/', signup_1.default);
app.use('/', signin_1.default);
app.listen(9000, () => console.log("server started in port 9000"));
mongoose_1.default.connect("mongodb+srv://adhabal2002:ys8JJMiNEx1CFeNY@cluster1.nyigg45.mongodb.net/");

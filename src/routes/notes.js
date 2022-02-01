var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var express = require('express');
var router = express();
var Note = require('../models/note');
var isAuthenticated = require('../helpers/auth').isAuthenticated;
// const verifyToken =require('../controller/verifyToken')
router.get('/notes/add', isAuthenticated, function (req, res) {
    res.render('notes/new-note');
});
router.post('/notes/new-note', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, title, description, errors, newNote;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, title = _a.title, description = _a.description;
                errors = [];
                if (!title) {
                    errors.push({ text: "Please Write a Title." });
                }
                if (!description) {
                    errors.push({ text: "Please Write a Description" });
                }
                if (!(errors.length > 0)) return [3 /*break*/, 1];
                res.render("notes/new-note", {
                    errors: errors,
                    title: title,
                    description: description
                });
                return [3 /*break*/, 3];
            case 1:
                newNote = new Note({ title: title, description: description });
                newNote.user = req.user.id;
                return [4 /*yield*/, newNote.save()];
            case 2:
                _b.sent();
                req.flash('success_msg', 'Nota creada correctamente');
                res.redirect('/notes');
                _b.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/notes', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var notes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Note.find({ user: req.user.id }).sort({ date: "desc" }).lean()];
            case 1:
                notes = _a.sent();
                res.render('notes/all-notes', { notes: notes });
                return [2 /*return*/];
        }
    });
}); });
router.get('/notes/edit/:id', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var note;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Note.findById(req.params.id).lean()];
            case 1:
                note = _a.sent();
                res.render('notes/edit-note', { note: note });
                return [2 /*return*/];
        }
    });
}); });
router.put('/notes/edit-note/:id', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, title, description;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, title = _a.title, description = _a.description;
                return [4 /*yield*/, Note.findByIdAndUpdate(req.params.id, { title: title, description: description })];
            case 1:
                _b.sent();
                req.flash('success_msg', 'Nota Actualizada correctamente');
                res.redirect('/notes');
                return [2 /*return*/];
        }
    });
}); });
router["delete"]('/notes/delete/:id', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Note.findByIdAndDelete(req.params.id)];
            case 1:
                _a.sent();
                req.flash('success_msg', 'Nota Borrado correctamente');
                res.redirect('/notes');
                return [2 /*return*/];
        }
    });
}); });
module.exports = router;
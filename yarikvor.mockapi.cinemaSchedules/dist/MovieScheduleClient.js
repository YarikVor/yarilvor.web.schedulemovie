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
Object.defineProperty(exports, "__esModule", { value: true });
class MovieScheduleClient {
    getMoviesAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.getRequest("movies");
            return response.map((value) => (Object.assign(Object.assign({}, value), { id: +value.id, duration: +value.duration })));
        });
    }
    getSchedulesAsync(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.getRequest(`movies/${id}/schedules`);
            return ((_a = response === null || response === void 0 ? void 0 : response.map((value) => (Object.assign(Object.assign({}, value), { id: +value.id, movieId: +value.movieId, startAt: new Date(value.startAt) })))) !== null && _a !== void 0 ? _a : null);
        });
    }
    getRequest(endpoint) {
        return fetch(MovieScheduleClient.BASE_URL + endpoint).then((res) => res.json());
    }
}
MovieScheduleClient.BASE_URL = "https://6522dd89f43b17938414fbeb.mockapi.io/api/v1/";
exports.default = MovieScheduleClient;
//# sourceMappingURL=MovieScheduleClient.js.map
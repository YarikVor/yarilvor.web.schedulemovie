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
const InitialedCalendar_1 = __importDefault(require("./InitialedCalendar"));
function listEvents() {
    return __awaiter(this, void 0, void 0, function* () {
        const calendar = yield InitialedCalendar_1.default.createCalendarAsync();
        const res = yield calendar.events.list({
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        });
        const events = res.data.items;
        if (!events || events.length === 0) {
            console.log('No upcoming events found.');
            return;
        }
        console.log('Upcoming 10 events:');
        events.map((event, i) => {
            var _a, _b;
            const start = ((_a = event.start) === null || _a === void 0 ? void 0 : _a.dateTime) || ((_b = event.start) === null || _b === void 0 ? void 0 : _b.date);
            console.log(`${start} - ${event.summary}`);
        });
        // calendar.events.insert().
    });
}
listEvents();
//# sourceMappingURL=index.js.map
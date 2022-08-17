"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class InternalServerError extends common_1.HttpException {
    constructor(response) {
        super(response, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        this.messages = response;
    }
}
exports.default = InternalServerError;
//# sourceMappingURL=internal-server-error.js.map
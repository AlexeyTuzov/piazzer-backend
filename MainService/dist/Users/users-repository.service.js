"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_entity_1 = require("./users.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const internal_server_error_1 = require("../exceptions/internal-server-error");
let UsersRepositoryService = class UsersRepositoryService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(dto) {
        try {
            const newUser = await this.usersRepository.create(dto);
            return newUser.id;
        }
        catch (err) {
            throw new internal_server_error_1.default('User creation has been failed');
        }
    }
    async update(dto) {
    }
    async getById(id) {
    }
    async getAll() {
        try {
            return this.usersRepository.find();
        }
        catch (err) {
            throw new internal_server_error_1.default('Users find has been failed');
        }
    }
    async delete(id) {
    }
};
UsersRepositoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersRepositoryService);
exports.default = UsersRepositoryService;
//# sourceMappingURL=users-repository.service.js.map
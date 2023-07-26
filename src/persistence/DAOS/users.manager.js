import { usersModels } from "../mongoDB/models/users.models.js";
import CurrentDTO from "../DTOs/current.dto.js";

export default class usersManager {
    async currentSession(info) {
        try {
            const current = new CurrentDTO(await info)
            return current
        } catch (error){
            console.log(error);
        }
    }
}
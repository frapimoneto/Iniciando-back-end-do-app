import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateAvatarUserService from '../services/UpdateAvatarService';

// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import UpdateUserAvatarService from '../services/UpdateAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async(request, response) => {

    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password
    })

    delete user.password;

    return response.json(user);
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);

}) //patch se usa para alterar uma única informação ao contrário do put 

export default usersRouter;
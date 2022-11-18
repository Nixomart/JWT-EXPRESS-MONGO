import Role from '../models/Role.js'

export const createRoles = async () =>{
    try {
        const count = await Role.estimatedDocumentCount()
        //if exists roles, don´t create more
        if (count > 0) return;

        const values = await Promise.all([
            new Role({name: 'user'}).save(),
            new Role({name: 'moderator'}).save(),
            new Role({name: 'admin'}).save()
        ])

        console.log(values)

    } catch (error) {
        console.log('error', error)
    }
}
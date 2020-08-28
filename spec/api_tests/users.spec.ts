import {UsersApiNoAuthorization} from '../../http_client/users-client'
import UserApiRequest from '../../types/user_request'
import faker = require('faker');

describe('get_user_by_Id', function () {
    const parameters = [
        {id: 1},
        {id: 2},
        {id: 3},
    ]
    parameters.forEach((parameter) => {
        it('should return user on each id', async function (done) {
            expect((await UsersApiNoAuthorization.getUserById(parameter.id)).name).not.toBeNull
            done()
            })
        })
    })


describe('create_user', function () {
    const body: UserApiRequest = {name: faker.name.findName(), job: faker.name.jobDescriptor()}
    it('should return user in response back', async function (done) {
        expect((await UsersApiNoAuthorization.postUser(body)).name).toEqual(body.name)
        expect((await UsersApiNoAuthorization.postUser(body)).job).toEqual(body.job)
        expect((await UsersApiNoAuthorization.postUser(body)).id).not.toBeNull
        expect((await UsersApiNoAuthorization.postUser(body)).createdAt).not.toBeNull
        expect(new Date(new Date((await UsersApiNoAuthorization.postUser(body)).createdAt).toDateString())).toEqual(new Date(new Date().toDateString()))
        done()
        })
    })

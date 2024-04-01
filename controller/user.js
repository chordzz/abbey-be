import User from "../model/user.js"
import Friend from "../model/friend.js"
import { StatusCodes } from "http-status-codes"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import { validateInput } from "../utils/index.js"


export const createUser = async ( req, res ) => {
    try {
        const { email } = req.body
        const error = validateInput(["firstName", "lastName", "email", "username", "password"], req.body)

        if (error) return res.status(StatusCodes.BAD_REQUEST).json({
            message: error
        })

        const existingEmail = await User.findOne({ where: {email}  })
        if (existingEmail) return res.status(StatusCodes.FORBIDDEN).json({
            message: "User with this email already exists"
        })

        const user = await User.create(req.body)

        return res.status(StatusCodes.CREATED).json({
            message: "Successfully created user",
            data: user,
            status: StatusCodes.OK
        })
    } catch(err){
        console.error(err.message)
    }
}

export const login = async ( req, res ) => {
    try {
        const { password, email } = req.body
        const error = validateInput([ "email", "password"], req.body)
        const user = await User.findOne({ where: {email} })
        if ( !user ) return res.status(StatusCodes.NOT_FOUND).json({
            message: "User cannot be found",
            status: StatusCodes.NOT_FOUND
        })

        const validPassword = await bcrypt.compare( password, user.password )

        if (!validPassword) return res.status(StatusCodes.FORBIDDEN).json({
            message: "Incorrect password"
        })

        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: 3600 })

        return res.status(StatusCodes.OK).json({
            message: "Successfully logged in",
            token,
            data: user,
            status: StatusCodes.OK
        })

    } catch(err) {
        console.error(err.message)
    }
}

export const userDetails = async ( req, res ) => {
    try{
        console.log(req.user)
        const user = await User.findByPk(req.user.id, { include: {
            model: Friend,
            as: "friends"
        } })
        if( !user ) return res.status(StatusCodes.NOT_FOUND).json({
            message: "User details not found"
        })

        return res.status(StatusCodes.OK).json({
            message: "Successfully retrieved user details",
            data: user,
            status: StatusCodes.OK
        })
    } catch(err){
        console.error( err.message )
    }
}

export const addFriend = async ( req, res ) => {
    try{
        const { id } = req.params
        const user = await User.findByPk(req.user.id)

        if( !user ) return res.status(StatusCodes.NOT_FOUND).json({
            message: "You are not authorized to perform this action"
        })

        const friend = await Friend.findByPk(id)
        if( !friend ) return res.status(StatusCodes.NOT_FOUND).json({
            message: "Friend does not exist"
        })

        const addFriendToUser = await Friend.update({ userId: req.user.id }, { where: { id }, returning: true })

        return res.status(StatusCodes.OK).json({
            message: "Successfully added new friend",
            data: addFriendToUser[1][0],
            status: StatusCodes.OK
        })
        
    } catch(err) {
        console.error(err.message)
    }
}
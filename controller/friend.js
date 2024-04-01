import Friend from "../model/friend.js";
import { StatusCodes } from "http-status-codes"
import { validateInput } from "../utils/index.js";


export const createFriend = async ( req, res ) => {
    try {

        const { username } = req.body

        const error = validateInput([ "username", "firstName", "lastName" ], req.body)
        if (error) return res.status(StatusCodes.BAD_REQUEST).json({
            message: error
        })

        const existingFriend = await Friend.findOne({ where: { username } })
        if (existingFriend) return res.status(StatusCodes.FORBIDDEN).json({
            message: "Friend with this email already exists"
        })

        const friend = await Friend.create(req.body)
        return res.status(StatusCodes.CREATED).json({
            message: "Successfully created friend",
            data: friend,
            status: StatusCodes.OK
        })


    } catch (err) {
        console.error(err.message)
    }
}

export const getAllFriends = async ( req, res ) => {
    try {
        const friends = await Friend.findAll()

        return res.status(StatusCodes.OK).json({
            message: "Successfully fetched all friends",
            data: friends,
            status: StatusCodes.OK
        })
    } catch (err) {
        console.error(err.message)
    }
} 
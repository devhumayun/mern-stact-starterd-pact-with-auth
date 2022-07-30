import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import student from "../models/student.js";
import createError from './createError.js';

/**
 * @route get
 * @desc get all studetns
 * @access public
*/

export const allStudents = async ( req, res, next ) => {

    try{
        let students = await student.find()

        if( !students ){

           return  next(createError(404, 'Student  Not Found'));

        }else{
            res.status(200).json(students);
        }

    }catch(error){
        next(error)
    }

};

/**
 * @route get
 * @desc get single studetn
 * @access public
*/

export const singleStudent = async ( req, res, next ) => {

    try{

        let single_student = await student.findById(req.params.id);

        if(!single_student){

            return next(createError(404, 'Student  Not Found'));

        }else{
            res.status(200).json(single_student);
        }
  
      }catch(error){
        next(error);
      }

};

/**
 * @route post
 * @desc post a new studetn
 * @access public
*/

export const createStudent = async ( req, res, next ) => {

    try{

        const { password } = req.body
        // create solt
        const solt = await bcrypt.genSalt(10);

        // create hash password
        const hash_password = await bcrypt.hash( password, solt );

        student.create({ ...req.body, password : hash_password})
        res.status(200).json({
            messeage : " student create successfull "
        });

    }catch(error){
        next(error)
    }


};

/**
 * @route patch or put
 * @desc  update studetn
 * @access public
*/

export const updateStudent = async ( req, res, next ) => {

    try{

       let id = req.params.id
       let update_student = await student.findByIdAndUpdate(id, req.body, {
        new : true
     })

     if(!update_student){

        return next(createError(404, 'Student  Not Found'));

     }else{

        res.status(200).json(update_student)
        res.status(200).json({
            messeage : "update successfull"
         })


     }

    }catch(error){
        next(error)
    }

};


/**
 * @route delete
 * @desc  update studetn
 * @access public
*/

export const deleteStudent = async ( req, res, next ) => {

    
    try{

       let id = req.params.id
       let delete_student = await student.findByIdAndDelete(id)

     if(!delete_student){

        return next(createError(404, 'Student  Not Found'));

     }else{

        res.status(200).json(delete_student)

     }

    }catch(error){

        next(error)

    }

}


/**
 * @name student login
 * @route api/students/login
 * @access public
 */

export const studentLogin = async ( req, res, next ) => {


    try{

        const login_user = await student.findOne({ email: req.body.email })

        if( !login_user ){

            return next(createError(404, 'E-mail Not Found'))
        }

        // create  token for the student
        const token = jwt.sign({ id : login_user._id, isAdmin : login_user.isAdmin }, process.env.TOKEN_SECRET)

        const confirm_password = (await bcrypt.compare( req.body.password, login_user.password ))

        if( !confirm_password ){

           return  next(createError(404, 'Password Not Matched'));

        }

        const { _id, isAdmin, password, ...user_info } = login_user._doc

        res.cookie("access_token", token).status(200).json({
            token,
            user_info
        })


    }catch(error){
        next(error)
    }

}
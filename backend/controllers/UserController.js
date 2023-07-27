import User from "../models/UserModel.js"


import {Op} from "sequelize";

export const getUsers = async(req, res) =>{
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await User.count({
        where:{
            [Op.or]: [{name:{
                [Op.like]: '%'+search+'%'
            }}, {email:{
                [Op.like]: '%'+search+'%'
            }}]
        }
    }); 
    const totalPage = Math.ceil(totalRows / limit);
    const result = await User.findAll({
        where:{
            [Op.or]: [{name:{
                [Op.like]: '%'+search+'%'
            }}, {email:{
                [Op.like]: '%'+search+'%'
            }}]
        },
        offset: offset,
        limit: limit,
        order:[
            ['id', 'DESC']
        ]
    });
    res.json({
        result: result,
        page: page,
        limit: limit,
        totalRows: totalRows,
        totalPage: totalPage
    });
}


export const getUserById = async (req, res) => {

    const userId = req.params.id

    try {
        const userById = await User.findByPk(userId)

        if(!userById) {
            return res.status(400).json({
                message: "user is not found"
            })
        }

        res.status(200).json({
            data: userById
        })

    } catch (error) {
        console.log("===> ", error);
        res.status(500).json({
            message: "internal server error"
        })
    }

}

export const createUser = async (req, res) => {
    try {
      if (!req.body) {
        return res.status(400).json({
          message: "Data Anda belum valid"
        });
      }
  
      const isEmailExist = await User.findOne({
        where: {
          email: req.body.email,
          status: "email"
        }
      });
  
      if (isEmailExist) {
        return res.status(400).json({
          message: "Email sudah digunakan"
        });
      }

      await User.create(req.body);
  
      res.status(201).json({
        message: "User berhasil dibuat"
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
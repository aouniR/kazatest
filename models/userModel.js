const { Pool } = require("pg")
const validator = require('validator')
require('dotenv').config()

const pool = new Pool({
    connectionString: process.env.db_url,
    ssl: false,
  })

const validateUser = (user) => {
    if (!validator.isEmail(user.email)) {
      throw new Error("Invalid email address")
    }
    if (
      !validator.isLength(user.username, { min: 5, max: 20 }) ||
      !/^[a-z0-9]+$/i.test(user.username)
    ) {
      throw new Error("Invalid username")
    }
    if (
      !validator.isLength(user.fullname, { min: 5, max: 20 }) ||
      !validator.isAlpha(user.fullname, ["en-US"], { ignore: " " })
    ) {
      throw new Error("Fullname must be between 5 and 20 characters and contain only letters")
    }
  };
  
const createUser = async (user) => {
    validateUser(user)
  
    const query = `
      INSERT INTO users (email, username, fullname, password)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `
    const values = [user.email, user.username, user.fullname, user.password]
  
    try {
      const result = await pool.query(query, values)
      return result.rows[0]
    } catch (err) {
      console.error("Error creating user:", err)
      throw err
    }
  };


  const getUserByUsername = async (username) => {
    const query = `SELECT * FROM users WHERE username = $1;`
    try {
      const result = await pool.query(query, [username])
      return result.rows[0]
    } catch (err) {
      console.error("Error fetching user by username:", err)
      throw err
    }
  }


  const updateUser = async (username, updates) => {
    const allowedFields = ["email", "fullname", "password"]
    const setClauses = []
    const values = []
  
    Object.keys(updates).forEach((key, index) => {
      if (allowedFields.includes(key)) {
        setClauses.push(`${key} = $${index + 1}`)
        values.push(updates[key])
      }
    })
  
    if (setClauses.length === 0) {
      throw new Error("No valid fields to update")
    }
  
    const query = `
      UPDATE users
      SET ${setClauses.join(", ")}
      WHERE username = $${setClauses.length + 1}
      RETURNING *;
    `;
    values.push(username) 
  
    try {
      const result = await pool.query(query, values)
      if (result.rows.length === 0) {
        throw new Error("User not found")
      }
      return result.rows[0]
    } catch (err) {
      console.error("Error updating user:", err)
      throw err
    }
  };
  
  
  module.exports = {
    createUser,
    getUserByUsername,
    updateUser
  };
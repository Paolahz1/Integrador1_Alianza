const pool = require ("../providers/db"); 

async function postUser (nombre) {
    try {
        const newPersona = await pool.query (
            "INSERT INTO persona (nombre) VALUES ($1) ",
            [nombre]
        );
        console.log(newPersona.rows[0]);
        return newPersona.rows[0];
    } catch (error) {
        console.error(error.message);
        return null;
    }

}

module.exports = {postUser}; 
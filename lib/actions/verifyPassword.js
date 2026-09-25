'use server'

export const verifyPassword =async (password) => {
    const adminPassword = process.env.ADMIN_PASSWORD
    
        if(!adminPassword){
            return {success: false, error:'Internal Server Error'}

        }
        if(password === adminPassword){
            return {success: true}
        }
        if(password !== adminPassword){
            return {success: false, error:'Incorrect password'}
        }
    
}

const {encrypt,decrypt}=require('n-krypta')
const jwt=require('jsonwebtoken')
const users = []; // For storing datas

exports.userSignUp = async (req, res) => {
    let { id, fName, lName, email, password, phone } = req.body;
    try {
        if (!id || !fName || !lName || !email || !password || !phone) {
            throw new Error("All fields are required");
        }
        
        // Check if the user already exists by email or id
        const existingUser = users.find(user => user.email === email || user.id === id);
        if (existingUser) {
            return res.status(403).json("User already exists!!change email or id");
        }
        else{
            password=encrypt(password,process.env.N_CRYPT_SECRET_KEY)
            users.push({ id, fName, lName, email, password, phone });
            res.status(200).json(users);
        }
        
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: err.message });
    }
};

exports.userLogin=async(req,res)=>{
    let {email,password}=req.body
    console.log(req.body);
    password=encrypt(password,process.env.N_CRYPT_SECRET_KEY)
    console.log(password);
    console.log(users);
    try{
    const existingUser=users.find(user => user.email === email && user.password === password);
    if(existingUser){
      const token=jwt.sign({userId:existingUser._id},process.env.JWT_SECRET_KEY)
      res.status(200).json({existingUser,token})
    }else{
     res.status(406).json('Please sign up!!! you dont have an account here!!')
    }
    }catch(err){
     res.status(401).json(err)
    }
 }

exports.addProduct=async(req,res)=>{
    const usersWithoutPassword=users.map(user => ({
        id: user.id,
        fName: user.fName,
        lName: user.lName,
        email: user.email,
        phone: user.phone
    }));
    try{
        res.status(200).json(usersWithoutPassword)
    }catch(err){
        res.status(200).json(err)
    }
} 

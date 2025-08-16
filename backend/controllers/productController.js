import { instance } from "../server.js"
export const processPayment=async (req, res)=>{
   
    const options={
       amount: req.body.amount,
       currency:"INR" 
    }



    const order=await instance.orders.create(options)
    res.status(200).json({
        success:true,
        order
    })
}


export const getKey=async(req, res)=>{
    res.status(200).json({
        key:process.env.RAZORPAY_API_KEY
    })
}


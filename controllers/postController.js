import postModal from "../models/postModal.js";

export const AddPostController = async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ success: false, message: 'Post title and description are required!' });
    }
    try {
        const post = await postModal.create({ title, description, postedBy: req.auth?._id });
        res.status(201).json({ success: true, message: 'Post created successfully', post });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
export const GetPostController = async (req, res) => {
    try {
        const posts = await postModal.find({}).populate("postedBy", '_id name').sort({ createdAt: -1 });
        res.status(200).json({ success: true, message: 'Post fetched successfully', posts })
    } catch (error) {
        res.status(500).send({ success:false,message: "get Server Error" });
    }
};
export const UpdatePostController=async(req,res)=>{
    const {_id,title,description}=req.body;
        if(!title){
            return res.status(201).send({success:false,message:'Post title is required!'});
        }
        if(!description){
            return res.status(201).send({success:false,message:'Post Description is required!'});
        }
        const post =await postModal.findByIdAndUpdate(_id,{description,title},{new:true})
        res.status(201).send({success:true,message:'Post updated Successfully',post});
}
export const DeletePostController=async(req,res)=>{
    try {      
        const {pid}=req.params;
        console.log(pid)
        const post= await postModal.findByIdAndDelete({_id:pid})
        res.status(200).send({success:true,message:'Post delete Successfully',post});  
    } catch (error) {
        console.log(error)
    }
}
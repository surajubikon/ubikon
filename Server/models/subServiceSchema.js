import mongoose from "mongoose";

const SubServiceSchema = new mongoose.Schema(

  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    serviceId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "service",
        required: true,
    },
    
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
   
    content: { 
        type: String ,
        required: true ,
}, 
    seometa : {
      type: String,
    },
   
    publishedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);




export default mongoose.model("subservice", SubServiceSchema);

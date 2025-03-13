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
      type: [String], // Change to an array of strings
      default: []
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
    features:[
      {
        title:{type:String, required: true},
        description:{type:String, required: true},
        icon:{type: String}
      }
    ],

    useCases:[
      {
        title:{ type: String, required : true },
        description:{ type: String, required: true },
        icon:{ type: String }
      
      }
    ],
    whyChooseUs:[
      {
        title:{type: String, required: true},
        description:{type: String, required: true},
        icon:{type: String}
      }
    ],
  },

  { timestamps: true }
);




export default mongoose.model("subservice", SubServiceSchema);

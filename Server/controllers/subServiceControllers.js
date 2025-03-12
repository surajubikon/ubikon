import SubServiceSchema from "../models/subServiceSchema.js";
import sharp from 'sharp';
import fs from 'fs'; 

export const createSubService = async (req, res) => {
    const { title, content, description, seometa, publishedAt, serviceId, features, useCases, whyChooseUs} = req.body;

    try {
      
      if (!title || !description || !serviceId) {
        return res.status(400).json({ message: "Title, description, and serviceId are required." });
      }
  
      // Generate slug from the title
      const slug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-') 
        .replace(/-+/g, '-'); 
  
      const subServiceExists = await SubServiceSchema.findOne({ slug });
      if (subServiceExists) {
        return res.status(400).json({ message: "Sub-service with this slug already exists" });
      }
      let thumbnailUrl = req.files ? req.files.map(file => "/uploads/subservice/" + file.filename) : [];

    const parseJSON = (data, defaultValue) => {
      try {
          return typeof data === "string" ? JSON.parse(data) : data;
      } catch (error) {
          console.error("JSON Parse Error:", error);
          return defaultValue;
      }
  };

  const parsedFeatures = parseJSON(features, []);
  const parsedUseCases = parseJSON(useCases, []);
  const parsedWhyChooseUs = parseJSON(whyChooseUs, []);


      // Create sub-service with image URLs and serviceId
      const subService = await SubServiceSchema.create({
        title,
        slug,
        content,
        description,
        seometa,
        publishedAt,
        thumbnail: thumbnailUrl,
        serviceId,
        features: parsedFeatures, 
        useCases: parsedUseCases,
        whyChooseUs: parsedWhyChooseUs,
      
      });
  
      res.status(201).json(subService);
    } catch (error) {
      console.error("Error in createSubService:", error);
      res.status(500).json({ message: error.message });
    }
  };


export const updateSubService = async (req, res) => {
  const { id } = req.params;
  const { title, content, description, seometa, publishedAt, serviceId, features, useCases, whyChooseUs } = req.body;

  try {
    let updatedFields = { title, content, description, seometa, publishedAt, serviceId };

    // 🔹 Generate new slug if title is updated
    if (title) {
      const slug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      updatedFields.slug = slug;
    }

    // 🔹 JSON Parsing for Arrays & Objects
    updatedFields.features = features ? JSON.parse(features) : [];
    updatedFields.useCases = useCases ? JSON.parse(useCases) : [];
    updatedFields.whyChooseUs = whyChooseUs ? JSON.parse(whyChooseUs) : [];
    // 🔹 Handle Image Update (Keep Old Images If No New Uploaded)
    if (req.files && req.files.length > 0) {
      let thumbnailUrls = [];

      for (const file of req.files) {
        const imagePath = file.path;

        // 🔹 Resize & Compress Image
        const compressedImagePath = `./public/uploads/subservice/compressed-${file.filename}`;
        await sharp(imagePath)
          .resize(800, 600)
          .webp({ quality: 80 })
          .toFile(compressedImagePath);

        thumbnailUrls.push(`/uploads/subservice/compressed-${file.filename}`);

        // 🔹 Remove Original Uploaded Image to Save Space
        fs.unlinkSync(imagePath);
      }

      updatedFields.thumbnail = thumbnailUrls;
    }

    // 🔹 Fetch Old Data First
    const existingSubService = await SubServiceSchema.findById(id);
    if (!existingSubService) {
      return res.status(404).json({ message: "Sub-service not found" });
    }

    // 🔹 Keep Old Images if No New Images Are Uploaded
    if (!updatedFields.thumbnail) {
      updatedFields.thumbnail = existingSubService.thumbnail;
    }

    // 🔹 Update the Sub-Service
    const updatedService = await SubServiceSchema.findByIdAndUpdate(id, updatedFields, { new: true });

    res.json(updatedService);
  } catch (error) {
    console.error("Error in updateSubService:", error);
    res.status(500).json({ message: error.message });
  }
};


// Get all services
export const getSubService = async (req, res) => {
  try {
    const services = await SubServiceSchema.find()
    .populate('serviceId', 'title slug') // ✅ Ye sahi hai
    .sort({ createdAt: -1 });

    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a service
export const deleteSubService = async (req, res) => {
  const { id } = req.params;
  try {
    // 🔹 Pehle service ka data fetch karo
    const service = await SubServiceSchema.findById(id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // 🔹 Thumbnail array ko loop karke har image delete karo
    if (service.thumbnail && service.thumbnail.length > 0) {
      service.thumbnail.forEach((filePath) => {
        const fullPath = `./public${filePath}`; // ✅ Correct file path
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath); // ✅ Delete file
        }
      });
    }

    // 🔹 Ab database se service delete karo
    await SubServiceSchema.findByIdAndDelete(id);

    res.json({ message: "Service and associated images deleted successfully" });
  } catch (error) {
    console.error("Error in deleteSubService:", error);
    res.status(500).json({ message: "Error deleting service" });
  }
};

export const getSubServiceBySlug = async (req, res) => {
  
  try {
    const { slug } = req.params; // Correct way to get slug from URL params

    // Use findOne() instead of findById()
    const service = await SubServiceSchema.findOne({ slug });
  
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json(service);
     
  } catch (error) {
    console.error("Error fetching the service:", error);
    res.status(500).json({ message: "Error fetching the service" });
  }
};

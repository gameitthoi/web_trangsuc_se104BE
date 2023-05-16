import ServiceType from "../models/serviceType.js";


  //Lấy danh sách dịch vụ
  export const getAllServiceType = async(req, res)=>{
    try {
      const serviceType = await ServiceType.find();
      if (!serviceType) {
        throw "error";
      }
      return res.status(201).json(serviceType);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
 // Lấy theo Objectid:

export const getServiceTypeById = async(req, res)=>{
    try {
        
        const serviceType = await ServiceType.findById({_id:req.params.id})
        if (!serviceType)
            res.status(404).send("Not found!")
        res.send(serviceType)
    } catch (e) {
        res.status(500).send(e)
    }
}

export const getServiceTypeBySVTID = async (req,res)=> {
    try{
        const svtid = req.params.svt_id;
        const serviceType = await ServiceType.find({svt_id: svtid})
        res.send(serviceType);
    }
    catch(e){
        res.status(500).send(e)
    }
  }

  //Thêm 
  
    export const addServiceType = async(req, res)=>{
    try {
      console.debug("Adding service type...");
      const serviceType = new ServiceType({ ...req.body });
      await serviceType.save();
      return res.status(201).json(serviceType);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
//   //Cập nhật

    export const updateServiceType = async(req, res)=>{
    try {
      console.debug("Updating service type...");
      
      const updatedServiceType = await ServiceType.findByIdAndUpdate({_id:req.params.id}, req.body, {
        new: true,
      });
      if (!updatedServiceType) {
        return res.status(404).json({ error: "Service type not found." });
      }
      return res.json(updatedServiceType);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
    
  //Xóa

    export const deleteServiceType = async(req, res)=>{
    try {
      console.debug("Deleting service type...");
      const deletetServiceType = await ServiceType.findOneAndDelete({_id:req.params.id});
      if (!deletetServiceType) {
        return res.status(404).json({ error: "Service type not found." });
      }
      return res.json(deletetServiceType);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }


import { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext"
import { addLocation } from "../../Services/ApiService";
import { toast } from "react-toastify";


const AddBranch:React.FC = () => {
  const {token}=useAuth();
  const [data,setData]=useState({
    name:"",
    latitude:"",
    longitude:"",
    geofenceRadius:"",
  });

  const [errors,setErrors]=useState<{[key:string]:string}>({});
  


  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setData({
      ...data,[e.target.name]:e.target.value,
    });
    setErrors({...errors,[e.target.name]:""});
  }

  const validate=()=>{
    const errs:{[key:string]:string}={};
     if (!data.name.trim()) errs.name = "Name is required";
    if (!data.latitude.trim()) errs.latitude = "Latitude is required";
    if (!data.longitude.trim()) errs.longitude = "Longitude is required";
    if (!data.geofenceRadius.trim()) errs.geofenceRadius = "Geofence radius is required";
    return errs;
  }

  const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const validation=validate();
    if(Object.keys(validation).length>0){
      setErrors(validation);
      return;
    }
       try {
   const payload = {
  Name: data.name.trim(),
  Latitude: data.latitude ? parseFloat(data.latitude) : 0,
  Longitude: data.longitude ? parseFloat(data.longitude) : 0,
  GeofenceRadius: data.geofenceRadius ? parseFloat(data.geofenceRadius) : 0,
};

      
      const res = await addLocation(token, payload);
     toast.success("Branch added successfully!");
      setData({ name: "", latitude: "", longitude: "", geofenceRadius: "" });

  }catch(err:any){
  toast.error("Failed to add branch. Please try again.");
  }
}
 return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="card p-4 shadow" style={{ maxWidth: "500px", width: "100%" }}>
          <h4 className="text-center mb-4">Add New Branch</h4>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label">Branch Name</label>
              <input
                type="text"
                name="name"
                className={`form-control ${errors.name && "is-invalid"}`}
                value={data.name}
                onChange={handleChange}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Latitude</label>
              <input
                type="number"
                step="any"
                name="latitude"
                className={`form-control ${errors.latitude && "is-invalid"}`}
                value={data.latitude}
                onChange={handleChange}
              />
              {errors.latitude && <div className="invalid-feedback">{errors.latitude}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Longitude</label>
              <input
                type="number"
                step="any"
                name="longitude"
                className={`form-control ${errors.longitude && "is-invalid"}`}
                value={data.longitude}
                onChange={handleChange}
              />
              {errors.longitude && <div className="invalid-feedback">{errors.longitude}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Geofence Radius (meters)</label>
              <input
                type="number"
                name="geofenceRadius"
                className={`form-control ${errors.geofenceRadius && "is-invalid"}`}
                value={data.geofenceRadius}
                onChange={handleChange}
              />
              {errors.geofenceRadius && (
                <div className="invalid-feedback">{errors.geofenceRadius}</div>
              )}
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary w-50">
                Add Branch
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

};

export default AddBranch;
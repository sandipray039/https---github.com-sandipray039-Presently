import "./AddEmployee.css";

const AddEmployee = () => {
  return (
    <div className="add-employee-form-container">
      <h2 className="form-title">Add New Employee</h2>

      <form className="add-employee-form">
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" placeholder="Enter full name" />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input type="email" placeholder="Enter email" />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" placeholder="Enter phone number" />
        </div>

        <div className="form-group">
          <label>Designation</label>
          <input type="text" placeholder="e.g., Software Engineer" />
        </div>

        <div className="form-group">
          <label>Department</label>
          <select>
            <option value="">Select department</option>
            <option>Engineering</option>
            <option>HR</option>
            <option>Finance</option>
            <option>Marketing</option>
          </select>
        </div>

        <div className="form-group">
          <label>Joining Date</label>
          <input type="date" />
        </div>

        <button type="submit" className="submit-btn">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;

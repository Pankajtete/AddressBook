import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    filterBy: "",
    mobile: "",
    gender: "",
    age: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "/api/v1/addbooks/index";
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          setData(json);
          setFilteredData(json);
        } else {
          throw new Error("Network response was not ok.");
        }
      } catch (error) {
        navigate("/");
      }
    };

    fetchData();
  }, []);

  const deleteAddressbook = (id) => {
    const url = `/api/v1/addbooks/destroy/${id}`;
    alert(id)
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },

    })
      .then((response) => {
        if (response.ok) {

          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => navigate("/"))
      .catch((error) => console.log(error.message));
  };



  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    let filtered = data;

    if (filters.mobile) {
      filtered = filtered.filter((item) =>
        item.mob.toLowerCase().includes(filters.mobile.toLowerCase())
      );
    }

    if (filters.gender) {
      filtered = filtered.filter(
        (item) => item.gender.toLowerCase() === filters.gender.toLowerCase()
      );
    }

    if (filters.age) {
      filtered = filtered.filter((item) => item.age === parseInt(filters.age));
    }

    setFilteredData(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <>
      <div className="main container-fluid bg-info">
        <div className="row">
          <div className="col-md-12">
            <div className=" col-md-5 mt-3">
          <div className="filter-container d-flex">
            <label htmlFor="filterBy">Filter By:</label>
            <select
              id="filterBy"
              name="filterBy"
              value={filters.filterBy}
              onChange={handleFilterChange}
            >
              <option value="">Select Filter</option>
              <option value="mobile">Mobile</option>
              <option value="gender">Gender</option>
              <option value="age">Age</option>
            </select>

            {filters.filterBy === "mobile" && (
              <div>
                <label htmlFor="mobile">Mobile:</label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={filters.mobile}
                  onChange={handleFilterChange}
                />
              </div>
            )}

            {filters.filterBy === "gender" && (
              <div>
                <label htmlFor="gender">Gender:</label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  value={filters.gender}
                  onChange={handleFilterChange}
                />
              </div>
            )}

            {filters.filterBy === "age" && (
              <div>
                <label htmlFor="age">Age:</label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  value={filters.age}
                  onChange={handleFilterChange}
                />
              </div>
            )}
          </div>
          </div>

          <table className="table table-bordered text-center mt-4">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
                <th scope="col">Mobile</th>
                <th scope="col">Gender</th>
                <th scope="col">Address</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.mob}</td>
                  <td>{item.gender}</td>
                  <td>{item.address}</td>
                  <td><button type="button" className="btn btn-danger"
                    onClick={() => deleteAddressbook(item.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-center">
            <Link to="addbooks/create" className="btn btn btn-outline-dark" role="button">
              Create
            </Link>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Home;

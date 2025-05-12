import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching data");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        toast.success("Product deleted successfully");
        fetchList(); // Refresh the list
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting product");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-4 text-lg font-bold">All Products</p>
      <div className="flex flex-col gap-4">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border bg-pink-100 text-sm font-semibold rounded">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {list.map((item, index) => (
          <div
            key={item._id || index}
            className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border-b text-sm rounded hover:bg-gray-50"
          >
            <img
              src={item.image[0]}
              alt={item.name}
              className="w-16 h-16 object-cover"
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <div className="flex gap-2 justify-center">
              <button
                className="bg-pink-400 text-white px-3 py-1 rounded hover:bg-pink-500"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {list.length === 0 && (
          <div className="text-center py-4 font-medium">
            No products found
          </div>
        )}
      </div>
    </>
  );
};

export default List;

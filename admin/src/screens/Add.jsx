import React, { useState, useRef } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { MdOutlineCloudUpload } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";

const Add = ({ token }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [meta, setMeta] = useState([]);
  const [metaInput, setMetaInput] = useState("");

  const fileRef = useRef();

  const handleAddMeta = () => {
    if (metaInput.trim() !== "") {
      setMeta((prev) => [...prev, metaInput.trim()]);
      setMetaInput("");
    }
  };

  const handleRemoveMeta = (indexToRemove) => {
    setMeta((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("meta", JSON.stringify(meta));
      formData.append("image", image);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setMeta([]);
        setImage(null);
        fileRef.current.value = "";
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col min-h-screen w-full items-start gap-4 bg-white p-10"
    >
      <h2 className="text-2xl font-light mb-2">Add Product</h2>

      <div className="w-full">
        <p className="mb-2 text-sm">Upload Image</p>

        
          <label
            htmlFor="imageUpload"
            className="w-48 h-48 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden hover:border-black transition"
          >
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <MdOutlineCloudUpload
                  size={36}
                  className="mb-2 text-gray-400"
                />
                <span className="text-sm text-gray-400 text-center">
                  Click to upload
                </span>
              </>
            )}
          </label>
      
        <input
          ref={fileRef}
          id="imageUpload"
          type="file"
          accept="image/*"
          required
          onChange={(e) => setImage(e.target.files[0])}
          className="hidden"
        />
      </div>

      <div className="w-full">
        <p className="mb-2 text-sm">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full px-3 py-2 border"
          type="text"
          placeholder="Type Here."
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2 text-sm">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full px-3 py-2 border min-h-25"
          placeholder="Write content here."
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2 text-sm">Product Price</p>
        <input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          className="w-full px-3 py-2 border"
          type="number"
          placeholder="25 (in $)"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2 text-sm">Product Meta Tags</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={metaInput}
            onChange={(e) => setMetaInput(e.target.value)}
            placeholder="Add a tag"
            className="flex-1 px-3 py-2 border"
          />
          <button
            type="button"
            onClick={handleAddMeta}
            className="px-4 border hover:bg-black hover:text-white transition"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {meta.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-2 border px-3 py-1 text-sm"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => handleRemoveMeta(index)}
                className="text-gray-500 hover:text-black"
              >
                <ImCancelCircle />
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 px-6 py-3 bg-black text-white hover:bg-pink-900 hover:shadow-2xl"
      >
        ADD PRODUCT
      </button>
    </form>
  );
};

export default Add;

import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: "dynipsxyp",
    api_key: "397144853522346",
    api_secret: "VEZ0_2Jqk26XTpdHsyggqmn2A3U",
  });
};
export default connectCloudinary;

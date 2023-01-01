import { Box } from "@mui/material";
import { styled } from "@mui/system";

const UserImageWidget = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%", cursor: "pointer" }}
        src={`http://localhost:5000/assets/${image}`}
        alt="user"
        width={size}
        height={size}
      />
    </Box>
  );
};

export default UserImageWidget;

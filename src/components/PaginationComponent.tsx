import React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface PaginationComponentProps {
  count: number;
  currentPage: number;
  onPageChange: (value: number) => void;
}

export const PaginationComponent: React.FC<PaginationComponentProps> = ({
  count,
  currentPage,
  onPageChange,
}) => {
  return (
    <Stack
      spacing={2}
      sx={{
        position: "absolute",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <Pagination
        count={count}
        page={currentPage}
        variant="outlined"
        color="primary"
        onChange={(_, value) => onPageChange(value)}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Stack>
  );
};

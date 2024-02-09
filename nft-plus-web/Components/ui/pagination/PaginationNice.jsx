import React from 'react'
import { Pagination } from '@mui/material'
import { Stack } from '@mui/material'

function PaginationNice(props) {
  const { data, onChange } = props
  const goTop = () => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };
  
  return (
    <Stack
      onClick={() => goTop() }>
      <Pagination
        count={data?.data?.totalPages}
        page={data?.page}
        size="small"
        showFirstButton
        showLastButton
        color='standard'
        variant='outlined'
        onChange={onChange}
        className="main-pagination"
      />
    </Stack>
  )
}

export default PaginationNice
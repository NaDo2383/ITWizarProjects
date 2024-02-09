import React from 'react'
import { Pagination } from '@mui/material'
import { Stack } from '@mui/material'

function PaginationReal(props) {
  const { page, totalPage,  onChange } = props
  const goTop = () => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <Stack
      onClick={() => {
        goTop();
      }}>
      <Pagination
        count={totalPage}
        page={page}
        size="small"
        showFirstButton
        showLastButton
        color='standard'
        variant='outlined'
        onChange={onChange}
      />
    </Stack>
  )
}

export default PaginationReal
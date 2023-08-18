import React from 'react';
import { TablePagination } from '@mui/material';
import { useDataTableContext } from '../context';

export const DynamicTablePaginationComponent: React.FC = () => {
  const { setLimit, page, setPage, limit, total} = useDataTableContext();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      component="div"
      count={total}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={limit}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={[5, 10, 25]}
    />
  );
};

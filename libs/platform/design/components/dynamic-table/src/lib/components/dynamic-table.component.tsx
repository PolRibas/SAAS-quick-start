import React, { useEffect, useRef, useState } from 'react';
import {
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { useDataTableContext } from '../context';
import { useTranslations } from 'next-intl';

export const DynamicTableComponent: React.FC = () => {
  const {
    tableData,
    loading,
    tableHeaders,
    setSort,
    sort,
    setSelectedRow,
    selectedRow,
  } = useDataTableContext();
  const [loadingState, setLoadingState] = useState(false);
  const loadingRef = useRef(loading);
  const t = useTranslations('labels')


  const handleSortClick = (field: string) => {
    const isAsc = sort && sort.key === field && sort.order === 'asc';
    if (sort && sort.key === field && sort.order === 'desc') {
      setSort(undefined);
    } else {
      setSort({
        key: field,
        order: isAsc ? 'desc' : 'asc',
      });
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setLoadingState(loadingRef.current);
    }, 600);
  }, [loading]);
  const filteredHeaders = tableHeaders.filter((item) => !item.hiddenHeader);

  return (
    <TableContainer>
      {loadingState && <LinearProgress />}
      <Table>
        <TableHead>
          <TableRow>
            {filteredHeaders.length ? (
              filteredHeaders.map((item) => {
                return (
                  <TableCell key={item.id}>
                    <TableSortLabel
                      active={sort && sort.key === item.field}
                      direction={
                        sort && sort.key === item.field ? sort.order : 'asc'
                      }
                      onClick={() => handleSortClick(item.field)}
                    >
                      {t(item.label)}
                    </TableSortLabel>
                  </TableCell>
                );
              })
            ) : (
              <TableCell></TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, i) => (
            <TableRow
              key={`${row.field}_item_${i}`}
              onClick={() => setSelectedRow(i)}
              selected={i === selectedRow}
              sx={{
                cursor: 'pointer',
              }}
            >
              {filteredHeaders.map((item, index) => {
                return (
                  <TableCell key={`${row.field}_item_${i}_${index}`}>
                    {row[item.field] as string}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

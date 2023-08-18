import React, { useEffect, useRef, useState } from 'react';
import {
  IconButton,
  TextField,
  InputAdornment,
  ButtonGroup,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useDataTableContext } from '../context';
import { useRouter } from 'next/router';
import { FindByCriteriaPresenterOperationEnum, FindByCriteriaPresenterFilterCondition } from '@saas-quick-start/platform/views/table/presenters';

export const DynamicTableFiltersComponent: React.FC = () => {
  const [filterValue, setFilterValue] = useState('');
  const {
    setCreatingItem,
    callDynamicTableSetData,
    fullConfig,
    setConditions,
  } = useDataTableContext();
  const timeoutRef = useRef<number | null>(null);
  const router = useRouter();

  const handleSearch = (currentText: string) => {
    if (currentText.length > 0) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, search: currentText },
      });
      setConditions(
        fullConfig.filters
          ?.filter((item) => item.type === 'text')
          .map((item) => {
            return {
              key: item.key,
              operation: FindByCriteriaPresenterOperationEnum.CN,
              value: currentText,
            } as unknown as FindByCriteriaPresenterFilterCondition;
          })
      );
    } else {
      setConditions(undefined);
      router.push({
        pathname: router.pathname,
        query: Object.keys(router.query).reduce(
          (acc: { [key: string]: string }, key: string) => {
            if (key !== 'search') {
              acc[key] = router.query[key] as string;
            }
            return acc;
          },
          {}
        ),
      });
    }
  };

  useEffect(() => {
    if (router.query.search && router.query.search !== filterValue) {
      console.log('search', router.query.search)
      setFilterValue(router.query.search as string);
      handleSearch(router.query.search as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.search]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      handleSearch(event.target.value);
    }, 600);
  };

  const handleSearchAgain = () => {
    callDynamicTableSetData();
  };

  const handleCreateItem = () => {
    setCreatingItem(true);
  };

  const handleOpenOptions = () => {
    console.log('Buscando...');
  };

  return (
    <Box
      sx={{
        paddingLeft: 0,
        paddingRight: 0,

        display: 'flex',
        justifyContent: 'flex-end',
        alignContent: 'center',
        padding: '0.5rem',
        borderBottom: '1px solid rgba(224, 224, 224, 1)',
      }}
    >
      <TextField
        value={filterValue}
        onChange={handleFilterChange}
        disabled={!fullConfig.filters}
        placeholder="Search..."
        sx={{
          marginRight: '0.5rem',
          '& .MuiOutlinedInput-root': {
            boxShadow: 'none',
            borderColor: 'transparent',
            borderRadius: 8,
            border: 'none',
            '&:hover': {
              borderColor: 'transparent',
            },
            '&.Mui-focused': {
              boxShadow: 'none',
              borderColor: 'transparent',
            },
          },
          '& .MuiInputBase-input': {
            boxShadow: 'none',
            borderRadius: 0,
            borderColor: 'transparent',
          },
        }}
        size="small"
        color="primary"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                color="primary"
                size="small"
                onClick={() => handleSearch(filterValue)}
                disabled={!fullConfig.filters}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <ButtonGroup color="primary" aria-label="control buttons group">
        {fullConfig.canCreate ? (
          <IconButton onClick={handleCreateItem}>
            <AddIcon />
          </IconButton>
        ) : null}
        <IconButton onClick={handleSearchAgain}>
          <RefreshIcon />
        </IconButton>
        <IconButton onClick={handleOpenOptions}>
          <MoreVertIcon />
        </IconButton>
      </ButtonGroup>
    </Box>
  );
};

import React from 'react';
// mui
import { Box, Card, Table, TableBody, TableContainer, Stack } from '@mui/material';
// components
import NotFound from 'src/components/illustrations/noDataFound';
import Pagination from 'src/components/pagination';

import PropTypes from 'prop-types';
import TableHead from './tableHead';

CustomTable.propTypes = {
  headData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      alignRight: PropTypes.bool
    })
  ).isRequired,
  data: PropTypes.shape({
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  mobileRow: PropTypes.elementType,
  row: PropTypes.elementType.isRequired
};

export default function CustomTable({ ...props }) {
  const { headData, data, isLoading, mobileRow, row, ...rest } = props;
  const Component = row;
  const CardComponent = mobileRow;
  return (
    <>
      {!isLoading && data?.data?.length === 0 ? (
        <Card>
          <NotFound title="No Order Found" />
        </Card>
      ) : (
        <>
          <Card sx={{ display: { md: 'block', xs: 'none' } }}>
            <TableContainer>
              <Table size="small">
                <TableHead headData={headData} />
                <TableBody>
                  {(isLoading ? Array.from(new Array(6)) : data?.data).map((item) => {
                    return <Component key={Math.random()} row={item} isLoading={isLoading} {...rest} />;
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
          {mobileRow && (
            <Box sx={{ display: { md: 'none', xs: 'block' } }}>
              {(isLoading ? Array.from(new Array(6)) : data?.data).map((row) => (
                <CardComponent key={Math.random()} item={row} isLoading={isLoading} {...rest} />
              ))}
            </Box>
          )}

          {!isLoading && (
            <Stack alignItems="flex-end" mt={2} pr={2}>
              <Pagination data={data} />
            </Stack>
          )}
        </>
      )}
    </>
  );
}

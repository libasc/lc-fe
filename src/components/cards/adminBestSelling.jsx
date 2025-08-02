import React from 'react';
// next
import NextLink from 'next/link';
import { Card, CardContent, CardHeader, Divider, Box, Stack, Typography, Skeleton } from '@mui/material';
import BlurImage from 'src/components/blurImage';
// components
import ColorPreviewGroup from '../colorPreviewGroup';
import NoDataFoundIllustration from '../illustrations/noDataFound';

import PropTypes from 'prop-types';

AdminBestSelling.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired
};

export default function AdminBestSelling({ ...props }) {
  const { data, loading } = props;

    // Assuming data is an array of products
    console.log("data==",data);
    
 // Assuming data is an array of products
  const product = data && data.length > 0 ? data[0] : null; // Get the first product or handle accordingly
  // Check if product and images are available
  const images = product?.images || [];
  
  // Safely construct the image URL for the first image or use a default image
  let productImageUrl = images.length > 0 ? images[images.length - 1].url : '/path/to/default/image.jpg'; // Default image fallback
  if (productImageUrl.startsWith('/uploads/')) {
    productImageUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'}${productImageUrl}`;
  }

  return (
    <>
      <Card sx={{ height: '100%' }}>
        <CardHeader title={'Best Selling'} />
        {data?.length < 1 ? (
          <NoDataFoundIllustration
            sx={{
              height: 300,
              width: 300
            }}
          />
        ) : (
          <CardContent>
            {(loading ? Array.from(new Array(5)) : data)?.map((value, index, array) => (
              <React.Fragment key={index}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} py={1}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    {loading ? (
                      <Skeleton variant="rounded" width={64} height={64} />
                    ) : (
                      <Box
                        sx={{
                          position: 'relative',
                          height: 64,
                          width: 64,
                          borderRadius: '8px',
                          border: '1px solid rgba(145, 158, 171, 0.32)',
                          img: {
                            borderRadius: '8px'
                            // border: "1px solid rgba(145, 158, 171, 0.32)",
                          }
                        }}
                      >
                        <BlurImage priority src={product?.images[0]?.url} alt="product" layout="fill" objectFit="cover" />
                      </Box>
                    )}
                    <Box>
                      <Typography
                        component={NextLink}
                        href={loading ? '/dashboard/products' : `/dashboard/products/${value.slug}`}
                        variant="subtitle1"
                        noWrap
                        color="text.primary"
                      >
                        {loading ? <Skeleton variant="text" width={160} /> : value.name.slice(0, 18)}
                      </Typography>
                      <Typography variant="body2" fontWeight={600} color="text.secondary">
                        {loading ? <Skeleton variant="text" width={60} /> : <> {value.sold} sold</>}
                      </Typography>
                    </Box>
                  </Stack>
                  {loading ? (
                    <Skeleton variant="text" width={72} />
                  ) : (
                    <ColorPreviewGroup limit={3} colors={value?.colors} sx={{ minWidth: 72 }} />
                  )}
                </Stack>
                {index !== array.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </CardContent>
        )}
      </Card>
    </>
  );
}

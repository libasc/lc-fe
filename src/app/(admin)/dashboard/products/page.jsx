import React from 'react';

// components
import ProductList from 'src/components/_admin/products/productList';
import Toolbar from 'src/components/_admin/toolbar';
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
// Meta information
export const metadata = {
  title: 'Products - Commercehope',
  applicationName: 'Commercehope',
  authors: 'Commercehope'
};
export default async function AdminProducts() {
  return (
    <>
      <Toolbar>
        <HeaderBreadcrumbs
          admin
          heading="Categories List"
          links={[
            {
              name: 'Dashboard',
              href: '/'
            },
            {
              name: 'Products'
            }
          ]}
          action={{
            href: `/dashboard/products/add`,
            title: 'Add Product'
          }}
        />
      </Toolbar>
      <ProductList />
    </>
  );
}

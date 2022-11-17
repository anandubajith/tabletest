import React, { Fragment } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MaterialReactTable from 'material-react-table';

export default function MuiTable({data, loading}) {


    const columns = [
        {
            header: 'Name',
            accessorKey: 'first_name',
        },
        {
            header: 'Email',
            accessorKey: 'email',
        },
        {
            header: 'Gender',
            accessorKey: 'gender',
        },
        {
            header: 'Subscription status',
            accessorKey: 'subscription.status',
        },
        {
            header: 'City',
            accessorKey: 'address.city',
        },
    ];



    return (
        <Fragment>
            <CssBaseline />
            <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Supermind
                </Typography>
            </Toolbar>
            </AppBar>
            <Container maxWidth="lg" style={{marginTop: '16px'}}>
                <MaterialReactTable
                    columns={columns}
                    data={data}
                    enableColumnActions={false}
                    enableColumnFilters={false}
                    enablePagination={true}
                    positionPagination={"bottom"}
                    enableSorting={true}
                    state={{ isLoading: loading }}
                    enableBottomToolbar={true}
                    enableTopToolbar={false}
                    muiTableBodyRowProps={{ hover: false }}
                />
            </Container>
        </Fragment>
    )
}

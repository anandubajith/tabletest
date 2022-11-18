import './App.css';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import AntDesignDragDrop from './pages/AntDesignDragDrop'
import MuiTable from './pages/MuiTable'
import HomePage from './pages/HomePage'
import getUsers from './api';
import { useEffect, useState } from 'react';

const DEFAULT_COUNT = 100
function App() {

    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUsers(DEFAULT_COUNT)
            .then(res => setData(res))
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }, [])

    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage />
        },
        {
            path: "/mui",
            element: <MuiTable data={data} loading={loading} error={error}/>
        },
        {
            path: "/ant",
            element: <AntDesignDragDrop data={data} setData={setData} loading={loading} error={error}/>
        },
    ]);
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;

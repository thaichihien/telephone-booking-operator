import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AddressGoogle.module.scss';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const cx = classNames.bind(styles);

function AddressGoogle(props) {
    const column = [
        {
            name: 'Địa chỉ',
            selector: (row) => row.address,
            sortable: true,
        },
        {
            name: '',
            cell: (row) => (
                <button onClick={() => handleSelect(row)}>
                    Choose this address
                </button>
            ),
        },
    ];

    const [selectedAddress, setSelectedAddress] = useState(null);

    const handleSelect = (address) => {
        setSelectedAddress(address);
        props.onSelectAddress(address); // Call the callback function to send data back to the parent
        props.setTrigger(false);
    };

    const [records, setRecords] = useState([]);

    const handleSearch = async () => {
        const searchTerm = document.getElementById('searchInput').value;
        // console.log('TERM: ', searchTerm);
        const encodedAddress = encodeURIComponent(searchTerm);
        // console.log('API ADDRESS', encodedAddress);
        const url = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/location/search-api?address=${encodedAddress}`;
        // console.log('URL', url);
        try {
            setRecords([]);
            const response = await axios.get(url);
            setRecords(response.data);
        } catch (error) {
            console.log('ERROR', error);
        }
    };

    return props.trigger ? (
        <div className={cx('popup')}>
            <div className={cx('popup-inner')}>
                <button
                    className={cx('btn-close')}
                    onClick={() => props.setTrigger(false)}
                >
                    Close
                </button>

                <div>
                    <h3>Tìm kiếm địa chỉ từ Google</h3>
                    <input
                        id="searchInput"
                        type="text"
                        placeholder={`Search...`}
                        style={{
                            padding: '4px',
                            width: '250px',
                            marginTop: '10px',
                        }}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>

                <DataTable
                    columns={column}
                    data={records}
                    pagination
                    // onSelectedRowsChange={(state) => {
                    //     if (state.selectedCount === 1) {
                    //         // Get the selected row data
                    //         const selectedRowData = state.selectedRows[0];
                    //         const selectedAddress = selectedRowData.place_id;
                    //         handleSelect(selectedAddress); // Call the function to store the selected address
                    //     } else {
                    //         setSelectedAddress(null); // Reset selected address
                    //     }
                    // }}
                />
            </div>
        </div>
    ) : (
        ''
    );
}

export default AddressGoogle;

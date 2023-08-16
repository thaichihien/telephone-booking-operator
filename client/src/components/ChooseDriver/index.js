import classNames from 'classnames/bind';
import styles from './ChooseDriver.module.scss';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function ChooseDriver(props) {

    const [selectedDriver, setSelectedDriver] = useState(null);

    const [records, setRecords] = useState([]);

    const column = [
        {
            name: 'Tên tài xế',
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: 'Số điện thoại',
            selector: (row) => row.phone,
            // sorttable: true
        },
        {
            name: 'Số chỗ ngồi',
            selector: (row) => row.cabSeats,
            // sorttable: true
        },
        {
            name: '',
            cell: (row) => (
                <button onClick={() => handleSelect(row)}>
                    Choose this driver
                </button>
            ),
        },
    ];

    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true); // Show loading popup
        try {
            const response = await axios.get(
                `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/customer/driver`,
            );
            setRecords(response.data);
        } catch (error) {
            console.log('ERROR', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSelect = (driver) => {
        setSelectedDriver(driver);
        props.onSelectDriver(driver);
        props.setTrigger(false)
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
                    <h3>Danh sách tài xế</h3>
                
                </div>

                <DataTable
                    columns={column}
                    data={records}
                    pagination
                />
            </div>
        </div>
    ) : (
        ''
    );
}

export default ChooseDriver;

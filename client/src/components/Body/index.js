import classNames from 'classnames/bind';
import styles from './Body.module.scss';
import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import AddressGoogle from '../AddressGoogle';
import axios from 'axios';
import LoadingPopup from '../LoadingPopup';
import ChooseDriver from '../ChooseDriver';

const cx = classNames.bind(styles);

function Body() {
    const column = [
        {
            name: 'Địa chỉ',
            selector: (row) => row._source.address,
            sortable: true,
        },
        {
            name: 'Khách hàng',
            selector: (row) => row._source.fullname,
            // sorttable: true
        },
        {
            name: 'SĐT',
            selector: (row) => row._source.phone,
            // sorttable: true
        },
        {
            name: '',
            cell: (row) => (
                <button onClick={() => setSelectedAddress(row._source)}>
                    Choose this address
                </button>
            ),
        },
    ];

    const [loading, setLoading] = useState(false);

    // const fetchData = async () => {
    //     setLoading(true); // Show loading popup
    //     try {
    //         const response = await axios.get(
    //             'http://localhost:3000/location/all/test',
    //         );
    //         setRecords(response.data.hits.hits);
    //         setFilterRecords(response.data.hits.hits);
    //     } catch (error) {
    //         console.log('ERROR', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchData();
    // }, []);

    const [records, setRecords] = useState([]);
    const [filterRecords, setFilterRecords] = useState([]);

    const handleFilter = (event) => {
        const newData = filterRecords.filter((row) =>
            row._source['address']
                .toLowerCase()
                .includes(event.target.value.toLowerCase()),
        );
        setRecords(newData);
    };

    const [googlePopup, setGooglePopup] = useState(false);
    const [driverPopup, setDriverPopup] = useState(false);

    const [selectedAddress, setSelectedAddress] = useState(null); // State to store selected address
    const [selectedDriver, setSelectedDriver] = useState(null); // State to store selected address

    const handleSelectAddress = (address) => {
        setSelectedAddress(address);
        bookingData.address_id = address.place_id;
        console.log(address);
    };

    const handleSelectDriver = (driver) => {
        setSelectedDriver(driver);
        bookingData.driver_id = driver.id;
        console.log(driver);
    };

    const [bookingData, setBookingData] = useState({
        phone: '',
        name: '',
        address_id: '',
        driver_id: '',
        seat_number: 4,
    });

    const handleChange = (name, value) => {
        setBookingData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        console.log("click")
        e.preventDefault();

        axios
            .post(
                `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/customer`,
                bookingData,
            )
            .then((res) => {
                window.confirm(res)

                setBookingData({
                    phone: '',
                    name: '',
                    address_id: '',
                    driver_id: '',
                    seat_number: 4,
                });
            })
            .catch((err) => {
                window.confirm(err);
                console.log(err);
            });
    };

    const handleSearchAddressHistory = async () => {
        const searchTerm = document.getElementById('searchInput').value;
        // console.log('TERM: ', searchTerm);
        const encodedAddress = encodeURIComponent(searchTerm);
        // console.log('API ADDRESS', encodedAddress);
        const url = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/location/search?address=${encodedAddress}`;
        console.log('URL', url);
        try {
            setRecords([]);
            const response = await axios.get(url);
            setRecords(response.data);
        } catch (error) {
            console.log('ERROR', error);
        }
    };

    return (
        <div className={cx('body')}>
            <div className={cx('popup-inner')}>
                <form
                    noValidate
                    onSubmit={handleSubmit}
                    className={cx('form-submit')}
                >
                    {/* Phone number */}
                    <div className={cx('form-item')}>
                        <label htmlFor="phone">Số điện thoại</label>
                        <input
                            name="phone"
                            placeholder=""
                            value={bookingData.phone}
                            onChange={(e) =>
                                handleChange('phone', e.target.value)
                            }
                            required
                        />
                    </div>
                    {/* Address */}
                    <div className={cx('form-item')}>
                        <label htmlFor="address">Địa chỉ</label>
                        <input
                            name="address"
                            placeholder=""
                            value={
                                selectedAddress ? selectedAddress.address : ''
                            }
                            required
                        />
                    </div>

                    {/* Loại xe*/}
                    <div className={cx('form-item')}>
                        <label htmlFor="seat_number">Seat</label>
                        <select
                            id="seat_number"
                            value={''}
                            onChange={(e) =>
                                handleChange('seat_number', e.target.value)
                            }
                        >
                            <option value="Car4">Car 4</option>
                            <option value="Car7">Car 7</option>
                        </select>
                    </div>

                    {/* Tài xế*/}
                    <div className={cx('form-item')}>
                        <label htmlFor="driver">Driver</label>
                        <input
                            name="driver"
                            placeholder=""
                            value={selectedDriver ? selectedDriver.name : ''}
                            onClick={() => setDriverPopup(true)}
                            required
                        />
                    </div>

                    <button
                    // onClick={() => {
                    //     setDriverPopup(true);
                    // }}
                    >
                        Điều phối
                    </button>
                </form>

                <div className={cx('history')}>
                    Lịch sử địa chỉ
                    <div>
                        <input
                            id="searchInput"
                            type="text"
                            placeholder={`Search...`}
                            style={{
                                padding: '4px',
                                width: '250px',
                                marginTop: '10px',
                            }}
                            onChange={handleFilter}
                        />
                        <button onClick={handleSearchAddressHistory}>
                            Search
                        </button>
                    </div>
                    <DataTable
                        columns={column}
                        data={records}
                        pagination
                    ></DataTable>
                    {loading && <LoadingPopup />}
                    <AddressGoogle
                        trigger={googlePopup}
                        setTrigger={setGooglePopup}
                        onSelectAddress={handleSelectAddress}
                    ></AddressGoogle>
                    <ChooseDriver
                        trigger={driverPopup}
                        setTrigger={setDriverPopup}
                        onSelectDriver={handleSelectDriver}
                    ></ChooseDriver>
                    <button
                        className={cx('btn-search-address')}
                        onClick={() => {
                            setGooglePopup(true);
                        }}
                    >
                        Tìm kiếm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Body;

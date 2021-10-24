import axios from 'axios';
import React, { useState, useEffect } from 'react';
import style from './form.module.css';
import Moment from 'react-moment';
import EditIcon from '../assets/images/48763_file_edit_icon.png';
import DeleteIcon from '../assets/images/4696675_bin_delete_recycle_remove_trash_icon.png';
import Button from '@restart/ui/esm/Button';
export default function Form(props) {
	const [ editId, setEditId ] = useState('');
	const [ search, setSearch ] = useState(null);
	const [ name, setName ] = useState('');
	const [ gender, setGender ] = useState('');
	const [ date, setDate ] = useState('');
	const [ collage, setCollage ] = useState('');
	const [ address, setAddress ] = useState('');
	const [ hobbies, setHobbies ] = useState([]);
	const [ tableShow, setTableShow ] = useState(false);
	const [ data, setData ] = useState([]);
	useEffect(() => {
		let mounted = true;

		if (mounted) {
			handleGet();
		}
		return () => (mounted = false);
	}, []);
	const handleGet = async () => {
		const res = await axios.get(`https://nodeexpressapiforms.herokuapp.com/users`);
		setData(res.data);
	};

	const handleSubmit = async () => {
		const data = { name, gender, date, collage, address, hobbies };
		if (editId === '') {
			await axios.post(`https://nodeexpressapiforms.herokuapp.com/users`, data);
			handleGet();
			handleReset();
		} else {
			await axios.patch(`https://nodeexpressapiforms.herokuapp.com/users/` + editId, data);
			handleGet();
			handleReset();
		}
	};
	const handleUpdate = async (id) => {
		setEditId(id);
		const newData = data.filter((obj) => obj._id === id)[0];
		setTableShow(true);
		setName(newData.name);
		setGender(newData.gender);
		setDate(newData.date);
		setCollage(newData.collage);
		setAddress(newData.address);
		setHobbies(newData.hobbies);
	};
	const deleteHandler = async (id) => {
		await axios.delete(`https://nodeexpressapiforms.herokuapp.com/users/` + id).then(() => {
			const deleteUser = data.filter((obj) => obj._id !== id);
			handleGet();
			setData(deleteUser);
			setEditId('');
		});
	};
	const handleReset = () => {
		setName('');
		setGender('');
		setDate('');
		setCollage('');
		setAddress('');
		setHobbies('');
		setEditId('');
	};
	const searches = (e) => {
		setSearch(e.target.value);
	};
	const handleSearch = (e) => {
		e.preventDefault();
		const searched = data.find((obj) => obj.name === search);
		console.log(searched);
	};
	const handleTable = () => {
		return (
			<div className={style.Main}>
				<div>
					<div className={style.title}>Table</div>
					<input
						className={style.searchInput}
						title="search"
						type="text"
						placeholder="Search"
						value={search}
						onChange={searches}
					/>‌
					<button onClick={handleSearch} className={style.searchButton}>
						Go
					</button>
					<div className="d-flex flex-row-reverse bd-highlight">
						<button
							className={style.buttonAdd}
							onClick={() => {
								setTableShow(true);
								handleReset();
							}}
						>
							Add Data
						</button>
					</div>
				</div>
				<div />
				<div className="m-1 p-1">
					<table className="table table-borderless table-responsive">
						<thead className="table-dark">
							<tr>
								<th>#</th>
								<th>Name</th>
								<th> Birth Date</th>
								<th>Collage Name</th>
								<th>Gender</th>
								<th>Address</th>
								<th>Hobbies</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{data.map((data, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{data.name}</td>
									<td>
										<Moment format="DD MMM YYYY">{data.date}</Moment>
									</td>
									<td>{data.collage}</td>
									<td>{data.gender}</td>
									<td>{data.address}</td>
									<td>{data.hobbies}</td>
									<td style={{ display: 'inline-flex' }}>
										<Button
											onClick={handleUpdate.bind(this, data._id)}
											className={style.editButton}
										>
											<img className={style.editIcon} src={EditIcon} alt="edit" />
											<div className={style.hoverEdit}>Edit</div>
										</Button>
										<Button
											onClick={deleteHandler.bind(this, data._id)}
											className={style.deleteButton}
										>
											<img className={style.deleteIcon} src={DeleteIcon} alt="delete" />
											<div className={style.hoverDelete}>Delete</div>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
	};

	return (
		<form>
			{!tableShow ? (
				handleTable()
			) : (
				<div className={style.Main}>
					<div className={style.title}>Form</div>

					<div>
						<div className={style.containerFirst}>
							<div>
								<label className={style.labels}>Full Name</label>
								<input
									className={style.nameInput}
									title="Name"
									type="text"
									placeholder="Enter Name"
									value={name}
									onChange={(e) => {
										setName(e.target.value);
									}}
								/>
							</div>

							<label className={style.labels}>BirthDate</label>
							<input
								className={style.dateInput}
								type="date"
								title="Date"
								value={date}
								onChange={(e) => {
									setDate(e.target.value);
								}}
							/>
						</div>

						<div className={style.containerFirst}>
							<div>
								<label className={style.labels}>Collage Name</label>
								<input
									className={style.nameInput}
									title="Name"
									type="text"
									value={collage}
									placeholder="Enter Collage"
									onChange={(e) => {
										setCollage(e.target.value);
									}}
								/>
							</div>
							<div className={style.containerGenderAddress}>
								<div className={style.genderContainer}>
									<label className={style.labels}>Gender</label>
									<input
										className={style.genderInput}
										id="male"
										type="radio"
										name="Gender"
										value="Male"
										onChange={(e) => {
											setGender(e.target.value);
										}}
									/>
									<label className={style.labels} htmlFor="male">
										Male
									</label>
									<input
										className={style.genderInput}
										id="female"
										type="radio"
										name="Gender"
										value="Female"
										onChange={(e) => {
											setGender(e.target.value);
										}}
									/>
									<label className={style.labels} htmlFor="female">
										Female
									</label>
								</div>
								<div>
									<div style={{ display: 'inline-flex' }}>
										<label className={style.labels}>Address</label>
										<textarea
											className={style.addressInput}
											value={address}
											placeholder="Address"
											onChange={(e) => {
												setAddress(e.target.value);
											}}
										/>
									</div>
								</div>
							</div>
						</div>

						<div className={style.checkboxContainer}>
							<label className={style.labels}>Hobbies</label>
							<div>
								<input
									type="checkbox"
									id="Hobbie1"
									name="Gaming"
									value="Gaming"
									onChange={(e) => {
										setHobbies(e.target.value);
									}}
								/>
								<label className={style.labels} htmlFor="Hobbie1">
									Gaming
								</label>
							</div>
							<div>
								<input
									type="checkbox"
									id="Hobbie2"
									name="Reading"
									value="Reading"
									onChange={(e) => {
										setHobbies(e.target.value);
									}}
								/>
								<label className={style.labels} htmlFor="Hobbie2">
									Reading
								</label>
							</div>
							<div>
								<input
									type="checkbox"
									id="Hobbie3"
									name="Traveling"
									value="Traveling"
									onChange={(e) => {
										setHobbies(e.target.value);
									}}
								/>
								<label className={style.labels} htmlFor="Hobbie3">
									Traveling
								</label>
							</div>
							<div>
								<input
									type="checkbox"
									id="Hobbie4"
									name="Drawing"
									value="Drawing"
									onChange={(e) => {
										setHobbies(e.target.value);
									}}
								/>
								<label className={style.labels} htmlFor="Hobbie4">
									Drawing
								</label>
							</div>
							<div>
								<input
									type="checkbox"
									id="Hobbie5"
									name="Other"
									value="Other"
									onChange={(e) => {
										setHobbies(e.target.value);
									}}
								/>
								<label className={style.labels} htmlFor="Hobbie5">
									Other
								</label>
							</div>
						</div>
						<div className={style.buttonContainer}>
							<button
								className={style.buttonSubmit}
								onClick={() => {
									setTableShow(false);
									handleSubmit();
								}}
							>
								Submit
							</button>
							<button
								className={style.buttonCancel}
								onClick={() => {
									setTableShow(false);
								}}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</form>
	);
}

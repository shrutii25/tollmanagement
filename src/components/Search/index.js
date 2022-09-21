import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

import FormInput from '../Form/FormInput'
import "./style.css"

function Search({ handleSearchChange, placeholder, name }) {
	return (
		<div className="search-wrapper">
			<FormInput
				placeholder={placeholder}
				className="search-input"
				name={name}
				handleChange={handleSearchChange}
			/>
			<AiOutlineSearch className="search-icon" />
		</div>
	)
}

export default Search;
import React, { useState, useEffect, useRef } from 'react';
import './DropdownWithCheckbox.css';

const DropdownWithCheckbox = ({ label, options, selectedOptions, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);  // Ref to keep track of dropdown element

    const handleToggle = () => setIsOpen(!isOpen);

    const handleCheckboxChange = (e) => onChange(e.target.value);

    // Close dropdown when clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        // Add event listener for clicks outside
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <div className="dropdown-label" onClick={handleToggle}>
                {label}
                <span className="dropdown-arrow">{isOpen ? '🔼' : '🔽'}</span>
            </div>
            {isOpen && (
                <div className="dropdown-options">
                    {options.map(option => (
                        <div key={option} className="checkbox-container">
                            <input
                                type="checkbox"
                                value={option}
                                checked={selectedOptions.includes(option)}
                                onChange={handleCheckboxChange}
                            />
                            <label>{option}</label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropdownWithCheckbox;

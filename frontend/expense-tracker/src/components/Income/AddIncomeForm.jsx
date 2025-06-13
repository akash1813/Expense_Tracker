import React, { useState } from 'react'
import { Input } from '../Inputs/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';
import ReceiptScanner from '../ReceiptScanner';



const AddIncomeForm = ({ onAddIncome }) => {

    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        icon: "",
    })

    const handleChange = (key, value) =>
        setIncome((prevIncome) => ({ ...prevIncome, [key]: value }));
    
      const handleScanComplete = (scannedData) => {
        if (scannedData) {
    
    
            if (scannedData.date) {
                const dateObj = new Date(scannedData.date);
                if (!isNaN(dateObj.getTime())) {
                    const formattedDate = dateObj.toISOString().split("T")[0];
                    handleChange("date", formattedDate);
                } else {
                    console.error("Invalid date received:", scannedData.date);
                }
            }
          if (scannedData.category) {
            handleChange("source", scannedData.category);
          }
          if (scannedData.amount !== undefined) {
            handleChange("amount", String(scannedData.amount));
          }
    
        }
    }    

    return (
        <div>
            <ReceiptScanner onScanComplete={handleScanComplete} />

            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                value={income.source}
                onChange={({ target }) => handleChange("source", target.value)}
                label="Income Source"
                placeholder="Freelance,Salary,etc"
                type="text"
            />

            <Input
                value={income.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                placeholder=""
                type="number"
            />

            <Input
                value={income.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                placeholder=""
                type="date"
            />

            <div className='flex justify-end mt-6'>
                <button
                    type="button"
                    className='add-btn add-btn-fill '
                    onClick={() => onAddIncome(income)}
                >
                    Add Income
                </button>
            </div>

        </div>
    )
}

export default AddIncomeForm
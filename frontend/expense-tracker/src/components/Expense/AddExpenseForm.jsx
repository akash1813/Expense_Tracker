import React, { useState } from 'react'
import { Input } from '../Inputs/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';
import ReceiptScanner from '../ReceiptScanner';


const AddExpenseForm = ({ onAddExpense }) => {

  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  })

  const handleChange = (key, value) =>
    setExpense((prevExpense) => ({ ...prevExpense, [key]: value }));

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
        handleChange("category", scannedData.category);
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
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={expense.category}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Category"
        placeholder="Food,Fuel,etc"
        type="text"
      />

      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder=""
        type="number"
      />

      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />

      <div className='flex justify-end mt-6'>
        <button
          type="button"
          className='add-btn add-btn-fill '
          onClick={() => onAddExpense(expense)}
        >
          Add Expense
        </button>
      </div>

    </div>
  )
}

export default AddExpenseForm
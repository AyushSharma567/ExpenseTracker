import { useState } from 'react';
import { addTransaction } from '../utils/api';
import toast from 'react-hot-toast';

const AddTransaction = ({ onTransactionAdded }) => {
    const [formData, setFormData] = useState({
        amount: '',
        type: 'expense',
        description: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const transaction = await addTransaction({
                ...formData,
                amount: Number(formData.amount)
            });
            onTransactionAdded(transaction);
            setFormData({ amount: '', type: 'expense', description: '' });
            toast.success('Transaction added successfully!');
        } catch (error) {
            toast.error('Error adding transaction');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4">Add New Transaction</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Amount</label>
                        <input
                            type="number"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Type</label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="w-full p-2 border rounded"
                        >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <input
                        type="text"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Transaction
                </button>
            </form>
        </div>
    );
};

export default AddTransaction;
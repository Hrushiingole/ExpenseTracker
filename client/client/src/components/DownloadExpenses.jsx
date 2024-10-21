import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const DownloadExpenses = ({ data }) => {
    const handleDownload = () => {
        // Check if data and expenses exist
        if (!data || !data.user.expenses) {
            console.error('Data or expenses are undefined');
            return;
        }
        
        console.log(data.user.expenses);

        // Convert JSON to rows
        const expensesData = data.user.expenses.map(expense => ({
            'Name': expense.person.name,
            'Give': expense.person.give,
            'Take': expense.person.take,
            'Net': expense.person.net,
        }));

        // Add personal expense of the username person at the end of the list
        expensesData.push({
            'Name': data.user.username + " (Personal Expense)", // Add personal expense as a separate row
            'Give': '',
            'Take': '',
            'Net': '',
            'Personal Expense': data.user.personalExpenses // Add the user's personal expense here
        });

        // Create a new workbook
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(expensesData);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Expenses');

        // Write the Excel file to a binary string
        const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

        // Convert binary string to Blob and save
        const s2ab = s => {
            const buf = new ArrayBuffer(s.length);
            const view = new Uint8Array(buf);
            for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        };

        const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
        saveAs(blob, 'expenses.xlsx');
    };

    return (
        <button onClick={handleDownload}>Download Expenses Sheet</button>
    );
};

export default DownloadExpenses;
